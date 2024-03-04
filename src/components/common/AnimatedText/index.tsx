import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

interface AnimatedTextProps {
  text: string;
  splitBy: "letter" | "word" | "phrase";
  gap?: string;
  duration: number;
  className?: string;
  fontSize?: number;
  highlightWords?: string[]; // Add this prop to highlight certain words
  highlightColor?: string;
  reactRef?: React.RefObject<HTMLDivElement>;
  staggerValue?: number; // Add this prop to set stagger value
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize,
  reactRef,
  splitBy,
  duration,
  className,
  highlightWords = [],
  highlightColor = "red",
  staggerValue = 0, // Default stagger value
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        elementsRef.current,
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: staggerValue,
          ease: "cubic-bezier(.215,.61,.355,1)",
          duration: duration,
        }
      );
    }
  }, [inView, duration, staggerValue]);

  const createElement = (str: string, index: number) => {
    return (
      <div
        key={index}
        style={{
          overflow: "hidden",
          visibility: inView ? "visible" : "hidden",
          color: highlightWords.includes(str) ? highlightColor : "inherit",
          height: fontSize ? `${fontSize + 5}px` : "auto",
        }}
      >
        <div ref={(el) => (elementsRef.current[index] = el)}>{str}</div>
        {splitBy !== "letter" && " "}
      </div>
    );
  };

  let splitText: string[];

  if (splitBy === "letter") {
    splitText = Array.from(text);
  } else if (splitBy === "word") {
    splitText = text.split(" ");
  } else if (splitBy === "phrase") {
    splitText = text.split(/(?:\n|\. |\? )/);
    splitText = splitText.filter((phrase) => phrase.trim() !== "");
  } else {
    splitText = text.split(". ");
  }

  return (
    <div ref={reactRef} className="testline">
      <div
        ref={ref}
        style={{
          display: "inline-Bock",
          flexWrap: "wrap",
        }}
        className={[className, "testword"].join(" ")}
      >
        {splitText.map((str, index) => createElement(str, index))}
      </div>
    </div>
  );
};

export default AnimatedText;
