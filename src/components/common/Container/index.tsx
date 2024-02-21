/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "styled-components";
import { breakpoints } from "@/mixins/breakpoints";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  colCount: number | number[];
  rowGap?: number;
  colGap?: number;
  style?: React.CSSProperties;
}

const handleResponsiveProps = (
  value: number | number[] | undefined,
  propName: string
) => {
  if (Array.isArray(value)) {
    return value
      .map((v, index) => {
        const breakpoint =
          breakpoints[index] || breakpoints[breakpoints.length - 1];
        const nextBreakpoint = breakpoints[index + 1] || breakpoints[index];
        const calculatedV = Array.isArray(v) ? v[index] : v;
        return `
        ${propName}: repeat(${calculatedV}, 1fr);
          @media (min-width: ${breakpoint}px) and (max-width: ${nextBreakpoint}px) {
            ${propName}: repeat(${calculatedV}, 1fr);
          }
        `;
      })
      .join(" ");
  } else {
    return `${propName}: repeat(${value}, 1fr);`;
  }
};

const ContainerStyle = styled.div<ContainerProps>`
  display: grid;
  ${(props) => handleResponsiveProps(props.colCount, "grid-template-columns")}
  margin: 0 20px;
  row-gap: ${(props) => props.rowGap}px;
  column-gap: ${(props) => props.colGap}px;
`;
ContainerStyle.shouldForwardProp = (prop) =>
  !["colCount", "rowGap", "colGap"].includes(prop);

const GridContainer: React.FC<ContainerProps> = ({
  children,
  className,
  style,
  colCount,
  colGap = 0,
  rowGap = 0,
  as = "div",
}) => {
  return (
    <ContainerStyle
      style={style}
      as={as}
      colCount={colCount}
      rowGap={rowGap}
      colGap={colGap}
      className={className}
    >
      {children}
    </ContainerStyle>
  );
};

export default GridContainer;
