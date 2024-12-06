const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo, Brand } = require('../models/models'); // Додано Brand
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices;
    
        // Додаємо include для отримання інформації про бренд
        const include = [
            { model: Brand, attributes: ['id', 'name'] } // Отримуємо лише id та name бренду
        ];
    
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset, include });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset, include });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset, include });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset, include });
        }
        return res.json(devices);
    }
    

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [
                { model: DeviceInfo, as: 'info' },
                { model: Brand } // Додано для отримання інформації про бренд
            ]
        });
        return res.json(device);
    }

    async updateDevice(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, info } = req.body;

            await Device.update(
                { name, price },
                { where: { id } }
            );

            await DeviceInfo.destroy({ where: { deviceId: id } });

            if (info) {
                const parsedInfo = JSON.parse(info);
                await Promise.all(
                    parsedInfo.map(async (item) => {
                        await DeviceInfo.create({
                            title: item.title,
                            description: item.description,
                            deviceId: id,
                        });
                    })
                );
            }

            const updatedDevice = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }, { model: Brand }],
            });

            return res.json(updatedDevice);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteDevice(req, res, next) {
        try {
            const { id } = req.params;
            await Device.destroy({ where: { id } });
            return res.json({ message: "Товар успішно видалено" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController();
