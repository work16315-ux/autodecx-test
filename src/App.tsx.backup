import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SoundTestScreen from "./components/SoundTestScreen";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<SoundTestScreen />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;