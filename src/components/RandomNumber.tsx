import { useState } from "react";
import CustomButton from "./CustomButton";

export default function RandomNumber() {
  const [number, setNumber] = useState<number | null>(null);

  const generateNumber = () => {
    let newNumber: number;
    do {
      // Generar número aleatorio en el rango [1,100]
      newNumber = Math.floor(Math.random() * 100) + 1;
    } while (newNumber === number); // Asegura que no se repita el mismo número
    setNumber(newNumber);
  };

  return (
    <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        Generador de Números Aleatorios 🎲
      </h2>

      <CustomButton onClick={generateNumber}>
        Generar número
      </CustomButton>

      {number !== null && (
        <p
          className="mt-4 text-2xl font-bold text-slate-700 dark:text-slate-200"
          data-testid="result"
        >
          {number}
        </p>
      )}
    </div>
  );
}
