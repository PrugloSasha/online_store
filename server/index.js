require('dotenv').config(); // Завантаження змінних середовища з файлу .env
const express = require('express');
const sequelize = require('./db'); // Імпорт бази даних
const models = require('./models/models'); // Імпорт моделей
const cors = require('cors'); // Для підтримки CORS
const fileUpload = require('express-fileupload'); // Завантаження файлів
const router = require('./routes/index'); // Основні маршрути
const errorHandler = require('./middleware/ErrorHandlingMiddleware'); // Middleware для обробки помилок
const path = require('path');
const bcrypt = require('bcrypt'); // Для хешування паролів
const { User } = require('./models/models'); // Імпорт моделі User

const PORT = process.env.PORT || 5000; // Порт сервера

const app = express();

app.use(cors()); // Дозволяємо запити з інших доменів
app.use(express.json()); // Парсер JSON для запитів
app.use(express.static(path.resolve(__dirname, 'static'))); // Віддача статичних файлів
app.use(fileUpload({})); // Підтримка завантаження файлів
app.use('/api', router); // Основні маршрути для API

// Обробка помилок (повинна бути останнім middleware)
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Перевірка підключення до бази даних
        await sequelize.sync(); // Синхронізація моделей з базою даних

        // Створення адміністратора, якщо база даних порожня
        const adminExists = await User.findOne({ where: { role: 'ADMIN' } }); // Перевіряємо, чи існує адміністратор
        if (!adminExists) {
            const hashPassword = await bcrypt.hash('admin123', 5); // Хешуємо пароль адміністратора
            await User.create({
                email: 'admin@example.com', // Email адміністратора
                password: hashPassword, // Хешований пароль
                role: 'ADMIN', // Роль адміністратора
            });
            console.log('Адміністратор створений: admin@example.com / admin123'); // Виводимо повідомлення в консоль
        }

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Запускаємо сервер
    } catch (e) {
        console.log(e); // Лог помилки, якщо щось пішло не так
    }
};

start(); // Викликаємо функцію старту сервера
