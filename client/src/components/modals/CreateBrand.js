import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { createBrand, fetchBrands, deleteBrand } from "../../http/deviceAPI";

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrands().then(data => setBrands(data));
    }, []);

    const addBrand = () => {
        createBrand({ name: value }).then(() => {
            setValue('');
            fetchBrands().then(data => setBrands(data));
        });
    };

    const removeBrand = (id) => {
        deleteBrand(id).then(() => {
            fetchBrands().then(data => setBrands(data));
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати бренд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введіть назву бренду"
                    />
                </Form>
                <Row className="mt-3">
                    {brands.map(brand => (
                        <Col md={12} key={brand.id} className="d-flex justify-content-between align-items-center">
                            <span>{brand.name}</span>
                            <Button variant="outline-danger" onClick={() => removeBrand(brand.id)}>Видалити</Button>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addBrand}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
