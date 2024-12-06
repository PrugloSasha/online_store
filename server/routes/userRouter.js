const Router = require('express'); // Імпорт Express для створення роутера
const router = new Router(); // Створення нового екземпляра роутера
const userController = require('../controllers/userController'); // Імпорт контролера користувачів
const authMiddleware = require('../middleware/authMiddleware'); // Імпорт middleware для перевірки авторизації

/**
 * Роут для реєстрації користувача
 * @route POST /api/user/registration
 * @access Public
 * @description Викликає метод `registration` з userController для реєстрації нового користувача
 */
router.post('/registration', userController.registration);

/**
 * Роут для авторизації користувача
 * @route POST /api/user/login
 * @access Public
 * @description Викликає метод `login` з userController для авторизації користувача
 */
router.post('/login', userController.login);

/**
 * Роут для перевірки токена користувача
 * @route GET /api/user/auth
 * @access Private (потрібен валідний токен)
 * @middleware authMiddleware - Перевіряє, чи є токен авторизації
 * @description Викликає метод `check` з userController для перевірки токена і отримання даних користувача
 */
router.get('/auth', authMiddleware, userController.check);

/**
 * Роут для створення адміністратора
 * @route POST /api/user/create-admin
 * @access Private (потрібен валідний токен)
 * @middleware authMiddleware - Перевіряє авторизацію користувача
 * @description Викликає метод `createAdmin` з userController для створення нового адміністратора
 */
router.post('/create-admin', authMiddleware, userController.createAdmin);

module.exports = router; // Експортуємо роутер для використання в додатку
