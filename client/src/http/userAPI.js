import { $authHost, $host } from "./index"; // Імпорт екземплярів axios для запитів
import jwt_decode from "jwt-decode"; // Бібліотека для декодування JWT токена

/**
 * Реєстрація нового користувача
 * @param {string} email - Електронна пошта користувача
 * @param {string} password - Пароль користувача
 * @returns {Object} - Декодований токен з інформацією про користувача
 */
export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password }); // Запит на створення нового користувача
    localStorage.setItem('token', data.token); // Зберігаємо отриманий токен у локальне сховище
    return jwt_decode(data.token); // Декодуємо і повертаємо інформацію з токена
};

/**
 * Авторизація користувача
 * @param {string} email - Електронна пошта користувача
 * @param {string} password - Пароль користувача
 * @returns {Object} - Декодований токен з інформацією про користувача
 */
export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password }); // Запит на авторизацію
    localStorage.setItem('token', data.token); // Зберігаємо отриманий токен у локальне сховище
    return jwt_decode(data.token); // Декодуємо і повертаємо інформацію з токена
};

/**
 * Перевірка авторизації користувача
 * @returns {Object} - Декодований токен з інформацією про користувача
 */
export const check = async () => {
    const { data } = await $authHost.get('api/user/auth'); // Запит для перевірки валідності токена
    localStorage.setItem('token', data.token); // Оновлюємо токен у локальному сховищі
    return jwt_decode(data.token); // Декодуємо і повертаємо інформацію з токена
};
