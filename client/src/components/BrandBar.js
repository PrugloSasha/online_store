import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context); // Отримуємо контекст для роботи з брендами

    return (
        <Row className="d-flex flex-wrap">
            {/* Перебираємо всі бренди зі списку */}
            {device.brands.map(brand => (
                <Card
                    style={{ cursor: 'pointer' }} // Вказівник миші змінюється на "руку" при наведенні
                    key={brand.id} // Унікальний ключ для кожного бренду
                    className="p-3 m-2" // Додаємо відступ між картками
                    onClick={() => device.setSelectedBrand(brand)} // Вибір бренду при кліку
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'} // Червона рамка для вибраного бренду
                >
                    {brand.name} {/* Назва бренду */}
                </Card>
            ))}
        </Row>
    );
});

export default BrandBar;
