import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { createType, fetchTypes, deleteType } from "../../http/deviceAPI";

const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
    }, []);

    const addType = () => {
        createType({ name: value }).then(() => {
            setValue('');
            fetchTypes().then(data => setTypes(data));
        });
    };

    const removeType = (id) => {
        deleteType(id).then(() => {
            fetchTypes().then(data => setTypes(data));
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введіть назву типу"
                    />
                </Form>
                <Row className="mt-3">
                    {types.map(type => (
                        <Col md={12} key={type.id} className="d-flex justify-content-between align-items-center">
                            <span>{type.name}</span>
                            <Button variant="outline-danger" onClick={() => removeType(type.id)}>Видалити</Button>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addType}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
