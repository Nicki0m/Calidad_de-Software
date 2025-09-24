import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  test("el botón está deshabilitado si los campos están vacíos", () => {
    render(<RegisterForm />);
    const button = screen.getByRole("button", { name: /Registrar/i });
    expect(button).toBeDisabled();
  });

  test("al completar los campos, el botón se habilita", () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "juan@example.com" },
    });
    const button = screen.getByRole("button", { name: /Registrar/i });
    expect(button).toBeEnabled();
  });

  test("al hacer submit, se limpia el formulario y aparece un mensaje de confirmación", () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "ana@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    expect(screen.getByText(/Registro completado con éxito/i)).toBeInTheDocument();
    expect((screen.getByPlaceholderText("Nombre") as HTMLInputElement).value).toBe("");
    expect((screen.getByPlaceholderText("Correo electrónico") as HTMLInputElement).value).toBe("");
  });
});
