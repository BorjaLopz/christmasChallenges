import React from "react";
import { useGameStore } from "../store/gameStore";
import { AddItem } from "../components/AddItem";
import { Users, Trophy } from "lucide-react";

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

  // Retos predefinidos
  const predefinedChallenges = [
    // "Bebe 2 tragos",
    // "Cuenta una anécdota vergonzosa",
    // "Imita a alguien de la sala",
    // "Verdad o reto: elige",
    // "Baila durante 30 segundos",
    // "Habla con acento durante 1 minuto",
    // "Haz 10 flexiones",
    // "Canta una canción",
    // "Bebe un chupito",
    // "Di un trabalenguas 3 veces",
    // "Intercambia ropa con alguien",
    // "Cuenta un chiste",
    "Preguntar a Del Piero si está buscando algo",
    "Mano en el hombre baúl",
  ];

  const addPredefinedChallenges = () => {
    predefinedChallenges.forEach((challenge) => {
      if (!challenges.includes(challenge)) {
        addChallenge(challenge);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header con diseño moderno */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-3 shadow-2xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Alchemy Down
          </h1>
          <p className="text-purple-300 text-lg font-light">
            Configura jugadores y retos para empezar la diversión
          </p>
        </div>

        {/* Contenedor principal con glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sección Jugadores */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Jugadores</h2>
                  <p className="text-sm text-purple-300">
                    {people.length} añadidos
                  </p>
                </div>
              </div>
              <AddItem
                placeholder="Nombre del jugador"
                items={people}
                onAdd={addPerson}
                onRemove={removePerson}
                type="person"
              />
            </div>

            {/* Sección Retos */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">Retos</h2>
                  <p className="text-sm text-purple-300">
                    {challenges.length} añadidos
                  </p>
                </div>
                <button
                  onClick={addPredefinedChallenges}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
                >
                  ⚡ Retos rápidos
                </button>
              </div>
              <AddItem
                placeholder="Escribe un reto"
                items={challenges}
                onAdd={addChallenge}
                onRemove={removeChallenge}
                type="challenge"
              />
            </div>
          </div>
        </div>

        {/* Botón CTA */}
        <button
          disabled={!canStart}
          onClick={onStart}
          className={`w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
            canStart
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {canStart
            ? "🎮 Empezar Juego"
            : "⚠️ Añade jugadores y retos para comenzar"}
        </button>
      </div>
    </div>
  );
};
