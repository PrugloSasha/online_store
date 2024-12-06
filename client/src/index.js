import React, { createContext } from 'react'; // Імпорт React і функції createContext
import ReactDOM from 'react-dom'; // Імпорт для рендеру додатку в DOM
import App from './App'; // Головний компонент додатку
import UserStore from "./store/UserStore"; // Стор для керування станом користувача
import DeviceStore from "./store/DeviceStore"; // Стор для керування станом пристроїв

// Створюємо глобальний контекст для зберігання станів
export const Context = createContext(null);

ReactDOM.render(
    // Надаємо контекст усім компонентам через Provider
    <Context.Provider
        value={{
            user: new UserStore(), // Ініціалізуємо UserStore
            device: new DeviceStore(), // Ініціалізуємо DeviceStore
        }}
    >
        <App /> {/* Рендер головного компонента App */}
    </Context.Provider>,
    document.getElementById('root') // Вказуємо елемент DOM, в який рендеримо додаток
);
