import React, { useCallback, useState } from "react";
import "./App.css";
import Rainbow from "./components/Rainbow";
import Scribble from "./components/Scribble";
import P5 from "p5";

const config = {
  width: 300,
  height: 150,
};

const App: React.FC = () => {
  const [top, setTop] = useState<string | null>(null);
  const onDrawTop = useCallback(
    (image: HTMLCanvasElement) => setTop(image.toDataURL()),
    []
  );

  const [bottom, setBottom] = useState<string | null>(null);
  const onDrawBottom = useCallback(
    (image: HTMLCanvasElement) => setBottom(image.toDataURL()),
    []
  );

  return (
    <>
      <div style={{ float: "left" }}>
        <h1>top:</h1>
        <Scribble
          width={config.width}
          height={config.height}
          onDraw={onDrawTop}
        />
        {top && (
          <Rainbow
            src={top}
            highlightColour={[222, 14, 14]}
            width={config.width}
            height={config.height}
          />
        )}
      </div>

      <div style={{ float: "left" }}>
        <h1>bottom:</h1>
        <Scribble
          width={config.width}
          height={config.height}
          onDraw={onDrawBottom}
        />
        {bottom && (
          <Rainbow
            src={bottom}
            highlightColour={[14, 222, 14]}
            width={config.width}
            height={config.height}
          />
        )}
      </div>
    </>
  );
};

export default App;
