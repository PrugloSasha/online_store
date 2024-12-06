import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { fetchBrands, fetchTypes, createDevice } from "../../http/deviceAPI";

const CreateDevice = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState(null);
    const [type, setType] = useState(null);
    const [info, setInfo] = useState([]);

    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
        fetchBrands().then(data => setBrands(data));
    }, []);

    // Функція для обмеження введення спеціальних символів
    const sanitizeInput = (input) => {
        const regex = /^[a-zA-Z0-9А-Яа-яЁёЇїІіЄєҐґ\s]+$/;
        return regex.test(input) ? input : '';
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', id: Date.now() }]);
    };

    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id));
    };

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? { ...i, [key]: sanitizeInput(value) } : i)); // Обмеження вводу
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', sanitizeInput(name)); // Обмеження вводу
        formData.append('price', price);
        formData.append('img', file);
        formData.append('brandId', brand.id);
        formData.append('typeId', type.id);
        formData.append('info', JSON.stringify(info));

        createDevice(formData).then(data => {
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Додати пристрій</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{type?.name || "Оберіть тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <Dropdown.Item
                                    onClick={() => setType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{brand?.name || "Оберіть бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => setBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть назву пристрою"
                        value={name}
                        onChange={e => setName(sanitizeInput(e.target.value))} // Обмеження вводу
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть вартість пристрою"
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button variant="outline-dark" onClick={addInfo}>
                        Додати нову характеристику
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.id}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                                    placeholder="Назва характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                    placeholder="Опис характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.id)}
                                    variant="outline-danger"
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addDevice}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
