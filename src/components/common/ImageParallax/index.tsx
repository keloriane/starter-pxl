import React, { useLayoutEffect} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";



type ImagePrallaxProps = {
  src: string;
  height: string;
};

gsap.registerPlugin(ScrollTrigger);
const ImageParallax: React.FC<ImagePrallaxProps> = ({ src, height }) => {
  const [imageHeightRatio, setImageHeightRatio] = React.useState(20);
  const imageRef = React.useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const image = imageRef.current;
    // Get the image element

    if (!image) return;
    const imageSize = image.clientHeight;
    const yOffset = (imageSize / 100) * 30;
    setImageHeightRatio(yOffset);

    // Create a GSAP timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: "top bottom", // when the top of the image hits the bottom of the viewport
        end: "bottom top", // when the bottom of the image hits the top of the viewport
        scrub: true, // smooth animation
      },
    });

    tl.to(image, { y: yOffset, ease: "none" });
    ScrollTrigger.create({
      trigger: image,
      start: "top bottom",
      end: "bottom top",
    });

    // Cleanup function
    return () => {
      tl.kill(); // kill the timeline to prevent memory leaks
      ScrollTrigger.killAll(); // kill the scroll trigger instance
    };
  }, [imageRef]);

  return (
    <div style={{ overflow: "hidden", height: height }}>
      <img
        ref={imageRef}
        src={src}
        alt="Parallax Image"
        style={{
          width: "100%",
          position: "relative",
          top: -imageHeightRatio,
        }}
      />
    </div>
  );
};
export default ImageParallax;
