import React from "react";
import Painto from "./Painto";

type Props = {
  width: number;
  height: number;
  onDraw: (image: HTMLCanvasElement) => void;
  brushCol: string;
  backgroundCol?: string;
};

const Scribble: React.FC<Props> = ({
  width,
  height,
  onDraw,
  brushCol,
  backgroundCol,
}) => {
  const props = {
    brushCol,
    backgroundCol,
    lineWidth: 10,
    height,
    width,
    onDraw,
  };

  return <Painto {...props} />;
};

export default Scribble;
