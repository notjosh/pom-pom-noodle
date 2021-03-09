import React from "react";

import P5 from "p5";
import Sketch from "react-p5";

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
  src: P5.Image;
  highlightColour: P5.Color;
};

const Rainbow: React.FC<Props> = ({ src, highlightColour }) => {
  console.log({ src, highlightColour });
  const setup = (p5: P5, canvasParentRef: Element) => {
    console.log("setup");
    p5.createCanvas(src.width, src.height, p5.WEBGL).parent(canvasParentRef);
    p5.noLoop();
  };

  const draw = (p5: P5) => {
    console.log("draw");
    const rainbowRadius = src.width / 2;
    const rainbowWidth = rainbowRadius / 1.4;

    p5.push();
    p5.noFill();
    p5.translate(0, -rainbowRadius / 2);
    p5.push();
    // drawSegment(p5, src, rainbowRadius, rainbowWidth, Math.PI, 180);
    p5.image(src, 0, 0);
    p5.pop();

    p5.push();
    p5.stroke(highlightColour.toString());
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

    p5.push();
    p5.stroke(0);
    p5.strokeWeight(1);
    p5.rect(-rainbowRadius, 0, rainbowRadius * 2, rainbowRadius);
    p5.pop();

    p5.pop();
  };

  console.log("rainbow");

  return <Sketch setup={setup} draw={draw} />;
};

export default Rainbow;
