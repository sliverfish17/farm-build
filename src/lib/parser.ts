const READABLE_CLASSNAMES = ["post-content", "post-title"];

export function getTopLevelReadableElementsOnPage(): HTMLElement[] {
  const elements: HTMLElement[] = [];
  const bodyChildren = Array.from(document.body.getElementsByTagName("*"));

  bodyChildren.forEach((element) => {
    const textContent = element.textContent?.trim() ?? "";
    if (
      textContent.length > 0 &&
      READABLE_CLASSNAMES.includes(element.className)
    ) {
      elements.push(element as HTMLElement);
    }
  });

  return elements;
}
