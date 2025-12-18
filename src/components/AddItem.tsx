import React, { useState } from "react";

type AddItemProps = {
  placeholder: string;
  items: string[];
  onAdd: (newValue: string) => void;
  onRemove: (idToRemove: number) => void;
  type?: "person" | "challenge"; // nuevo prop opcional
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

  // Estilos según tipo
  const itemPadding = type === "challenge" ? "py-3" : "py-1";
  const textSize =
    type === "challenge" ? "text-gray-800 text-base" : "text-gray-800";

  return (
    <div className="mb-6 w-full">
      {/* Input + Botón */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 text-gray-800"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-semibold"
        >
          Añadir
        </button>
      </div>

      {/* Lista de items */}
      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex justify-between items-center px-4 ${itemPadding} bg-gray-100 rounded-lg shadow-sm`}
          >
            <span className={textSize}>{item}</span>
            <button
              onClick={() => onRemove(i)}
              className="text-red-400 hover:text-red-600 font-bold transition-colors duration-200 w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
