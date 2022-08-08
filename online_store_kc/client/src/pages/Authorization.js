import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, PRODUCTS_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Authorization = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(PRODUCTS_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 50}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto mb-2">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex gx-0 justify-content-between mt-3 pl-3 pr-3" >
                        {isLogin ?
                            <div style={{width: 250}}>
                                Стань частью VTS! <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                            :
                            <div style={{width: 150}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                            </div>
                        }
                        <Button style={{width:150}} variant={"outline-dark ml-3"} onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Authorization;