import React, { useState } from "react";
import { Plus, X } from "lucide-react";

type AddItemProps = {
  placeholder: string;
  items: string[];
  onAdd: (newValue: string) => void;
  onRemove: (idToRemove: number) => void;
  type?: "person" | "challenge";
};

export const AddItem: React.FC<AddItemProps> = ({
  placeholder,
  items,
  onAdd,
  onRemove,
  type = "person",
}) => {
  const [input, setInput] = useState<string>("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    onAdd(input.trim());
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  const gradientClass =
    type === "challenge"
      ? "from-pink-500 to-rose-500"
      : "from-blue-500 to-cyan-500";

  return (
    <div className="space-y-3">
      {/* Input con botón integrado - altura fija */}
      <div className="relative group h-12">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full h-full px-4 pr-28 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className={`absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r ${gradientClass} rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95 flex-shrink-0`}
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm whitespace-nowrap">
            Añadir
          </span>
        </button>
      </div>

      {/* Contenedor con altura fija para evitar movimiento del layout */}
      <div className="h-64">
        {items.length > 0 ? (
          <div className="space-y-2 h-full overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item, i) => (
              <div
                key={i}
                className="group flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in"
              >
                <span className="text-white font-medium flex-1 mr-3 break-words">
                  {item}
                </span>
                <button
                  onClick={() => onRemove(i)}
                  className="flex-shrink-0 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-500 transition-all duration-300 opacity-70 group-hover:opacity-100"
                >
                  <X className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-purple-300/50 text-sm">
              No hay elementos añadidos aún
            </p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
