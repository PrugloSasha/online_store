const jwt = require('jsonwebtoken'); // Імпорт бібліотеки для роботи з JWT

/**
 * Middleware для перевірки ролі користувача
 * @param {string} role - Роль, яка потрібна для доступу
 * @returns {Function} Middleware функція
 */
module.exports = function (role) {
    return function (req, res, next) {
        // Пропускаємо запити з методом OPTIONS
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            // Отримуємо токен з заголовка авторизації
            const token = req.headers.authorization.split(' ')[1]; // Формат: Bearer <токен>
            if (!token) {
                // Якщо токена немає, повертаємо помилку 401
                return res.status(401).json({ message: "Не авторизований" });
            }

            // Розшифровуємо токен, використовуючи секретний ключ
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Перевіряємо, чи роль користувача відповідає вимогам
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Немає доступу" });
            }

            // Додаємо розшифровані дані користувача до об'єкта запиту
            req.user = decoded;

            // Передаємо управління наступному middleware
            next();
        } catch (e) {
            // У разі помилки повертаємо статус 401 (Не авторизований)
            return res.status(401).json({ message: "Не авторизований" });
        }
    };
};
