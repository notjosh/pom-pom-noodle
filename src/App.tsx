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
  const p5 = React.useMemo(() => {
    return new P5(() => {});
  }, []);

  const [top, setTop] = useState<P5.Image>(
    p5.createImage(config.width, config.height)
  );
  const onDrawTop = useCallback(
    (image: string) => setTop(p5.loadImage(image)),
    [p5]
  );

  console.log("render");

  return (
    <>
      <h1>top:</h1>
      {/* <Scribble
        width={config.width}
        height={config.height}
        onDraw={onDrawTop}
      /> */}
      {top && (
        <Rainbow
          src={top}
          highlightColour={p5.color(222, 14, 14)}
          width={config.width}
          height={config.height}
        />
      )}

      {/* <h1>bottom:</h1>
      <Scribble width={300} height={150} />
      <Rainbow src={bottom} /> */}
    </>
  );
};

export default App;
