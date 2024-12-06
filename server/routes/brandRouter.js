const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware'); // Додали імпорт checkRole

router.post('/', checkRole('ADMIN'), brandController.create); // Додаємо middleware для перевірки ролі
router.get('/', brandController.getAll);
router.delete('/:id', checkRole('ADMIN'), brandController.delete); // Додали маршрут для видалення бренду

module.exports = router;
