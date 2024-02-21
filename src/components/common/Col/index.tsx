import React from "react";
import styled from "styled-components";

interface GridItemProps {
  className?: string;
  children: React.ReactNode;
  column: number | number[];
  colEnd?: number | number[];
  rowStart?: number | number[];
  rowEnd?: number | number[];
  span: number | number[];
}

const breakpoints = [1, 420, 640, 768, 1024, 1280, 1440];

const handleResponsiveProps = (
  value: number | number[] | undefined,
  propName: string,
  span: number | number[]
) => {
  if (Array.isArray(value)) {
    return value
      .map((v, index) => {
        const breakpoint =
          breakpoints[index] || breakpoints[breakpoints.length - 1];
        const nextBreakpoint = breakpoints[index + 1] || breakpoints[index];
        const calculatedSpan = Array.isArray(span) ? span[index] : span;
        const calculatedV = Array.isArray(v) ? v[index] : v;
        return `
          ${propName}: ${calculatedV} / span ${calculatedSpan};
          @media (min-width: ${breakpoint}px) and (max-width: ${nextBreakpoint}px) {
            ${propName}: ${calculatedV} / span ${calculatedSpan};
          }
        `;
      })
      .join(" ");
  } else {
    return `${propName}: ${value} / span ${span};`;
  }
};

const GridItemStyle = styled.div<GridItemProps>`
  ${(props) => handleResponsiveProps(props.column, "grid-column", props.span)}

  width: 100%;
  position: relative;
`;
GridItemStyle.shouldForwardProp = (prop) => !["column", "span"].includes(prop);

const Col: React.FC<GridItemProps> = ({
  children,
  className,
  column,
  colEnd,
  rowStart,
  rowEnd,
  span,
}: GridItemProps) => {
  return (
    <GridItemStyle
      className={className}
      column={column}
      colEnd={colEnd}
      rowStart={rowStart}
      rowEnd={rowEnd}
      span={span}
    >
      {children}
    </GridItemStyle>
  );
};

export default Col;
