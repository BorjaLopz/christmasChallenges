import React, { useState } from "react";
import { SetupScreen } from "./screens/SetupScreen";
import { GameScreen } from "./screens/GameScreen";

export default function App() {
  // Estado simple para controlar pantalla
  const [started, setStarted] = useState(false);

  return started ? (
    <GameScreen />
  ) : (
    <SetupScreen onStart={() => setStarted(true)} />
  );
}
