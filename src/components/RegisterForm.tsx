import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isDisabled = !name || !email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Registro completado con éxito`);
    setName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 
                 bg-white dark:bg-slate-800 
                 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
        Formulario de Registro
      </h2>

      <CustomInput
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <CustomInput
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CustomButton type="submit" isDisabled={isDisabled}>
        Registrar
      </CustomButton>

      {message && (
        <p className="text-green-600 dark:text-green-400">{message}</p>
      )}
    </form>
  );
}
