import { render, screen, fireEvent } from "@testing-library/react";
import RandomNumber from "./RandomNumber";

describe("RandomNumber", () => {
  test("muestra un número después de hacer clic", () => {
    render(<RandomNumber />);
    const button = screen.getByRole("button", { name: /Generar número/i });

    fireEvent.click(button);

    const result = screen.getByTestId("result");
    expect(result).toBeInTheDocument();
  });

  test("el número está dentro del rango [1,100]", () => {
    render(<RandomNumber />);
    const button = screen.getByRole("button", { name /Generar número/i });

    fireEvent.click(button);

    const result = screen.getByTestId("result");
    const value = Number(result.textContent);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(100);
  });

  test("cada clic genera un nuevo número distinto", () => {
    render(<RandomNumber />);
    const button = screen.getByRole("button", { name: /Generar número/i });

    fireEvent.click(button);
    const firstValue = Number(screen.getByTestId("result").textContent);

    fireEvent.click(button);
    const secondValue = Number(screen.getByTestId("result").textContent);

    expect(secondValue).not.toBe(firstValue);
  });
});