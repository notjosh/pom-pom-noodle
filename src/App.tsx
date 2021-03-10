import React, { useCallback, useState } from "react";
import "./App.css";
import Ball from "./components/Ball";
import Rainbow from "./components/Rainbow";
import Scribble from "./components/Scribble";

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
      <div style={{ float: "left", margin: 10 }}>
        <h1>top:</h1>
        <Scribble
          width={config.width}
          height={config.height}
          onDraw={onDrawTop}
          backgroundCol={"blue"}
          brushCol={"#ff00ff"}
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

      <div style={{ float: "left", margin: 10 }}>
        <h1>bottom:</h1>
        <Scribble
          width={config.width}
          height={config.height}
          onDraw={onDrawBottom}
          backgroundCol={"magenta"}
          brushCol={"#00ff00"}
        />
        {bottom && (
          <Rainbow
            src={bottom}
            highlightColour={[254, 208, 1]}
            width={config.width}
            height={config.height}
          />
        )}
      </div>

      <div style={{ clear: "both" }}>
        <h1>combined:</h1>
        {top && bottom && (
          <Ball top={top} bottom={bottom} size={config.width} />
        )}
      </div>
    </>
  );
};

export default App;
