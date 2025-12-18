import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Pair = {
  person: string;
  challenge: string;
};

type GameState = {
  people: string[];
  challenges: string[];
  currentPair: Pair | null;
  isSpinning: boolean;

  // Funciones del setup
  addPerson: (name: string) => void;
  removePerson: (index: number) => void;
  addChallenge: (challenge: string) => void;
  removeChallenge: (index: number) => void;

  // Funciones del juego
  spin: () => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      people: [],
      challenges: [],
      currentPair: null,
      isSpinning: false,

      addPerson: (name) =>
        set((state) => ({
          people: [...state.people, name],
        })),

      removePerson: (index) =>
        set((state) => ({
          people: state.people.filter((_, i) => i !== index),
        })),

      addChallenge: (challenge) =>
        set((state) => ({
          challenges: [...state.challenges, challenge],
        })),

      removeChallenge: (index) =>
        set((state) => ({
          challenges: state.challenges.filter((_, i) => i !== index),
        })),

      spin: () => {
        const { people, challenges } = get();

        if (people.length === 0 || challenges.length === 0) return;

        set({ isSpinning: true });

        setTimeout(() => {
          // Elegir persona aleatoria
          const person = people[Math.floor(Math.random() * people.length)];

          // Elegir reto aleatorio y eliminarlo de la lista
          const challengeIndex = Math.floor(Math.random() * challenges.length);
          const challenge = challenges[challengeIndex];
          const remainingChallenges = challenges.filter(
            (_, i) => i !== challengeIndex
          );

          set({
            currentPair: { person, challenge },
            challenges: remainingChallenges,
            isSpinning: false,
          });
        }, 1200); // 1.2s de “animación” antes de mostrar el resultado
      },

      resetGame: () =>
        set({
          people: [],
          challenges: [],
          currentPair: null,
          isSpinning: false,
        }),
    }),
    {
      name: "game-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
