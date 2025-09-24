import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

export default function Survey() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating !== null) {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-6 text-center bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        Encuesta de Satisfacción
      </h2>

      {/* Opciones de 1 a 5 estrellas */}
      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((value) => (
          <label
            key={value}
            className="cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <CustomInput
              type="radio"
              name="rating"
              value={value}
              checked={rating === value}
              onChange={() => setRating(value)}
              className="mr-2"
            />
            {value} ⭐
          </label>
        ))}
      </div>

      {/* Botón enviar */}
      <CustomButton onClick={handleSubmit} isDisabled={rating === null}>
        Enviar
      </CustomButton>

      {/* Mensaje de confirmación */}
      {submitted && rating !== null && (
        <p
          className="mt-4 text-lg font-semibold text-green-600 dark:text-green-400"
          data-testid="confirmation"
        >
          ¡Gracias! Tu puntuación fue {rating} ⭐
        </p>
      )}
    </div>
  );
}
