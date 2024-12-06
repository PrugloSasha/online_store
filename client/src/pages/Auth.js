import React, { useContext, useState } from 'react';
import { Container, Form, Card, Button, Row } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Реальновремінне очищення полів від заборонених символів
    const handleEmailChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ''); // Дозволені символи, включаючи '@'
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Тільки букви та цифри
        setPassword(value);
    };

    // Валідація полів перед відправкою
    const validateInput = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            alert('Введіть коректну адресу електронної пошти');
            return false;
        }
        if (password.length < 6) {
            alert('Пароль повинен містити не менше 6 символів');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInput()) return;
        setLoading(true);
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        } catch (error) {
            alert(error.response?.data?.message || 'Сталася помилка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
                <Form className="d-flex flex-column">
                    {/* Поле для введення email */}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={handleEmailChange}
                        type="text" // Змінили на text, щоб дозволити контроль введення
                    />
                    {/* Поле для введення пароля */}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш пароль..."
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Немає акаунту?{' '}
                                <NavLink to={REGISTRATION_ROUTE}>Зареєструйтеся!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Є акаунт?{' '}
                                <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
                            </div>
                        )}
                        <Button
                            variant="outline-success"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Завантаження...' : isLogin ? 'Увійти' : 'Зареєструватися'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
