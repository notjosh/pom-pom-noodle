import React from "react";

interface Props {
  className?: string;
  style: object;
  height: number;
  width: number;
  brushCol: string;
  lineWidth: number;
  onDraw: (canvas: HTMLCanvasElement) => void;
}

interface State {
  mouseDown: boolean;
  mouseLoc: [number, number];
}

class Painto extends React.Component<Props, State> {
  static defaultProps = {
    className: "react-paint",
    style: {},
    height: 500,
    width: 500,
    brushCol: "#ff6347",
    lineWidth: 10,
    onDraw: () => {},
  };

  private canvas: HTMLCanvasElement | null = null;
  private bb: DOMRect | undefined;
  private ctx?: CanvasRenderingContext2D | null = null;

  state: State = {
    mouseDown: false,
    mouseLoc: [0, 0],
  };

  componentDidMount() {
    const { brushCol, lineWidth } = this.props;

    const ctx = this.canvas?.getContext("2d");

    if (ctx != null) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = brushCol;
      ctx.lineJoin = ctx.lineCap = "round";

      this.ctx = ctx;
    }

    this.bb = this.canvas?.getBoundingClientRect();
  }

  componentWillUpdate(nextProps: Props) {
    const { brushCol, lineWidth } = this.props;

    if (
      this.ctx != null &&
      (brushCol !== nextProps.brushCol || lineWidth !== nextProps.lineWidth)
    ) {
      this.ctx.lineWidth = nextProps.lineWidth;
      this.ctx.strokeStyle = nextProps.brushCol;
    }
  }

  mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!this.state.mouseDown) {
      this.setState({ mouseDown: true });
    }

    this.setState({
      mouseLoc: [e.pageX, e.pageY],
    });

    if (this.bb != null) {
      this.ctx?.moveTo(e.pageX - this.bb.left, e.pageY - this.bb.top);
    }
  };

  mouseUp = () => this.setState({ mouseDown: false });

  mouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.state.mouseDown) {
      if (
        e.pageX > 0 &&
        e.pageY < this.props.height &&
        this.ctx != null &&
        this.bb != null
      ) {
        this.ctx.lineTo(e.pageX - this.bb.left, e.pageY - this.bb.top);

        this.ctx.stroke();
      }
    }
  };

  render() {
    const { width, height, onDraw, style, className } = this.props;

    return (
      <div className={className}>
        <canvas
          ref={(c) => {
            this.canvas = c;
          }}
          className={`${className}__canvas`}
          width={width}
          height={height}
          onClick={(e) => {
            if (this.canvas != null) {
              onDraw(this.canvas);
            }
          }}
          style={Object.assign({}, style, {
            width: this.props.width,
            height: this.props.height,
          })}
          onMouseDown={this.mouseDown}
          // onTouchStart={this.mouseDown}
          onMouseUp={this.mouseUp}
          // onTouchEnd={this.mouseUp}
          onMouseMove={this.mouseMove}
          // onTouchMove={this.touchMove}
        />
      </div>
    );
  }
}

export default Painto;
