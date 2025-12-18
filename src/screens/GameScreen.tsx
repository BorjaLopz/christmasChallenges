import React, { useState, useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { Sparkles, Zap, ArrowLeft, Shuffle } from "lucide-react";

type GameScreenProps = {
  onBack: () => void;
};

export const GameScreen: React.FC<GameScreenProps> = ({ onBack }) => {
  const { currentPair, spin, isSpinning, challenges, people } = useGameStore();
  const [shuffledPerson, setShuffledPerson] = useState("");
  const [shuffledChallenge, setShuffledChallenge] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const canSpin = challenges.length > 0 && !isSpinning;

  // Efecto de shuffle cuando está girando
  useEffect(() => {
    if (isSpinning) {
      setShowResult(false);
      setHasPlayed(true);
      const interval = setInterval(() => {
        // Mezclar persona aleatoria
        const randomPerson = people[Math.floor(Math.random() * people.length)];
        setShuffledPerson(randomPerson || "");

        // Mezclar reto aleatorio
        const randomChallenge =
          challenges[Math.floor(Math.random() * challenges.length)];
        setShuffledChallenge(randomChallenge || "");
      }, 100);

      setShowResult(true);
      // Mostrar resultado después de 2 segundos
      setTimeout(() => {}, 2000);

      return () => clearInterval(interval);
    }
  }, [isSpinning, people, challenges]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Reto Aleatorio
            </h1>
            <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-purple-300">
            Gira la ruleta y descubre el siguiente desafío
          </p>
        </div>

        {/* Tarjeta principal con efecto 3D */}
        <div className="relative mb-8">
          {/* Glow effect de fondo - más intenso cuando gira */}
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl transition-opacity duration-300 ${
              isSpinning ? "opacity-100 animate-pulse" : "opacity-75"
            }`}
          ></div>

          {/* Tarjeta de contenido */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl min-h-[320px] flex flex-col items-center justify-center overflow-hidden">
            {isSpinning ? (
              <div className="text-center">
                {/* <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-slate-900 to-purple-900 rounded-full flex items-center justify-center">
                    <Shuffle className="w-10 h-10 text-purple-400 animate-pulse" />
                  </div>
                </div> */}

                {/* Efecto de ruleta - nombres cambiando */}
                <div className="space-y-4">
                  <div>
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/40 rounded-full mb-2">
                      <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                        Jugador
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white blur-sm">
                      {shuffledPerson || "???"}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                    <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
                  </div>

                  <div>
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-pink-500/30 to-rose-500/30 border border-pink-400/40 rounded-full mb-2">
                      <span className="text-xs font-semibold text-pink-300 uppercase tracking-wider">
                        Desafío
                      </span>
                    </div>
                    <p className="text-xl text-white blur-sm">
                      {shuffledChallenge || "???"}
                    </p>
                  </div>
                </div>
              </div>
            ) : currentPair && showResult ? (
              <div className="text-center w-full space-y-6 animate-scale-in">
                {/* Jugador */}
                <div className="animate-slide-down">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full mb-4">
                    <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                      Jugador
                    </span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2">
                    {currentPair.person}
                  </h2>
                </div>

                {/* Separador */}
                <div className="flex items-center justify-center gap-4 animate-fade-in">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                </div>

                {/* Reto */}
                <div className="animate-slide-up">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-400/30 rounded-full mb-4">
                    <span className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
                      Desafío
                    </span>
                  </div>
                  <p className="text-2xl text-white font-medium leading-relaxed">
                    {currentPair.challenge}
                  </p>
                </div>
              </div>
            ) : !hasPlayed ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-xl text-purple-300">
                  Pulsa el botón para comenzar
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          {/* Botón principal - Siguiente reto o Volver a configuración */}
          {challenges.length === 0 ? (
            <button
              onClick={onBack}
              className="w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 transform bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              No quedan más retos. ¿Nueva partida?
            </button>
          ) : (
            <button
              onClick={spin}
              disabled={!canSpin}
              className={`w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                canSpin
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              Siguiente Reto
            </button>
          )}

          {/* Botón secundario - Volver */}
          {challenges.length > 0 && (
            <button
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-purple-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">Volver a configuración</span>
            </button>
          )}
        </div>

        {/* Contador de retos restantes */}
        {challenges.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-purple-300 text-sm">
              {challenges.length}{" "}
              {challenges.length === 1 ? "reto restante" : "retos restantes"}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.1s both;
        }
      `}</style>
    </div>
  );
};
