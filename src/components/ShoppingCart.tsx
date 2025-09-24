import { useState } from "react";
import CustomButton from "./CustomButton";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Manzana", price: 1 },
  { id: 2, name: "Banana", price: 2 },
  { id: 3, name: "Naranja", price: 3 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<Product[]>([]);

  // Agregar producto
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Eliminar producto (por id)
  const removeFromCart = (id: number) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  // Calcular total
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
        Carrito de Compras 🛒
      </h2>

      {/* Lista de productos */}
      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2"
          >
            <span className="text-slate-700 dark:text-slate-200">
              {product.name} - ${product.price}
            </span>
            <CustomButton onClick={() => addToCart(product)}>
              Agregar
            </CustomButton>
          </div>
        ))}
      </div>

      {/* Carrito */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Carrito:
        </h3>
        {cart.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            Tu carrito está vacío
          </p>
        ) : (
          <ul className="space-y-1">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-slate-700 dark:text-slate-200"
              >
                {item.name} - ${item.price}
                <CustomButton
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Eliminar
                </CustomButton>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total */}
      <div className="font-bold text-slate-800 dark:text-slate-100">
        Total: ${total}
      </div>
    </div>
  );
}
