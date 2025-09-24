import { render, screen, fireEvent } from "@testing-library/react";
import Survey from "./Survey";

describe("Survey", () => {
  test("renderiza las 5 opciones de estrellas", () => {
    render(<Survey />);
    const options = screen.getAllByRole("radio");
    expect(options).toHaveLength(5);
  });

  test("al seleccionar una estrella, se actualiza el estado", () => {
    render(<Survey />);
    const option3 = screen.getByRole("radio", { name: "3 ⭐" });
    fireEvent.click(option3);
    expect(option3).toBeChecked();
  });

  test("al enviar, aparece un mensaje de confirmación con la puntuación", () => {
    render(<Survey />);
    const option4 = screen.getByRole("radio", { name: "4 ⭐" });
    fireEvent.click(option4);

    const button = screen.getByRole("button", { name: /Enviar/i });
    fireEvent.click(button);

    const confirmation = screen.getByTestId("confirmation");
    expect(confirmation).toHaveTextContent("Tu puntuación fue 4");
  });
});
