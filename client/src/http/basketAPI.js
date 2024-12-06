import { $authHost } from "./index";

// Додавання пристрою до кошика
export const addDeviceToBasket = async (basketId, deviceId) => {
    const { data } = await $authHost.post('/api/basket/add', { basketId, deviceId });
    return data;
};

export const fetchBasketDevices = async (userId) => {
    const { data } = await $authHost.get(`api/basket/${userId}`);
    return data;
};

// Видалення пристрою з кошика
export const removeDeviceFromBasket = async (basketDeviceId) => {
    const { data } = await $authHost.delete(`/api/basket/remove/${basketDeviceId}`);
    return data;
};

