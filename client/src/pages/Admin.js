import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap"; // Імпорт компонентів Bootstrap
import CreateBrand from "../components/modals/CreateBrand"; // Модальне вікно для додавання бренду
import CreateDevice from "../components/modals/CreateDevice"; // Модальне вікно для додавання пристрою
import CreateType from "../components/modals/CreateType"; // Модальне вікно для додавання типу

const Admin = () => {
    // Стан для відкриття/закриття модальних вікон
    const [brandVisible, setBrandVisible] = useState(false); // Видимість модального вікна для брендів
    const [typeVisible, setTypeVisible] = useState(false); // Видимість модального вікна для типів
    const [deviceVisible, setDeviceVisible] = useState(false); // Видимість модального вікна для пристроїв

    return (
        <Container className="d-flex flex-column"> {/* Контейнер із вертикальним розташуванням */}
            {/* Кнопка для відкриття модального вікна "Додати тип" */}
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)} // Встановлюємо стан видимості для модального вікна
            >
                Додати тип
            </Button>

            {/* Кнопка для відкриття модального вікна "Додати бренд" */}
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)} // Встановлюємо стан видимості для модального вікна
            >
                Додати бренд
            </Button>

            {/* Кнопка для відкриття модального вікна "Додати пристрій" */}
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)} // Встановлюємо стан видимості для модального вікна
            >
                Додати пристрій
            </Button>

            {/* Модальне вікно для додавання бренду */}
            <CreateBrand
                show={brandVisible} // Видимість вікна
                onHide={() => setBrandVisible(false)} // Закриття вікна
            />

            {/* Модальне вікно для додавання пристрою */}
            <CreateDevice
                show={deviceVisible} // Видимість вікна
                onHide={() => setDeviceVisible(false)} // Закриття вікна
            />

            {/* Модальне вікно для додавання типу */}
            <CreateType
                show={typeVisible} // Видимість вікна
                onHide={() => setTypeVisible(false)} // Закриття вікна
            />
        </Container>
    );
};

export default Admin;
