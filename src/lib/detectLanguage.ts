const CYRILLIC_REGEX = /[\u0400-\u04FF]/;
const JAPANESE_REGEX = /[\u3040-\u30FF]/;
const GREEK_REGEX = /[\u0370-\u03FF]/;
const CHINESE_REGEX = /[\u4E00-\u9FFF]/;

export const detectLanguage = (text: string): string => {
  switch (true) {
    case CYRILLIC_REGEX.test(text):
      return "ru-RU";

    case JAPANESE_REGEX.test(text):
      return "ja-JP";

    case GREEK_REGEX.test(text):
      return "el-GR";

    case CHINESE_REGEX.test(text):
      return "zh-CN";

    default:
      return "en-US";
  }
};
