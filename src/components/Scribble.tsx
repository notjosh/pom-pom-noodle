import React from "react";
import Painto from "./Painto";

type Props = {
  width: number;
  height: number;
  onDraw: (image: HTMLCanvasElement) => void;
};

const Scribble: React.FC<Props> = ({ width, height, onDraw }) => {
  const props = {
    brushCol: "#00ff00",
    backgroundCol: "#ff0000",
    lineWidth: 10,
    height,
    width,
    onDraw: (canvas: HTMLCanvasElement) => {
      const data = canvas.toDataURL("image/png");
      console.log("i have drawn!");
      onDraw(canvas);
    },
  };

  return <Painto {...props} />;
};

export default Scribble;
