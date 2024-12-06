import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context); // Отримуємо дані про авторизацію з контексту

    return (
        <Switch>
            {/* Роутинг для авторизованих користувачів */}
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route 
                    key={path} 
                    path={path} 
                    component={Component} 
                    exact
                />
            ))}

            {/* Роутинг для всіх користувачів (публічні сторінки) */}
            {publicRoutes.map(({ path, Component }) => (
                <Route 
                    key={path} 
                    path={path} 
                    component={Component} 
                    exact
                />
            ))}

            {/* Редирект на головну сторінку (SHOP_ROUTE), якщо шлях не знайдено */}
            <Redirect to={SHOP_ROUTE} />
        </Switch>
    );
});

export default AppRouter;
