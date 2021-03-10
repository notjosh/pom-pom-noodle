import React, { useEffect } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  height: number;
  width: number;
  brushCol: string;
  backgroundCol?: string;
  lineWidth: number;
  onDraw?: (canvas: HTMLCanvasElement) => void;
};

const Painto: React.FC<Props> = (props) => {
  const {
    width,
    height,
    onDraw,
    style,
    className = "react-paint",
    brushCol,
    backgroundCol,
    lineWidth,
  } = props;

  const canvas = React.useRef<HTMLCanvasElement>(null);
  const ctx = React.useRef<CanvasRenderingContext2D | null>(null);
  const bb = React.useRef<DOMRect | null>(null);

  const [mouseDown, setMouseDown] = React.useState(false);
  const [mouseLocation, setMouseLocation] = React.useState<[number, number]>([
    0,
    0,
  ]);

  useOnClickFinishOutside(canvas, () => {
    setMouseDown(false);
  });

  useEffect(() => {
    const context = canvas?.current?.getContext("2d");
    if (context != null) {
      if (backgroundCol != null) {
        context.fillStyle = backgroundCol;
        context.fillRect(0, 0, width, height);
      }

      context.lineWidth = lineWidth;
      context.strokeStyle = brushCol;
      context.lineJoin = context.lineCap = "round";

      ctx.current = context;
    }

    bb.current = canvas.current?.getBoundingClientRect() ?? null;
  }, [brushCol, lineWidth, backgroundCol, width, height, canvas, bb]);

  useEffect(() => {
    if (mouseDown === true) {
      return;
    }

    if (canvas.current != null && onDraw != null) {
      onDraw(canvas.current);
    }
  }, [mouseDown]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    setMouseLocation([e.pageX, e.pageY]);

    if (bb.current != null) {
      const x = e.clientX - bb.current.left;
      const y = e.clientY - bb.current.top;

      ctx.current?.moveTo(x, y);

      ctx.current?.lineTo(x, y);
      ctx.current?.stroke();
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mouseDown && bb.current != null) {
      const x = e.clientX - bb.current.left;
      const y = e.clientY - bb.current.top;

      ctx.current?.lineTo(x, y);
      ctx.current?.stroke();
    }
  };

  return (
    <div className={className}>
      <canvas
        ref={canvas}
        className={`${className}__canvas`}
        width={width}
        height={height}
        style={{ ...style, width, height }}
        onMouseDown={onMouseDown}
        // onTouchStart={this.mouseDown}
        onMouseUp={onMouseUp}
        // onTouchEnd={this.mouseUp}
        onMouseMove={onMouseMove}
        // onTouchMove={this.touchMove}
      />
    </div>
  );
};

// Hook

function useOnClickFinishOutside(
  ref: React.RefObject<HTMLElement>,
  handler: React.EffectCallback
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (
        target instanceof Element &&
        (!ref.current || ref.current.contains(target))
      ) {
        return;
      }

      handler();
    };

    document.addEventListener("mouseup", listener);
    document.addEventListener("touchend", listener);

    return () => {
      document.removeEventListener("mouseup", listener);
      document.removeEventListener("touchend", listener);
    };
  }, [ref, handler]);
}

export default Painto;
