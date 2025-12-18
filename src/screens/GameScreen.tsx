import React from "react";
import { useGameStore } from "../store/gameStore";
import { Sparkles, Zap } from "lucide-react";

export const GameScreen = () => {
  const { currentPair, spin, isSpinning, challenges } = useGameStore();

  const canSpin = challenges.length > 0 && !isSpinning;

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
          {/* Glow effect de fondo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-75 animate-pulse"></div>

          {/* Tarjeta de contenido */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl min-h-[320px] flex flex-col items-center justify-center">
            {isSpinning ? (
              <div className="text-center">
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-slate-900 to-purple-900 rounded-full flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
                  </div>
                </div>
                <p className="text-2xl text-purple-300 font-semibold animate-pulse">
                  Seleccionando...
                </p>
              </div>
            ) : currentPair ? (
              <div className="text-center w-full space-y-6">
                {/* Jugador */}
                <div>
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
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                </div>

                {/* Reto */}
                <div>
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
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-xl text-purple-300">
                  Pulsa el botón para comenzar
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botón de acción */}
        <button
          onClick={spin}
          disabled={!canSpin}
          className={`w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
            canSpin
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {challenges.length === 0
            ? "🎉 No quedan más retos"
            : "🎲 Siguiente Reto"}
        </button>

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
    </div>
  );
};
