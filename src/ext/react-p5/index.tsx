import React from "react";
import P5 from "p5";

if (typeof window !== "undefined") {
  window.P5 = P5;
}

type Props = {
  className?: string;
  style?: { [key: string]: number | string };
  setup: (p5: P5, CanvasParentRef: Element) => void;
  draw?: (p5: P5) => void;
  windowResized?: (p5: P5) => void;
  preload?: (p5: P5) => void;
  mouseClicked?: (p5: P5) => void;
  mouseMoved?: (p5: P5) => void;
  doubleClicked?: (p5: P5) => void;
  mousePressed?: (p5: P5) => void;
  mouseWheel?: (p5: P5) => void;
  mouseDragged?: (p5: P5) => void;
  mouseReleased?: (p5: P5) => void;
  keyPressed?: (p5: P5) => void;
  keyReleased?: (p5: P5) => void;
  keyTyped?: (p5: P5) => void;
  touchStarted?: (p5: P5) => void;
  touchMoved?: (p5: P5) => void;
  touchEnded?: (p5: P5) => void;
  deviceMoved?: (p5: P5) => void;
  deviceTurned?: (p5: P5) => void;
  deviceShaken?: (p5: P5) => void;
};

export default class Sketch extends React.Component<Props> {
  private canvasParentRef: React.RefObject<HTMLDivElement>;
  private sketch: P5 | undefined;

  constructor(props: Readonly<Props>) {
    super(props);

    this.canvasParentRef = React.createRef();
  }

  componentDidMount() {
    this.sketch = new P5((p) => {
      p.setup = () => {
        if (this.canvasParentRef?.current == null) {
          return;
        }

        this.props.setup(p, this.canvasParentRef.current);
      };

      const p5Events = [
        "draw",
        "windowResized",
        "preload",
        "mouseClicked",
        "doubleClicked",
        "mouseMoved",
        "mousePressed",
        "mouseWheel",
        "mouseDragged",
        "mouseReleased",
        "keyPressed",
        "keyReleased",
        "keyTyped",
        "touchStarted",
        "touchMoved",
        "touchEnded",
        "deviceMoved",
        "deviceTurned",
        "deviceShaken",
      ];

      for (let eventName of p5Events) {
        const propped = this.props[eventName];
        if (propped) {
          p[eventName] = () => {
            propped(p);
          };
        }
      }
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.sketch?.remove();
  }

  render() {
    return (
      <div
        ref={this.canvasParentRef}
        className={this.props.className ?? "react-p5"}
        style={this.props.style || {}}
      />
    );
  }
}
