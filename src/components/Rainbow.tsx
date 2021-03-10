import React, { useEffect } from "react";

import P5 from "p5";
import Sketch from "../ext/react-p5";

const drawSegment = (
  p5: P5,
  img: P5.Image,
  radius: number,
  width: number,
  angle: number,
  sliceCount: number
) => {
  const deltaAngle = angle / (sliceCount - 1);
  const deltaV = 1.0 / (sliceCount - 1);

  p5.noStroke();
  p5.push();
  p5.beginShape(p5.TRIANGLE_STRIP);
  p5.texture(img);
  p5.textureMode(p5.NORMAL);
  p5.scale(1, -1);
  p5.translate(0, -radius);
  for (let i = 0; i < sliceCount; i++) {
    const x0 = (radius - width) * Math.cos(i * deltaAngle);
    const y0 = (radius - width) * Math.sin(i * deltaAngle);
    const x1 = radius * Math.cos(i * deltaAngle);
    const y1 = radius * Math.sin(i * deltaAngle);
    const v = i * deltaV;
    p5.vertex(x0, y0, 1 - v, 1);
    p5.vertex(x1, y1, 1 - v, 0);
  }
  p5.endShape();
  p5.pop();
};

type Props = {
  src: string;
  highlightColour: [number, number, number];
  width: number;
  height: number;
};

const Rainbow: React.FC<Props> = ({ src, highlightColour, width, height }) => {
  const p5ref = React.useRef<P5 | null>();
  const image = React.useRef<P5.Image | null>();

  useEffect(() => {
    console.log("boop");

    const p5 = p5ref.current;

    if (p5 != null) {
      image.current = p5.loadImage(src, () => {
        p5ref.current?.redraw();
      });
    }
  }, [src]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    console.log("setup");
    p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);
    p5.noLoop();
    p5ref.current = p5;
  };

  const draw = (p5: P5) => {
    console.log("draw");

    const rainbowRadius = width / 2;
    const rainbowWidth = rainbowRadius / 1.4;

    console.log({ image, src });

    p5.push();
    p5.noFill();
    p5.translate(0, -rainbowRadius / 2);
    p5.push();
    if (image.current != null) {
      drawSegment(p5, image.current, rainbowRadius, rainbowWidth, Math.PI, 180);
      // p5.image(image.current, 0, 0);
    }
    p5.pop();

    p5.push();
    p5.stroke(p5.color(highlightColour));
    p5.strokeWeight(4);
    p5.arc(
      0,
      rainbowRadius,
      rainbowRadius * 2,
      rainbowRadius * 2,
      Math.PI,
      Math.PI * 2
    );
    p5.pop();

    p5.pop();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Rainbow;
