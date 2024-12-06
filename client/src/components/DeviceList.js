import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context); // Отримуємо контекст пристроїв

    return (
        <Row className="d-flex">
            {/* Відображаємо список пристроїв */}
            {device.devices.map(deviceItem => (
                <Col 
                    key={deviceItem.id} // Унікальний ключ для кожного пристрою
                    md={3} // Адаптивна ширина колонки
                    className="mb-4" // Відступ знизу між картками
                >
                    <DeviceItem device={deviceItem} /> {/* Компонент пристрою */}
                </Col>
            ))}
        </Row>
    );
});

export default DeviceList;
