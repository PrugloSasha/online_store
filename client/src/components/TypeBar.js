import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Card } from "react-bootstrap";

const TypeBar = observer(() => {
    const { device } = useContext(Context); // Отримуємо контекст пристроїв

    return (
        <Row className="d-flex">
            {/* Відображення списку типів пристроїв */}
            {device.types.map(type => (
                <Card
                    key={type.id} // Унікальний ключ для кожного типу
                    className="p-3 m-2" // Відступи між картками
                    style={{ cursor: 'pointer', minWidth: '150px' }} // Вказівник миші та мінімальна ширина картки
                    onClick={() => device.setSelectedType(type)} // Вибір типу при кліку
                    border={type.id === device.selectedType.id ? 'primary' : 'light'} // Виділення вибраного типу
                >
                    {type.name} {/* Відображення назви типу */}
                </Card>
            ))}
        </Row>
    );
});

export default TypeBar;
