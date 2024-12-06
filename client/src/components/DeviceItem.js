import React from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import star from '../assets/star.png'; // Іконка рейтингу

const DeviceItem = ({ device }) => {
    const history = useHistory(); // Хук для перенаправлення на сторінку пристрою

    return (
        <Col 
            md={3} // Розмір колонки для адаптивної сітки
            className={"mt-3"} // Відступ зверху
            onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)} // Перехід на сторінку пристрою
        >
            <Card 
                style={{ width: 150, cursor: 'pointer' }} // Стиль картки
                border={"light"} // Світлий бордер
            >
                {/* Зображення пристрою */}
                <Image 
                    width={150} 
                    height={150} 
                    src={process.env.REACT_APP_API_URL + device.img} // Динамічне посилання на зображення
                    alt={device.name} // Альтернативний текст для SEO
                />

                {/* Інформація про бренд і рейтинг */}
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.brand?.name || 'Бренд невідомий'}</div> {/* Назва бренду */}
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div> {/* Рейтинг */}
                        <Image 
                            width={18} 
                            height={18} 
                            src={star} 
                            alt="Рейтинг" // Альтернативний текст для рейтингу
                        />
                    </div>
                </div>

                {/* Назва пристрою */}
                <div>{device.name}</div>

                {/* Ціна пристрою */}
                <div className="text-black-50 mt-1">
                    <strong>Ціна:</strong> {device.price} грн {/* Відображення ціни в гривнях */}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
