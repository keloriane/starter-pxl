import styled from "styled-components";

export const ContainerStyle = styled.div`
  width: 100%;
  display: block;
  overflow: hidden;
  position: relative;
`;

export const ImageStyle = styled.img`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  transition: opacity 0.5s cubic-bezier(0.26, 1.04, 0.54, 1) 0s;
  font-family: "object-fit: cover;";
  will-change: opacity;
  object-position: 50% 50%;
`;

export const PictureStyle = styled.picture`
  &:before {
    content: "";
    padding-top: 116.38%;
    display: block;
  }
`;
