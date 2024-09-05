import { detectLanguage } from "./detectLanguage";

export const readTextOnHover = (element: HTMLElement) => {
  const speechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(element.textContent || "");

  utterance.lang = detectLanguage(element.textContent || "");

  speechSynthesis.cancel();
  CSS.highlights.clear();

  utterance.onend = () => {
    CSS.highlights.clear();
  };

  const wholeElementRange = document.createRange();
  wholeElementRange.selectNode(element);
  const highlight = new Highlight(wholeElementRange);
  CSS.highlights.set("paragraph-highlight", highlight);

  speechSynthesis.speak(utterance);
};
