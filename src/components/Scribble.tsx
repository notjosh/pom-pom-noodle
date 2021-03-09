import React from "react";
import Painto from "./Painto";

type Props = {
  width: number;
  height: number;
  onDraw: (image: string) => void;
};

const Scribble: React.FC<Props> = ({ width, height, onDraw }) => {
  const props = {
    style: {
      background: "tomato",
      /* Arbitrary css styles */
    },
    brushCol: "#ffffff",
    lineWidth: 10,
    className: "react-paint",
    height,
    width,
    onDraw: (canvas: HTMLCanvasElement) => {
      const data = canvas.toDataURL("image/png");
      console.log("i have drawn!", data);
      onDraw(data);
    },
  };

  return <Painto {...props} />;
};

export default Scribble;
