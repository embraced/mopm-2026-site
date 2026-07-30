import { describe, expect, it } from 'vitest';
import { splitSpeaker } from '../src/lib/agenda';

// 樣本全部取自主辦 2026-07-30 議程 docx 的實際寫法。
describe('splitSpeaker', () => {
  it('splits 姓名職稱 + 空白 + 單位', () => {
    expect(splitSpeaker('陳璿宇 研究員 中研院統計所')).toEqual({
      person: '陳璿宇 研究員',
      affiliation: '中研院統計所',
    });
  });

  it('handles 複合職稱（博士醫師）', () => {
    expect(splitSpeaker('陳昱光 博士醫師／三軍總醫院血液腫瘤部')).toEqual({
      person: '陳昱光 博士醫師',
      affiliation: '三軍總醫院血液腫瘤部',
    });
  });

  it('does not leave a半形斜線 in the affiliation', () => {
    expect(splitSpeaker('何信瑩教授 / 陽明交通大學')).toEqual({
      person: '何信瑩教授',
      affiliation: '陽明交通大學',
    });
  });

  it('does not leave a全形斜線 in the affiliation', () => {
    expect(splitSpeaker('王智弘 總院長／臺北市立聯合醫院')).toEqual({
      person: '王智弘 總院長',
      affiliation: '臺北市立聯合醫院',
    });
  });

  it('recognises 老師 as a title', () => {
    expect(splitSpeaker('于松桓老師  中山大學精準所')).toEqual({
      person: '于松桓老師',
      affiliation: '中山大學精準所',
    });
  });

  it('falls back to the slash when no title is present', () => {
    expect(splitSpeaker('宋柏儀／國防醫學大學')).toEqual({
      person: '宋柏儀',
      affiliation: '國防醫學大學',
    });
  });

  it('falls back to parentheses and strips them', () => {
    expect(splitSpeaker('呂美曄 (中研院生物多樣性研究中心)')).toEqual({
      person: '呂美曄',
      affiliation: '中研院生物多樣性研究中心',
    });
  });

  it('falls back to 全形 parentheses with an English title inside', () => {
    expect(
      splitSpeaker('李婕寧（Postdoctoral Research Fellow, 國立成功大學醫學檢驗生物技術學系)'),
    ).toEqual({
      person: '李婕寧',
      affiliation: 'Postdoctoral Research Fellow, 國立成功大學醫學檢驗生物技術學系',
    });
  });

  it('keeps a 單位在前、職稱在後 string intact', () => {
    expect(splitSpeaker('陳相成 國防部軍醫局醫務管理處處長')).toEqual({
      person: '陳相成 國防部軍醫局醫務管理處處長',
      affiliation: '',
    });
  });

  it('returns empty fields for empty input', () => {
    expect(splitSpeaker(undefined)).toEqual({ person: '', affiliation: '' });
    expect(splitSpeaker('   ')).toEqual({ person: '', affiliation: '' });
  });

  it('leaves a plain TBA untouched', () => {
    expect(splitSpeaker('TBA')).toEqual({ person: 'TBA', affiliation: '' });
  });
});
