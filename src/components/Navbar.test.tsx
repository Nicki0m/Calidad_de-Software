// src/components/Navbar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

// --- Mocks Globales Necesarios ---

// Simular funciones clave de manipulación del DOM y eventos
const mockToggle = jest.spyOn(document.documentElement.classList, "toggle");
const mockSetItem = jest.spyOn(localStorage, "setItem");
const mockDispatch = jest.spyOn(document, "dispatchEvent");

// Mock para simular la media query de preferencia de tema del sistema
const mockMatchMedia = (matches: boolean) => jest.fn().mockImplementation((query) => ({
    matches: matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));

// Limpia los mocks y restablece el estado antes de cada prueba
beforeEach(() => {
    jest.clearAllMocks();
    // 1. Resetear el almacenamiento local a null (no hay tema guardado)
    jest.spyOn(localStorage, 'getItem').mockReturnValue(null);
    // 2. Resetear la preferencia del sistema a 'light' (falsa)
    window.matchMedia = mockMatchMedia(false);
    // 3. Asegurar que el <html> no tiene la clase 'dark'
    document.documentElement.classList.remove("dark");
});

// ------------------------------------
// --- PRUEBAS EXISTENTES: RENDERIZADO ---
// ------------------------------------
describe("Navbar - Renderizado", () => {
    test("renderiza el título principal 'UCC : Prácticas Desarrollo'", () => {
        render(<Navbar />);
        expect(screen.getByText(/UCC : Prácticas Desarrollo/i)).toBeInTheDocument();
    });

    test("renderiza el botón con el texto 'Tema'", () => {
        render(<Navbar />);
        expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
    });
});

// ------------------------------------
// --- NUEVAS PRUEBAS: FUNCIONALIDAD DE TEMA ---
// ------------------------------------
describe("Navbar - Funcionalidad de Tema", () => {
    test("al hacer clic, debería alternar a 'dark', guardar en localStorage y disparar el evento", () => {
        // Estado inicial: no hay 'dark' en el DOM ni en localStorage
        render(<Navbar />);
        
        const themeButton = screen.getByRole("button", { name: /Tema/i });
        fireEvent.click(themeButton); 

        // 1. Verifica la manipulación del DOM: se añade 'dark'
        expect(mockToggle).toHaveBeenCalledWith("dark");
        
        // 2. Verifica el almacenamiento local: se guarda 'dark'
        expect(mockSetItem).toHaveBeenCalledWith("theme", "dark");
        
        // 3. Verifica la emisión del evento
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "theme:changed",
                detail: { theme: "dark" },
            })
        );
    });

    test("al hacer clic por segunda vez (estando en dark), debería alternar a 'light'", () => {
        // Preparación: simular que la clase 'dark' YA está presente
        document.documentElement.classList.add("dark");
        
        render(<Navbar />);
        const themeButton = screen.getByRole("button", { name: /Tema/i });
        
        // Simular el clic
        fireEvent.click(themeButton);
        
        // Verifica que se establece el tema 'light'
        expect(mockSetItem).toHaveBeenCalledWith("theme", "light");
        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { theme: "light" },
            })
        );
    });
});

// ------------------------------------
// --- NUEVAS PRUEBAS: INICIALIZACIÓN (useEffect) ---
// ------------------------------------
describe("Navbar - Inicialización de Tema", () => {
    const mockAdd = jest.spyOn(document.documentElement.classList, "add");
    
    test("debería aplicar el tema guardado en localStorage ('dark')", () => {
        // Configurar el mock para que `localStorage.getItem` devuelva 'dark'
        jest.spyOn(localStorage, 'getItem').mockReturnValue('dark');

        render(<Navbar />);

        // Verifica que se haya usado toggle(dark, true) para forzar el tema guardado
        expect(mockToggle).toHaveBeenCalledWith("dark", true); 
        expect(mockAdd).not.toHaveBeenCalled(); 
    });

    test("debería usar la preferencia del sistema (dark) si no hay tema guardado", () => {
        // 1. localStorage.getItem ya devuelve null por beforeEach
        // 2. Mockear la media query para simular que el sistema prefiere 'dark'
        window.matchMedia = mockMatchMedia(true); 

        render(<Navbar />);

        // Verifica que se llamó a .add('dark')
        expect(mockAdd).toHaveBeenCalledWith("dark"); 
        expect(mockToggle).not.toHaveBeenCalled();
    });
    
    test("no debería cambiar el tema si no hay preferencia guardada ni del sistema", () => {
        // En este caso, beforeEach ya prepara el ambiente para 'light'
        render(<Navbar />);

        // Verifica que no se llamó a ninguna función de cambio de tema
        expect(mockAdd).not.toHaveBeenCalled(); 
        expect(mockToggle).not.toHaveBeenCalled();
    });
});
