import { makeAutoObservable } from "mobx"; // Імпорт MobX для створення реактивного стану

// Клас стану для користувача
export default class UserStore {
    constructor() {
        this._isAuth = false; // Початкове значення - користувач не авторизований
        this._user = {}; // Початкове значення для даних користувача
        makeAutoObservable(this); // Робимо стан реактивним
    }

    // **Сеттери для оновлення стану**

    /**
     * Встановлює статус авторизації користувача
     * @param {boolean} bool - Статус авторизації (true або false)
     */
    setIsAuth(bool) {
        this._isAuth = bool;
    }

    /**
     * Встановлює дані користувача
     * @param {Object} user - Об'єкт з даними користувача
     */
    setUser(user) {
        this._user = user;
    }

    // **Геттери для доступу до стану**

    /**
     * Отримує статус авторизації користувача
     * @returns {boolean} - true, якщо користувач авторизований, false - якщо ні
     */
    get isAuth() {
        return this._isAuth;
    }

    /**
     * Отримує дані користувача
     * @returns {Object} - Об'єкт з даними користувача
     */
    get user() {
        return this._user;
    }
}
