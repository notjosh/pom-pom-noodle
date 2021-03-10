import React from "react";
import P5 from "p5";
import Sketch from "../ext/react-p5";

type Props = {
  top: string;
  bottom: string;
  size: number;
};

const Ball: React.FC<Props> = ({ top, bottom, size }) => {
  const p5ref = React.useRef<P5 | null>();

  const imageTop = React.useRef<P5.Image | null>();
  const imageBottom = React.useRef<P5.Image | null>();
  const texture = React.useRef<P5.Image | null>();

  React.useEffect(() => {
    console.log("texture");
    const p5 = p5ref.current;
    if (p5 == null) {
      console.log("texture: no p5");
      return undefined;
    }

    if (imageTop.current == null || imageBottom.current == null) {
      console.log("texture: no image");
      return undefined;
    }

    const colourTop = p5.color(222, 14, 14);
    const colourBottom = p5.color(254, 208, 1);

    const pg = p5.createGraphics(
      imageTop.current.width + imageBottom.current.width,
      imageTop.current.height + imageBottom.current.height
    );

    pg.push();
    pg.rotate(pg.HALF_PI);
    pg.translate(0, -imageTop.current.height * 2);
    pg.image(imageTop.current, 0, 0);
    pg.translate(0, -imageBottom.current.height * 2);
    pg.image(imageBottom.current, 0, 0);
    pg.pop();

    pg.push();
    pg.rotate(-p5.PI / 2);
    pg.scale(-1, 1);
    pg.translate(0, imageBottom.current.height * 2);
    pg.image(imageBottom.current, 0, 0);
    pg.translate(0, -imageTop.current.height * 2);
    pg.image(imageTop.current, 0, 0);
    pg.pop();

    pg.push();
    pg.strokeWeight(4);
    pg.stroke(colourTop);
    pg.line(2, 0, 2, imageTop.current.width);
    pg.line(
      imageTop.current.height * 2 - 2,
      0,
      imageTop.current.height * 2 - 2,
      imageTop.current.width
    );

    pg.translate(imageTop.current.height * 2, 0);
    pg.stroke(colourBottom);
    pg.line(2, 0, 2, imageTop.current.width);
    pg.line(
      imageTop.current.height * 2 - 2,
      0,
      imageTop.current.height * 2 - 2,
      imageTop.current.width
    );
    pg.pop();

    const img = p5.createImage(pg.width, pg.height);
    img.copy(pg, 0, 0, pg.width, pg.height, 0, 0, pg.width, pg.height);

    console.log("img", { img });

    texture.current = img;
  }, [top, bottom]);

  let rotY = 0;
  let rotZ = 0;

  React.useEffect(() => {
    const p5 = p5ref.current;

    if (p5 != null) {
      imageTop.current = p5.loadImage(top);
      imageBottom.current = p5.loadImage(bottom);
    }
  }, [top, bottom]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(size, size, p5.WEBGL).parent(canvasParentRef);

    p5ref.current = p5;
  };

  const draw = (p5: P5) => {
    p5.background("cyan");

    p5.push();

    p5.rotateX(rotZ);
    p5.rotateY(rotY);

    p5.stroke(3);
    if (texture.current != null) {
      console.log("texture it pls");
      p5.texture(texture.current);
    } else {
      console.log("skip");
    }
    p5.sphere(size / 3, 15, 15);

    if (p5.mouseIsPressed === true && p5.mouseButton === p5.LEFT) {
      const deltaX = p5.pmouseX - p5.mouseX;
      const deltaY = p5.pmouseY - p5.mouseY;
      rotY += (-deltaX * p5.PI) / (p5.width >> 1);
      rotZ += (deltaY * p5.PI) / (p5.height >> 1);

      rotZ = p5.min(p5.HALF_PI, rotZ);
      rotZ = p5.max(-p5.HALF_PI, rotZ);
    }

    p5.pop();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Ball;
