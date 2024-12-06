const Router = require('express'); // Імпорт Express для створення роутера
const router = new Router(); // Створення нового екземпляра роутера
const typeController = require('../controllers/typeController'); // Імпорт контролера типів
const checkRole = require('../middleware/checkRoleMiddleware'); // Імпорт middleware для перевірки ролі

/**
 * Роут для створення нового типу пристрою
 * @route POST /api/type
 * @access Private (доступ тільки для адміністратора)
 * @description Викликає метод `create` з typeController для створення нового типу
 * @middleware checkRole('ADMIN') - Перевіряє, чи є у користувача роль ADMIN
 */
router.post('/', checkRole('ADMIN'), typeController.create);

/**
 * Роут для отримання всіх типів пристроїв
 * @route GET /api/type
 * @access Public (доступний для всіх користувачів)
 * @description Викликає метод `getAll` з typeController для отримання списку всіх типів
 */
router.get('/', typeController.getAll);

router.delete('/:id', checkRole('ADMIN'), typeController.delete);


module.exports = router; // Експортуємо роутер для використання в додатку
