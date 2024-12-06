const { Type } = require('../models/models'); // Імпорт моделі Type з бази даних
const ApiError = require('../error/ApiError'); // Імпорт кастомного класу помилок для обробки помилок

class TypeController {
    /**
     * Створення нового типу
     * @param {Object} req - Запит клієнта
     * @param {Object} res - Відповідь сервера
     * @returns {Object} JSON з інформацією про створений тип
     */
    async create(req, res) {
        try {
            const { name } = req.body; // Отримуємо назву типу з тіла запиту
            if (!name) {
                throw ApiError.badRequest('Назва типу не може бути порожньою'); // Якщо назва порожня, викликаємо помилку
            }
            const existingType = await Type.findOne({ where: { name } }); // Перевіряємо, чи існує тип з такою назвою
            if (existingType) {
                throw ApiError.badRequest('Тип з такою назвою вже існує'); // Якщо тип вже існує, викликаємо помилку
            }
            const type = await Type.create({ name }); // Створюємо новий запис у таблиці Type
            return res.json(type); // Відправляємо відповідь із даними створеного типу
        } catch (error) {
            return res.status(400).json({ message: error.message || 'Сталася помилка при створенні типу' });
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Отримуємо ID типу з параметрів
            const deleted = await Type.destroy({ where: { id } }); // Видаляємо тип
            if (!deleted) {
                return res.status(404).json({ message: "Тип не знайдено" });
            }
            return res.json({ message: "Тип успішно видалено" });
        } catch (e) {
            next(ApiError.internal("Не вдалося видалити тип"));
        }
    }
    

    /**
     * Отримання всіх типів
     * @param {Object} req - Запит клієнта
     * @param {Object} res - Відповідь сервера
     * @returns {Array} JSON масив із усіма типами
     */
    async getAll(req, res) {
        try {
            const types = await Type.findAll(); // Отримуємо всі записи з таблиці Type
            return res.json(types); // Відправляємо відповідь із масивом типів
        } catch (error) {
            return res.status(500).json({ message: 'Сталася помилка при отриманні типів' });
        }
    }
}

module.exports = new TypeController(); // Експортуємо екземпляр TypeController
