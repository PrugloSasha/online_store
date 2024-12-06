import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom"; // Маршрутизація
import AppRouter from "./components/AppRouter"; // Роутер додатку
import NavBar from "./components/NavBar"; // Навігаційна панель
import { observer } from "mobx-react-lite"; // MobX observer для реактивності
import { Context } from "./index"; // Глобальний контекст
import { check } from "./http/userAPI"; // Функція перевірки авторизації
import { Spinner } from "react-bootstrap"; // Компонент завантаження Bootstrap

const App = observer(() => {
    const { user } = useContext(Context); // Доступ до глобального стану користувача
    const [loading, setLoading] = useState(true); // Стан для відображення завантаження

    // Виконується при першому завантаженні додатку
    useEffect(() => {
        check()
            .then(data => {
                user.setUser(data); // Встановлюємо дані користувача
                user.setIsAuth(true); // Встановлюємо статус авторизації
            })
            .catch(error => {
                console.error("Помилка перевірки авторизації:", error);
            })
            .finally(() => setLoading(false)); // Припиняємо відображення завантаження
    }, [user]);

    // Якщо дані ще завантажуються, показуємо спінер
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation={"grow"} />
            </div>
        );
    }

    // Головний рендер додатку
    return (
        <BrowserRouter>
            <NavBar /> {/* Відображення навігаційної панелі */}
            <AppRouter /> {/* Основний роутинг додатку */}
        </BrowserRouter>
    );
});

export default App;
