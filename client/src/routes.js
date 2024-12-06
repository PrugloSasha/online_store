import Admin from "./pages/Admin"; // Сторінка адміністратора
import { 
    ADMIN_ROUTE, 
    BASKET_ROUTE, 
    DEVICE_ROUTE, 
    LOGIN_ROUTE, 
    REGISTRATION_ROUTE, 
    SHOP_ROUTE 
} from "./utils/consts"; // Константи маршрутів
import Basket from "./pages/Basket"; // Сторінка кошика
import Shop from "./pages/Shop"; // Головна сторінка магазину
import Auth from "./pages/Auth"; // Сторінка авторизації/реєстрації
import DevicePage from "./pages/DevicePage"; // Сторінка конкретного пристрою

// Маршрути, доступні тільки для авторизованих користувачів
export const authRoutes = [
    {
        path: ADMIN_ROUTE, // Шлях до сторінки адміністратора
        Component: Admin // Компонент сторінки адміністратора
    },
    {
        path: BASKET_ROUTE, // Шлях до сторінки кошика
        Component: Basket // Компонент сторінки кошика
    },
];

// Маршрути, доступні для всіх користувачів
export const publicRoutes = [
    {
        path: SHOP_ROUTE, // Головна сторінка магазину
        Component: Shop // Компонент головної сторінки
    },
    {
        path: LOGIN_ROUTE, // Сторінка входу
        Component: Auth // Компонент сторінки авторизації
    },
    {
        path: REGISTRATION_ROUTE, // Сторінка реєстрації
        Component: Auth // Той самий компонент використовується для реєстрації
    },
    {
        path: DEVICE_ROUTE + '/:id', // Сторінка для конкретного пристрою
        Component: DevicePage // Компонент сторінки пристрою
    },
];
