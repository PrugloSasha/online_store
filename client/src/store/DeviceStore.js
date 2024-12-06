import { makeAutoObservable } from "mobx"; // Імпорт MobX для реактивності

// Клас стану для керування типами, брендами, пристроями та пагінацією
export default class DeviceStore {
    constructor() {
        // Початкові значення стану
        this._types = []; // Масив типів пристроїв
        this._brands = []; // Масив брендів
        this._devices = []; // Масив пристроїв
        this._selectedType = {}; // Вибраний тип
        this._selectedBrand = {}; // Вибраний бренд
        this._page = 1; // Поточна сторінка
        this._totalCount = 0; // Загальна кількість пристроїв
        this._limit = 3; // Кількість пристроїв на сторінку

        // Робимо стан реактивним за допомогою MobX
        makeAutoObservable(this);
    }

    // **Сеттери для оновлення стану**

    /**
     * Встановлює масив типів пристроїв
     * @param {Array} types - Масив типів
     */
    setTypes(types) {
        this._types = types;
    }

    /**
     * Встановлює масив брендів
     * @param {Array} brands - Масив брендів
     */
    setBrands(brands) {
        this._brands = brands;
    }

    /**
     * Встановлює масив пристроїв
     * @param {Array} devices - Масив пристроїв
     */
    setDevices(devices) {
        this._devices = devices;
    }

    /**
     * Встановлює вибраний тип пристроїв
     * @param {Object} type - Вибраний тип
     */
    setSelectedType(type) {
        this.setPage(1); // Скидаємо сторінку на 1 при зміні типу
        this._selectedType = type;
    }

    /**
     * Встановлює вибраний бренд
     * @param {Object} brand - Вибраний бренд
     */
    setSelectedBrand(brand) {
        this.setPage(1); // Скидаємо сторінку на 1 при зміні бренду
        this._selectedBrand = brand;
    }

    /**
     * Встановлює поточну сторінку
     * @param {number} page - Номер сторінки
     */
    setPage(page) {
        this._page = page;
    }

    /**
     * Встановлює загальну кількість пристроїв
     * @param {number} count - Загальна кількість пристроїв
     */
    setTotalCount(count) {
        this._totalCount = count;
    }

    // **Геттери для доступу до стану**

    /**
     * Отримує масив типів пристроїв
     * @returns {Array}
     */
    get types() {
        return this._types;
    }

    /**
     * Отримує масив брендів
     * @returns {Array}
     */
    get brands() {
        return this._brands;
    }

    /**
     * Отримує масив пристроїв
     * @returns {Array}
     */
    get devices() {
        return this._devices;
    }

    /**
     * Отримує вибраний тип пристроїв
     * @returns {Object}
     */
    get selectedType() {
        return this._selectedType;
    }

    /**
     * Отримує вибраний бренд
     * @returns {Object}
     */
    get selectedBrand() {
        return this._selectedBrand;
    }

    /**
     * Отримує загальну кількість пристроїв
     * @returns {number}
     */
    get totalCount() {
        return this._totalCount;
    }

    /**
     * Отримує поточну сторінку
     * @returns {number}
     */
    get page() {
        return this._page;
    }

    /**
     * Отримує кількість пристроїв на сторінку
     * @returns {number}
     */
    get limit() {
        return this._limit;
    }
}
