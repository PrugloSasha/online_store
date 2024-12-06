/**
 * Клас для створення та обробки кастомних помилок
 */
class ApiError extends Error {
    /**
     * Конструктор класу ApiError
     * @param {number} status - HTTP статус код помилки
     * @param {string} message - Повідомлення помилки
     */
    constructor(status, message) {
        super(); // Викликаємо базовий конструктор класу Error
        this.status = status; // Зберігаємо статус помилки
        this.message = message; // Зберігаємо повідомлення про помилку
    }

    /**
     * Метод для створення помилки 404 (Bad Request)
     * @param {string} message - Повідомлення про помилку
     * @returns {ApiError} - Новий об'єкт ApiError
     */
    static badRequest(message) {
        return new ApiError(404, message);
    }

    /**
     * Метод для створення помилки 500 (Internal Server Error)
     * @param {string} message - Повідомлення про помилку
     * @returns {ApiError} - Новий об'єкт ApiError
     */
    static internal(message) {
        return new ApiError(500, message);
    }

    /**
     * Метод для створення помилки 403 (Forbidden)
     * @param {string} message - Повідомлення про помилку
     * @returns {ApiError} - Новий об'єкт ApiError
     */
    static forbidden(message) {
        return new ApiError(403, message);
    }
}

module.exports = ApiError; // Експортуємо клас ApiError
