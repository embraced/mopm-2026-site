import zh from '../i18n/zh.json';
import en from '../i18n/en.json';

export type Lang = 'zh' | 'en';
const dicts = { zh, en } as const;

export function t(lang: Lang, path: string): string {
  return path.split('.').reduce<any>((o, k) => (o ? o[k] : undefined), dicts[lang]) ?? path;
}
export function pick<T extends Record<string, any>>(item: T, base: string, lang: Lang): string {
  return item[`${base}_${lang}`] ?? item[`${base}_zh`] ?? '';
}
export function pathFor(lang: Lang, path: string): string {
  return lang === 'en' ? `/en${path}` : path || '/';
}
