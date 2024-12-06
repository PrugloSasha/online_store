import { $authHost, $host } from "./index";

// Створення нового типу
export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

// Отримання всіх типів
export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

// Створення нового бренду
export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand);
    return data;
};

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete(`api/brand/${id}`);
    return data;
};

// Функція для видалення типу
export const deleteType = async (id) => {
    const { data } = await $authHost.delete(`api/type/${id}`);
    return data;
};

// Отримання всіх брендів
export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand');
    return data;
};

// Створення нового пристрою
export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device);
    return data;
};

// Отримання списку пристроїв
export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/device', { params: { typeId, brandId, page, limit } });
    return data;
};

// Отримання одного пристрою за ID
export const fetchOneDevice = async (id) => {
    const { data } = await $host.get(`api/device/${id}`);
    return data; // Повертаємо повну інформацію про пристрій
};


// Оновлення пристрою
export const updateDevice = async (id, updatedDeviceData) => {
    const { data } = await $authHost.put('api/device/' + id, updatedDeviceData);
    return data;
};

// Видалення пристрою
export const deleteDevice = async (id) => {
    const { data } = await $authHost.delete('api/device/' + id);
    return data;
};
