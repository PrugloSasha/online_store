import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context); // Отримуємо контекст користувача (MobX store)
    const history = useHistory(); // Для перенаправлення між сторінками

    // Функція для виходу користувача з облікового запису
    const logOut = () => {
        user.setUser({}); // Очищаємо дані користувача в контексті
        user.setIsAuth(false); // Встановлюємо статус авторизації в false
        localStorage.removeItem('token'); // Видаляємо токен з localStorage
        history.push(SHOP_ROUTE); // Перенаправляємо користувача на головну сторінку
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {/* Лінк на головну сторінку */}
                <NavLink style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }} to={SHOP_ROUTE}>
                    КупиДевайс
                </NavLink>

                {/* Якщо користувач авторизований */}
                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {/* Відображення email звичайного користувача */}
                        {user.user.role !== 'ADMIN' && (
                            <span style={{ marginRight: '15px', fontSize: '16px' }}>
                                {user.user.email}
                            </span>
                        )}
                        {/* Кнопка "Кошик" */}
                        <Button
                            variant="outline-light"
                            onClick={() => history.push(BASKET_ROUTE)} // Перехід на сторінку кошика
                            className="ml-2"
                        >
                            Кошик
                        </Button>
                        {/* Кнопка "Адмін панель" для адміністратора */}
                        {user.user.role === 'ADMIN' && (
                            <Button
                                variant="outline-light"
                                onClick={() => history.push(ADMIN_ROUTE)} // Перехід на сторінку адміністратора
                                className="ml-2"
                            >
                                Адмін панель
                            </Button>
                        )}
                        {/* Кнопка для виходу */}
                        <Button
                            variant="outline-light"
                            onClick={logOut}
                            className="ml-2"
                        >
                            Вийти
                        </Button>
                    </Nav>
                ) : (
                    // Якщо користувач не авторизований
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant="outline-light" onClick={() => history.push(LOGIN_ROUTE)}>
                            Авторизація
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
