const { Brand } = require('../models/models'); // Імпорт моделі Brand з models
const ApiError = require('../error/ApiError'); // Імпорт кастомної помилки ApiError для обробки помилок

class BrandController {
    /**
     * Метод для створення нового бренду
     * @param {Object} req - Запит (Request) від клієнта
     * @param {Object} res - Відповідь (Response) до клієнта
     * @returns {Object} JSON з інформацією про створений бренд
     */
    async create(req, res) {
        try {
            const { name } = req.body; // Отримуємо назву бренду з тіла запиту
            if (!name) {
                throw ApiError.badRequest('Назва бренду не може бути порожньою'); // Перевірка: якщо name порожній, повертаємо помилку
            }
            const brand = await Brand.create({ name }); // Створюємо новий запис у таблиці Brand
            return res.json(brand); // Відправляємо відповідь із даними створеного бренду
        } catch (error) {
            return res.status(400).json({ message: error.message || 'Сталася помилка при створенні бренду' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const brand = await Brand.destroy({ where: { id } });
        if (!brand) {
            return res.status(404).json({ message: 'Бренд не знайдено' });
        }
        return res.json({ message: 'Бренд успішно видалено' });
    }
    

    /**
     * Метод для отримання списку всіх брендів
     * @param {Object} req - Запит (Request) від клієнта
     * @param {Object} res - Відповідь (Response) до клієнта
     * @returns {Array} JSON масив із усіма брендами
     */
    async getAll(req, res) {
        try {
            const brands = await Brand.findAll(); // Отримуємо всі записи з таблиці Brand
            return res.json(brands); // Відправляємо відповідь із масивом брендів
        } catch (error) {
            return res.status(500).json({ message: 'Сталася помилка при отриманні брендів' });
        }
    }
}

module.exports = new BrandController(); // Експортуємо екземпляр BrandController
