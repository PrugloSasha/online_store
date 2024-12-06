import axios from "axios";

// Створюємо екземпляр axios для запитів без авторизації
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL // URL сервера з змінної середовища
});

// Створюємо екземпляр axios для запитів з авторизацією
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL // URL сервера з змінної середовища
});

// Інтерцептор для додавання токена авторизації до заголовків
const authInterceptor = config => {
    const token = localStorage.getItem('token'); // Отримуємо токен із localStorage
    if (token) {
        config.headers.authorization = `Bearer ${token}`; // Додаємо токен у заголовки
    }
    return config;
};

// Додаємо інтерцептор до $authHost
$authHost.interceptors.request.use(authInterceptor);

// Експортуємо екземпляри для використання у запитах
export {
    $host, // Запити без авторизації
    $authHost // Запити з авторизацією
};
