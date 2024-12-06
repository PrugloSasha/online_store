const Router = require('express'); // Імпортуємо Express
const router = new Router();
const deviceRouter = require('./deviceRouter'); // Імпортуємо маршрути для пристроїв
const userRouter = require('./userRouter'); // Імпортуємо маршрути для користувачів
const brandRouter = require('./brandRouter'); // Імпортуємо маршрути для брендів
const typeRouter = require('./typeRouter'); // Імпортуємо маршрути для типів
const basketRouter = require('./basketRouter'); // Імпортуємо маршрути для кошика

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter); // Використовуємо маршрути для кошика

module.exports = router; // Експортуємо головний роутер
