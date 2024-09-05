import { useState, useEffect } from "react";

export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  };
}

export function isPointInsideElement(
  coordinate: { x: number; y: number },
  element: HTMLElement,
): boolean {
  const bounds = getElementBounds(element);
  return (
    coordinate.x >= bounds.left &&
    coordinate.x <= bounds.left + bounds.width &&
    coordinate.y >= bounds.top &&
    coordinate.y <= bounds.top + bounds.height
  );
}

export function getLineHeightOfFirstLine(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  const lineHeight = parseFloat(style.lineHeight);

  if (isNaN(lineHeight)) {
    const fontSize = parseFloat(style.fontSize);
    return fontSize * 1.2;
  }

  return lineHeight;
}

export type HoveredElementInfo = {
  element: HTMLElement;
  top: number;
  left: number;
  heightOfFirstLine: number;
};

export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[],
): HoveredElementInfo | null {
  const [hoveredInfo, setHoveredInfo] = useState<HoveredElementInfo | null>(
    null,
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;

      for (const element of parsedElements) {
        if (isPointInsideElement({ x, y }, element)) {
          const bounds = getElementBounds(element);

          setHoveredInfo({
            element,
            top: bounds.top,
            left: bounds.left,
            heightOfFirstLine: getLineHeightOfFirstLine(element),
          });
          return;
        }
      }

      setHoveredInfo(null);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [parsedElements]);

  return hoveredInfo;
}
