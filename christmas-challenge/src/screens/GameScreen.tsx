import React from "react";
import { useGameStore } from "../store/gameStore";

export const GameScreen = () => {
  const { currentPair, spin, isSpinning, challenges } = useGameStore();

  const canSpin = challenges.length > 0 && !isSpinning;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        🎯 Reto Aleatorio
      </h1>

      {/* Zona de resultado */}
      <div className="flex flex-col items-center justify-center mb-8 w-full max-w-md h-52 bg-white shadow-md rounded-xl p-6">
        {isSpinning ? (
          <p className="text-xl text-gray-600 animate-pulse">🎲 Girando...</p>
        ) : currentPair ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentPair.person}
            </h2>
            <p className="mt-3 text-lg text-gray-700 text-center">
              {currentPair.challenge}
            </p>
          </>
        ) : (
          <p className="text-gray-400 text-center">
            Pulsa "Siguiente reto" para empezar
          </p>
        )}
      </div>

      {/* Botón de girar */}
      <button
        onClick={spin}
        disabled={!canSpin}
        className={`w-full max-w-md px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
          canSpin
            ? "bg-teal-600 hover:bg-teal-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {challenges.length === 0 ? "No quedan retos" : "Siguiente reto"}
      </button>
    </div>
  );
};
