import { $authHost } from "./index";

export const deleteType = async (id) => {
    const { data } = await $authHost.delete(`api/type/${id}`);
    return data;
};
