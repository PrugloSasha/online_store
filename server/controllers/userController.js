const ApiError = require('../error/ApiError'); // Імпорт класу для кастомних помилок
const bcrypt = require('bcrypt'); // Для хешування паролів
const jwt = require('jsonwebtoken'); // Для роботи з JWT токенами
const { User, Basket } = require('../models/models'); // Моделі User та Basket

// Генерація JWT токена
const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role }, // Дані для токена
        process.env.SECRET_KEY, // Секретний ключ для підпису
        { expiresIn: '24h' } // Час дії токена
    );
};

class UserController {
    /**
     * Реєстрація нового користувача
     * @param {Object} req - Запит від клієнта
     * @param {Object} res - Відповідь сервера
     * @param {Function} next - Функція для обробки помилок
     */
    async registration(req, res, next) {
        const { email, password } = req.body;
        const role = "USER"; // За замовчуванням новий користувач отримує роль "USER"

        // Валідація даних
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректний email або пароль'));
        }

        // Перевірка, чи користувач з таким email вже існує
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Користувач з таким email вже існує'));
        }

        const hashPassword = await bcrypt.hash(password, 5); // Хешування пароля
        const user = await User.create({ email, role, password: hashPassword }); // Створення нового користувача
        await Basket.create({ userId: user.id }); // Створення кошика для користувача
        const token = generateJwt(user.id, user.email, user.role); // Генерація токена

        return res.json({ token });
    }

    /**
     * Створення адміністратора
     * @param {Object} req - Запит від клієнта
     * @param {Object} res - Відповідь сервера
     * @param {Function} next - Функція для обробки помилок
     */
    async createAdmin(req, res, next) {
        const { email, password } = req.body;

        // Перевірка, чи користувач є адміністратором
        if (req.user.role !== 'ADMIN') {
            return next(ApiError.forbidden('Недостатньо прав для створення адміністратора'));
        }

        // Валідація даних
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректний email або пароль'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Користувач з таким email вже існує'));
        }

        const hashPassword = await bcrypt.hash(password, 5); // Хешування пароля
        await User.create({ email, password: hashPassword, role: 'ADMIN' }); // Створення адміністратора

        return res.json({ message: 'Адміністратор успішно створений' });
    }

    /**
     * Вхід користувача
     * @param {Object} req - Запит від клієнта
     * @param {Object} res - Відповідь сервера
     * @param {Function} next - Функція для обробки помилок
     */
    async login(req, res, next) {
        const { email, password } = req.body;

        // Перевірка, чи користувач існує
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Користувач не знайдений'));
        }

        // Перевірка пароля
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Невірний пароль'));
        }

        const token = generateJwt(user.id, user.email, user.role); // Генерація токена
        return res.json({ token });
    }

    /**
     * Перевірка автентифікації
     * @param {Object} req - Запит від клієнта
     * @param {Object} res - Відповідь сервера
     * @param {Function} next - Функція для обробки помилок
     */
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role); // Оновлення токена
        return res.json({ token });
    }
}

module.exports = new UserController(); // Експортуємо екземпляр UserController
