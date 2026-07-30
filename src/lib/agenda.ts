import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export interface Track {
  venue: string;
  session?: string;
  organizer?: string;
  moderator?: string;
  title_zh: string;
  title_en?: string;
  speaker?: string;
  affiliation?: string;
}
export interface Slot {
  time: string;
  type: 'plenary' | 'parallel' | 'break';
  category?: string;
  venue?: string;
  title_zh?: string;
  title_en?: string;
  speaker?: string;
  affiliation_zh?: string;
  affiliation_en?: string;
  moderator?: string;
  tracks?: Track[];
}
export interface Day { date: string; label_zh: string; label_en: string; slots: Slot[]; }
export interface Agenda { venues: string[]; days: Day[]; }

export function loadAgenda(): Agenda {
  const file = path.join(process.cwd(), 'src/data/agenda.yaml');
  return yaml.load(fs.readFileSync(file, 'utf8')) as Agenda;
}

// speaker/moderator 欄位常把「姓名 職稱 單位」塞成一串，且職稱與單位常黏在一起
// （如「副教授國立成功大學」），還有複合職稱（「副研究員級主治醫生」「特聘研究員兼主任」「醫師/教授」）。
// 策略：掃到最左邊的職稱、同位置取最長（研究助技師 不被 技師 誤切），再沿連接詞吃完連續職稱，
// 其餘視為單位 → 讓單位能獨立換行。中研院「技師」對標「研究員」：研究技師=研究員、研究副技師=副研究員、研究助技師=助研究員。
const TITLES = [
  '特聘研究員', '副研究員', '助理研究員', '助研究員', '研究員',
  '研究副技師', '研究助技師', '研究技師',
  '特聘教授', '助理教授', '副教授', '教授',
  '主治醫師', '主治醫生', '主任醫師', '醫師', '醫生',
  '總院長', '院長', '所長', '部長', '處長', '理事長', '主任', '顧問', '總監', '執行長', '資訊長',
  '博士', '創辦人', '老師',
];
// 職稱之間的連接詞/空白（複合職稱用）
const SEP = new Set([' ', '　', '兼', '級', '/', '／', '、']);

function titleAt(s: string, i: number): string | null {
  let best: string | null = null;
  for (const t of TITLES) if (s.startsWith(t, i) && (!best || t.length > best.length)) best = t;
  return best;
}

// 切點落在職稱後面時，單位前常還黏著原稿的分隔符（「教授 / 陽明交通大學」→「/ 陽明交通大學」）。
// 只做 trim() 會把分隔符一起顯示出來，所以要一併清掉；整段被括號包住時脫括號，
// 但「單位 (Dept. of X)」這種尾括號不能動，故僅在成對包住整段時才脫。
function cleanAffiliation(raw: string): string {
  const out = raw.replace(/^[\s/／、，,·・|｜:：]+/, '').trim();
  const wrapped = out.match(/^[（(]\s*(.+?)\s*[）)]$/);
  return wrapped ? wrapped[1] : out;
}

// 完全掃不到職稱時（「宋柏儀／國防醫學大學」「呂美曄 (中研院生物多樣性研究中心)」），
// 退而用分隔符切。原稿常見半形/全形括號混用，故收尾括號可有可無。
function splitWithoutTitle(s: string): { person: string; affiliation: string } {
  const slash = s.match(/^(.+?)\s*[/／]\s*(.+)$/);
  if (slash) return { person: slash[1].trim(), affiliation: cleanAffiliation(slash[2]) };
  const paren = s.match(/^(.+?)\s*[（(]\s*(.+?)\s*[）)]?\s*$/);
  if (paren) return { person: paren[1].trim(), affiliation: cleanAffiliation(paren[2]) };
  return { person: s, affiliation: '' };
}

export function splitSpeaker(raw?: string): { person: string; affiliation: string } {
  const s = (raw ?? '').trim();
  if (!s) return { person: '', affiliation: '' };
  // 1) 找最左邊出現職稱的位置
  let start = -1;
  let first: string | null = null;
  for (let i = 0; i < s.length; i++) {
    const t = titleAt(s, i);
    if (t) { start = i; first = t; break; }
  }
  if (start < 0 || !first) return splitWithoutTitle(s);
  // 2) 沿連接詞吃完後續連續職稱
  let cursor = start + first.length;
  for (;;) {
    let j = cursor;
    while (j < s.length && SEP.has(s[j])) j++;
    const t = titleAt(s, j);
    if (!t) break;
    cursor = j + t.length;
  }
  return { person: s.slice(0, cursor).trim(), affiliation: cleanAffiliation(s.slice(cursor)) };
}
