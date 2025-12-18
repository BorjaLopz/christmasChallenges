import React from "react";
import { useGameStore } from "../store/gameStore";
import { AddItem } from "../components/AddItem";

type SetupScreenProps = {
  onStart: () => void;
};

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const {
    people,
    challenges,
    addPerson,
    addChallenge,
    removePerson,
    removeChallenge,
  } = useGameStore();

  const canStart = people.length > 0 && challenges.length > 0;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Alchemy Down
      </h1>

      <div className="w-full max-w-md space-y-6">
        {/* Personas */}
        <AddItem
          placeholder="Nombre del jugador"
          items={people}
          onAdd={addPerson}
          onRemove={removePerson}
          type="person"
        />

        {/* Retos */}
        <AddItem
          placeholder="Reto"
          items={challenges}
          onAdd={addChallenge}
          onRemove={removeChallenge}
          type="challenge"
        />
      </div>

      {/* Botón empezar */}
      <button
        disabled={!canStart}
        onClick={onStart}
        className={`mt-10 w-full max-w-md px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
          canStart
            ? "bg-teal-600 hover:bg-teal-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Empezar juego
      </button>
    </div>
  );
};
