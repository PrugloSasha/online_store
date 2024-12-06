const sequelize = require('../db'); // Імпорт конфігурації для підключення до бази даних
const { DataTypes } = require('sequelize'); // Імпорт DataTypes для опису типів даних

/**
 * Модель користувача
 */
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
    email: { type: DataTypes.STRING, unique: true, allowNull: false }, // Email користувача (унікальний)
    password: { type: DataTypes.STRING, allowNull: false }, // Пароль (хешований)
    role: { type: DataTypes.STRING, defaultValue: "USER" }, // Роль (за замовчуванням "USER")
});


/**
 * Модель кошика користувача
 */
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
});


/**
 * Модель зв'язку між кошиком і пристроєм
 */
const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    basketId: { type: DataTypes.INTEGER, allowNull: false },
    deviceId: { type: DataTypes.INTEGER, allowNull: false },
});

/**
 * Модель пристрою
 */
const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
    name: { type: DataTypes.STRING, unique: true, allowNull: false }, // Назва пристрою (унікальна)
    price: { type: DataTypes.INTEGER, allowNull: false }, // Ціна пристрою
    rating: { type: DataTypes.INTEGER, defaultValue: 0 }, // Рейтинг пристрою (за замовчуванням 0)
    img: { type: DataTypes.STRING, allowNull: false }, // URL зображення пристрою
});

/**
 * Модель типу пристрою
 */
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
    name: { type: DataTypes.STRING, unique: true, allowNull: false }, // Назва типу пристрою
});

/**
 * Модель бренду пристрою
 */
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
    name: { type: DataTypes.STRING, unique: true, allowNull: false }, // Назва бренду
});

/**
 * Модель рейтингу пристрою
 */
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
    rate: { type: DataTypes.INTEGER, allowNull: false }, // Оцінка (рейтинг)
});

/**
 * Модель інформації про пристрій
 */
const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
    title: { type: DataTypes.STRING, allowNull: false }, // Заголовок інформації
    description: { type: DataTypes.STRING, allowNull: false }, // Опис інформації
});

/**
 * Модель для зв'язку між типами та брендами
 */
const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Унікальний ідентифікатор
});

// Встановлення зв'язків між моделями

// Зв'язок між користувачем і кошиком
User.hasOne(Basket);
Basket.belongsTo(User);

// Зв'язок між користувачем і рейтингами
User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

BasketDevice.belongsTo(Device);
Device.hasMany(BasketDevice);

Basket.hasMany(BasketDevice, { as: 'devices' });
BasketDevice.belongsTo(Device);

Brand.hasMany(Device); // Один бренд може мати багато пристроїв
Device.belongsTo(Brand); // Пристрій належить до одного бренду

BasketDevice.belongsTo(Device);
Device.hasMany(BasketDevice);

// Зв'язок між кошиком і пристроями
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

// Зв'язок між типами і пристроями
Type.hasMany(Device);
Device.belongsTo(Type);

// Зв'язок між брендами і пристроями
Brand.hasMany(Device);
Device.belongsTo(Brand);

// Зв'язок між пристроями і рейтингами
Device.hasMany(Rating);
Rating.belongsTo(Device);

// Зв'язок між пристроями і кошиками
Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

// Зв'язок між пристроями і додатковою інформацією
Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

// Багато-до-багато між типами і брендами
Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo,
};
