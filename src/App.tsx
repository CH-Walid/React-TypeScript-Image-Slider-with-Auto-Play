import { useState, useRef, memo } from "react";
import "./App.css";

type ControllersProps = {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TIMEOUT = 1000;

const SLIDES = [
  "https://picsum.photos/id/237/700/300",
  "https://picsum.photos/id/337/700/300",
  "https://picsum.photos/id/247/700/300",
];

const Slider = ({ index }: { index: number }) => {
  return <img src={SLIDES[index]} />;
};

const Controllers = ({ setIndex }: ControllersProps) => {
  const interval = useRef<number | null>(null);

  // one function gets next or prev slide depending on the param giving
  const nextSlide = (moveBy: 1 | -1) => {
    moveBy === 1
      ? setIndex((prev) => {
          return prev === SLIDES.length - 1 ? 0 : prev + 1;
        })
      : setIndex((prev) => {
          return prev === 0 ? SLIDES.length - 1 : prev - 1;
        });
  };

  // gets Next slide each 'TIMEOUT'
  const playSlider = () => {
    if (interval.current) return;
    interval.current = setInterval(() => {
      nextSlide(1);
    }, TIMEOUT);
  };

  // stops slider
  const stopSlider = () => {
    if (interval.current) clearInterval(interval.current);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      <button onClick={() => nextSlide(-1)}>Prev</button>
      <button onClick={() => nextSlide(1)}>Next</button>
      <button onClick={playSlider}>Play</button>
      <button onClick={stopSlider}>Stop</button>
    </div>
  );
};

// Desc Component is wrapped with a memo to prevent unnecessary re-renders
const Desc = memo(() => {
  console.log('desc');
  return (
    <ul className="note">
      <li>Click Prev - show previous picture</li>
      <li>Click Next - show next picture</li>
      <li>
        Click Play - slide pictures circular way with intervals of some seconds
      </li>
      <li>Click Stop - stop slider</li>
    </ul>
  );
});

function App() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Slider index={index} />
      <Controllers setIndex={setIndex} />
      <Desc />
    </>
  );
}

export default App;
