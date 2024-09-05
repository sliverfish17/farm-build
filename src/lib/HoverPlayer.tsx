import { useState, useEffect } from "react";
import { getTopLevelReadableElementsOnPage } from "./parser";
import { useHoveredParagraphCoordinate } from "./hook";
import { PlayButtonIcon } from "../assets/PlayButton";
import { PauseButtonIcon } from "../assets/PauseButton";
import { readTextOnHover } from "./readTextOnHover";

export const HoverPlayerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [speakingElement, setSpeakingElement] = useState<HTMLElement | null>(
    null,
  );
  const [parsedElements, setParsedElements] = useState<HTMLElement[]>([]);
  const hoveredInfo = useHoveredParagraphCoordinate(parsedElements);

  useEffect(() => {
    setParsedElements(getTopLevelReadableElementsOnPage());
  }, [children]);

  const handlePlayPause = () => {
    if (!hoveredInfo) return;

    if (speakingElement === hoveredInfo.element) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        CSS.highlights.clear();
        setSpeakingElement(null);
      } else {
        readTextOnHover(hoveredInfo.element);
      }
    } else {
      window.speechSynthesis.cancel();
      CSS.highlights.clear();
      readTextOnHover(hoveredInfo.element);
      setSpeakingElement(hoveredInfo.element);
    }
  };

  return (
    <>
      {children}
      {hoveredInfo && (
        <div
          style={{
            position: "absolute",
            top: `${hoveredInfo.top}px`,
            left: `${hoveredInfo.left - 18}px`,
            zIndex: 1000,
            height: `${hoveredInfo.heightOfFirstLine}px`,
          }}
        >
          {speakingElement === hoveredInfo.element &&
          window.speechSynthesis.speaking ? (
            <PauseButtonIcon onClick={handlePlayPause} />
          ) : (
            <PlayButtonIcon onClick={handlePlayPause} />
          )}
        </div>
      )}
    </>
  );
};
