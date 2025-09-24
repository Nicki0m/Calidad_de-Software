// src/components/ShoppingCart.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

describe("ShoppingCart", () => {
  test("el carrito inicia vacío", () => {
    render(<ShoppingCart />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });

  test("al agregar un producto, aumenta el total", () => {
    render(<ShoppingCart />);
    const addButton = screen.getByText("Agregar", { selector: "button" });
    fireEvent.click(addButton);

    expect(screen.getByText(/Carrito:/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$/)).not.toHaveTextContent("0");
  });

  test("al eliminar un producto, el total se actualiza", () => {
    render(<ShoppingCart />);
    const addButton = screen.getByText("Agregar", { selector: "button" });
    fireEvent.click(addButton);

    const removeButton = screen.getByText("Eliminar");
    fireEvent.click(removeButton);

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });

  test("se calcula el precio total correctamente", () => {
    render(<ShoppingCart />);
    const addButtons = screen.getAllByText("Agregar");

    // Agregar dos productos
    fireEvent.click(addButtons[0]); // Manzana $1
    fireEvent.click(addButtons[1]); // Banana $2

    expect(screen.getByText("Total: $3")).toBeInTheDocument();
  });
});
