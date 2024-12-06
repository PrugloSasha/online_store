import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Col, Container, Image, Row, Form } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams, useHistory } from "react-router-dom";
import { fetchOneDevice, updateDevice, deleteDevice } from "../http/deviceAPI"; // Додали deleteDevice
import { addDeviceToBasket } from "../http/basketAPI";
import { Context } from "../index";
import { SHOP_ROUTE } from "../utils/consts"; // Для перенаправлення після видалення

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [], brand: null });
    const [isEditing, setIsEditing] = useState(false);
    const [editedDevice, setEditedDevice] = useState({ info: [] });
    const [newInfo, setNewInfo] = useState({ title: "", description: "" });
    const [newImage, setNewImage] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    const { user } = useContext(Context);

    useEffect(() => {
        fetchOneDevice(id).then((data) => {
            setDevice(data);
            setEditedDevice({ ...data, info: [...data.info] });
        });
    }, [id]);

    const handleFieldChange = (field, value) => {
        setEditedDevice((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const handleAddInfo = () => {
        if (!newInfo.title.trim() || !newInfo.description.trim()) {
            alert("Назва та опис не можуть бути порожніми.");
            return;
        }
        setEditedDevice((prevState) => ({
            ...prevState,
            info: [...prevState.info, { ...newInfo, id: Date.now() }],
        }));
        setNewInfo({ title: "", description: "" });
    };

    const handleRemoveInfo = (index) => {
        setEditedDevice((prevState) => ({
            ...prevState,
            info: prevState.info.filter((_, i) => i !== index),
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedDeviceData = new FormData();
            updatedDeviceData.append("name", editedDevice.name);
            updatedDeviceData.append("price", editedDevice.price);
            updatedDeviceData.append("info", JSON.stringify(editedDevice.info));
            if (newImage) {
                updatedDeviceData.append("img", newImage);
            }

            const updatedDevice = await updateDevice(id, updatedDeviceData);

            setDevice(updatedDevice);
            setEditedDevice(updatedDevice);
            setIsEditing(false);
            alert("Зміни успішно збережено!");
        } catch (error) {
            console.error("Помилка редагування пристрою:", error);
            alert("Не вдалося зберегти зміни.");
        }
    };

    const handleDeleteDevice = async () => {
        try {
            const confirmDelete = window.confirm("Ви впевнені, що хочете видалити цей товар?");
            if (!confirmDelete) return;

            await deleteDevice(id);
            alert("Товар успішно видалено!");
            history.push(SHOP_ROUTE);
        } catch (error) {
            console.error("Помилка видалення пристрою:", error);
            alert("Не вдалося видалити товар.");
        }
    };

    const handleAddToBasket = async () => {
        try {
            if (!user.isAuth) {
                alert("Авторизуйтесь, щоб додати товари до кошика");
                return;
            }
            await addDeviceToBasket(user.user.id, device.id);
            alert("Пристрій успішно додано до кошика!");
        } catch (error) {
            console.error("Помилка додавання до кошика:", error);
            alert("Не вдалося додати до кошика. Спробуйте пізніше.");
        }
    };
    

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    {isEditing ? (
                        <>
                            <label htmlFor="upload-image">
                                <Image
                                    width={300}
                                    height={300}
                                    src={
                                        newImage
                                            ? URL.createObjectURL(newImage)
                                            : process.env.REACT_APP_API_URL + device.img
                                    }
                                    alt={device.name}
                                    style={{ cursor: "pointer" }}
                                />
                            </label>
                            <Form.Control
                                id="upload-image"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                        </>
                    ) : (
                        <Image
                            width={300}
                            height={300}
                            src={process.env.REACT_APP_API_URL + device.img}
                            alt={device.name}
                        />
                    )}
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        {isEditing ? (
                            <Form.Control
                                value={editedDevice.name}
                                onChange={(e) => handleFieldChange("name", e.target.value)}
                                placeholder="Назва пристрою"
                            />
                        ) : (
                            <h2>{device.name}</h2>
                        )}
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: "cover",
                                fontSize: 64,
                            }}
                        >
                            {device.rating}
                        </div>
                        {!isEditing && (
                            <h4>Бренд: {device.brand ? device.brand.name : "Не відомий"}</h4>
                        )}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: "5px solid lightgray",
                        }}
                    >
                        {isEditing ? (
                            <Form.Control
                                value={editedDevice.price}
                                onChange={(e) => handleFieldChange("price", e.target.value)}
                                placeholder="Ціна пристрою"
                            />
                        ) : (
                            <h3>Ціна: {device.price} грн.</h3>
                        )}
                        {user.user.role === "ADMIN" && isEditing ? (
                            <Button variant="outline-success" onClick={handleSaveChanges}>
                                Зберегти зміни
                            </Button>
                        ) : (
                            <Button variant="outline-dark" onClick={handleAddToBasket}>
                                Додати в кошик
                            </Button>
                        )}
                        {user.user.role === "ADMIN" && !isEditing && (
                            <>
                                <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
                                    Редагувати
                                </Button>
                                <Button variant="outline-danger" onClick={handleDeleteDevice} className="mt-2">
                                    Видалити
                                </Button>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {isEditing ? (
                    <>
                        {editedDevice.info.map((info, index) => (
                            <Row key={info.id} className="mb-2">
                                <Col md={5}>
                                    <Form.Control
                                        value={info.title}
                                        onChange={(e) =>
                                            setEditedDevice((prevState) => {
                                                const updatedInfo = [...prevState.info];
                                                updatedInfo[index].title = e.target.value;
                                                return { ...prevState, info: updatedInfo };
                                            })
                                        }
                                        placeholder="Назва характеристики"
                                    />
                                </Col>
                                <Col md={5}>
                                    <Form.Control
                                        value={info.description}
                                        onChange={(e) =>
                                            setEditedDevice((prevState) => {
                                                const updatedInfo = [...prevState.info];
                                                updatedInfo[index].description = e.target.value;
                                                return { ...prevState, info: updatedInfo };
                                            })
                                        }
                                        placeholder="Опис характеристики"
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button variant="outline-danger" onClick={() => handleRemoveInfo(index)}>
                                        Видалити
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                        <Row>
                            <Col md={5}>
                                <Form.Control
                                    value={newInfo.title}
                                    onChange={(e) => setNewInfo({ ...newInfo, title: e.target.value })}
                                    placeholder="Назва нової характеристики"
                                />
                            </Col>
                            <Col md={5}>
                                <Form.Control
                                    value={newInfo.description}
                                    onChange={(e) => setNewInfo({ ...newInfo, description: e.target.value })}
                                    placeholder="Опис нової характеристики"
                                />
                            </Col>
                            <Col md={2}>
                                <Button variant="outline-success" onClick={handleAddInfo}>
                                    Додати
                                </Button>
                            </Col>
                        </Row>
                    </>
                ) : (
                    device.info.map((info, index) => (
                        <Row
                            key={info.id}
                            style={{
                                background: index % 2 === 0 ? "lightgray" : "transparent",
                                padding: 10,
                            }}
                        >
                            <strong>{info.title}:</strong> {info.description}
                        </Row>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
