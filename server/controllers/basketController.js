const { Basket, BasketDevice, Device } = require('../models/models'); // Імпортуємо необхідні моделі
const ApiError = require('../error/ApiError'); // Для обробки помилок

class BasketController {
    async addDeviceToBasket(req, res) {
        const { basketId, deviceId } = req.body;
    
        try {
            const basketDevice = await BasketDevice.create({ basketId, deviceId });
            return res.json(basketDevice);
        } catch (error) {
            console.error('Помилка додавання до кошика:', error);
            return res.status(500).json({ message: 'Не вдалося додати до кошика.' });
        }
    }
    
    async getBasketDevices(req, res) {
        const { userId } = req.params;
    
        try {
            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return res.status(404).json({ message: "Кошик не знайдено." });
            }
    
            const basketDevices = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: [{ model: Device }], // Підключаємо модель Device
            });
    
            // Повертаємо масив з інформацією про пристрої та basketDeviceId
            const devices = basketDevices.map((item) => ({
                ...item.device.dataValues,
                basketDeviceId: item.id, // Додаємо basketDeviceId
            }));
    
            return res.json(devices);
        } catch (error) {
            console.error("Помилка отримання кошика:", error);
            return res.status(500).json({ message: "Внутрішня помилка сервера." });
        }
    }
    
    
    

    async removeDeviceFromBasket(req, res) {
        const { id } = req.params; // Отримуємо ID пристрою з параметрів запиту
        try {
            const deleted = await BasketDevice.destroy({ where: { id } }); // Видаляємо запис із таблиці
            if (!deleted) {
                return res.status(404).json({ message: 'Пристрій не знайдено у кошику' });
            }
            return res.json({ success: true, message: 'Пристрій видалено з кошика' });
        } catch (error) {
            console.error('Помилка видалення пристрою з кошика:', error);
            return res.status(500).json({ message: 'Помилка сервера' });
        }
    }
    
    
}

module.exports = new BasketController();
