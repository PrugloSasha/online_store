const ApiError = require('../error/ApiError'); // Імпорт класу ApiError для роботи з кастомними помилками

/**
 * Middleware для обробки помилок
 * @param {Object} err - Об'єкт помилки
 * @param {Object} req - Запит від клієнта
 * @param {Object} res - Відповідь сервера
 * @param {Function} next - Наступний middleware
 */
module.exports = function (err, req, res, next) {
    // Перевіряємо, чи помилка є екземпляром ApiError
    if (err instanceof ApiError) {
        // Якщо це кастомна помилка, повертаємо її статус і повідомлення
        return res.status(err.status).json({ message: err.message });
    }

    // Якщо це інша (некерована) помилка, повертаємо статус 500 і стандартне повідомлення
    return res.status(500).json({ message: "Непередбачена помилка!" });
};
