const Router = require('express'); // Імпортуємо Express
const router = new Router(); // Створюємо екземпляр маршрутизатора
const deviceController = require('../controllers/deviceController'); // Імпортуємо контролер для пристроїв
const checkRole = require('../middleware/checkRoleMiddleware'); // Middleware для перевірки ролі адміністратора

// Маршрут для створення пристрою (доступно тільки адміністратору)
router.post('/', checkRole('ADMIN'), deviceController.create);

// Маршрут для отримання всіх пристроїв
router.get('/', deviceController.getAll);

// Маршрут для отримання конкретного пристрою за ID
router.get('/:id', deviceController.getOne);

// Новий маршрут для оновлення пристрою (доступно тільки адміністратору)
router.put('/:id', checkRole('ADMIN'), deviceController.updateDevice);
// Новий маршрут для видалення пристрою (доступно тільки адміністратору)
router.delete('/:id', checkRole("ADMIN"), deviceController.deleteDevice);

module.exports = router; // Експортуємо маршрутизатор
