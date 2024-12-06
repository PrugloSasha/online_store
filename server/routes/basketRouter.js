const Router = require('express'); // Імпортуємо Express
const router = new Router(); // Створюємо новий роутер
const basketController = require('../controllers/basketController'); // Імпортуємо контролер для роботи з кошиком
const authMiddleware = require('../middleware/authMiddleware'); // Імпортуємо middleware для авторизації

// Додаємо пристрій до кошика
router.post('/add', authMiddleware, basketController.addDeviceToBasket);

// Отримуємо всі пристрої з кошика
router.get('/:userId', authMiddleware, basketController.getBasketDevices);

// Видаляємо пристрій із кошика
router.delete('/remove/:id', authMiddleware, basketController.removeDeviceFromBasket);


module.exports = router; // Експортуємо роутер
