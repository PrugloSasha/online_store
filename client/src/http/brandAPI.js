import { $authHost } from "./index";

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete(`api/brand/${id}`);
    return data;
};
