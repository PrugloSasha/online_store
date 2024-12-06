import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { fetchBasketDevices, removeDeviceFromBasket } from "../http/basketAPI";
import { Context } from "../index";

const Basket = () => {
    const [basketDevices, setBasketDevices] = useState([]);
    const { user } = useContext(Context);
    const [totalPrice, setTotalPrice] = useState(0); // Додано стан для загальної суми

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const devices = await fetchBasketDevices(user.user.id);
                setBasketDevices(devices);

                // Обчислюємо загальну суму
                const total = devices.reduce((sum, device) => sum + device.price, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("Помилка отримання кошика:", error);
            }
        };

        fetchDevices();
    }, [user.user.id]);

    const handleRemoveDevice = async (basketDeviceId) => {
        try {
            await removeDeviceFromBasket(basketDeviceId);
            setBasketDevices((prev) =>
                prev.filter((device) => device.basketDeviceId !== basketDeviceId)
            );

            // Оновлюємо загальну суму після видалення
            const updatedTotal = basketDevices
                .filter((device) => device.basketDeviceId !== basketDeviceId)
                .reduce((sum, device) => sum + device.price, 0);
            setTotalPrice(updatedTotal);
        } catch (error) {
            console.error("Помилка видалення пристрою з кошика:", error);
            alert("Не вдалося видалити пристрій.");
        }
    };

    return (
        <Container className="mt-3">
            <h2>Кошик</h2>
            {basketDevices.length === 0 ? (
                <h4>Кошик порожній</h4>
            ) : (
                <>
                    <Row>
                        {basketDevices.map((device) => (
                            <Col key={device.basketDeviceId} md={4} className="mb-3">
                                <div className="d-flex flex-column align-items-center">
                                    <Image
                                        src={process.env.REACT_APP_API_URL + device.img}
                                        alt={device.name}
                                        width={150}
                                        height={150}
                                    />
                                    <h5>{device.name}</h5>
                                    <p>{device.price} грн</p>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveDevice(device.basketDeviceId)}
                                    >
                                        Видалити
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {/* Відображення загальної суми */}
                    <Row className="mt-3">
                        <Col className="text-right">
                            <h4>Загальна сума: {totalPrice} грн</h4>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Basket;
