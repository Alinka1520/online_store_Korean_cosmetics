import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE, ORDERS_ROUTE, BASKET_ROUTE, MAIN_ROUTE, DELIVERY_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
//import {login} from "../http/userAPI";

const NavBar = observer(() => {
    const {user, basket} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        basket.resetBasket();
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
            <NavLink style={{color: 'black'}} to={PRODUCTS_ROUTE}>VTS</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'black'}}>
                        <Button variant={"outline-dark"} onClick={() => history.push(MAIN_ROUTE)} className="ms-2">На главную</Button>
                        <Button variant={"outline-dark"} onClick={() => history.push(DELIVERY_ROUTE)} className="ms-2">Доставка</Button>
                        <Button variant={"outline-dark"} onClick={() => history.push(BASKET_ROUTE)} className="ms-2">Корзина</Button>
                        <Button variant={"outline-dark"} onClick={() => history.push(ADMIN_ROUTE)} className="ms-2">Панель админа</Button>
                        <Button variant={"outline-dark"} onClick={() => history.push(ORDERS_ROUTE)} className="ms-2">Заказы</Button>
                        <Button variant={"outline-dark"} onClick={() =>logOut()} className="ms-2">Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'black'}}>
                        <Button variant={"outline-dark"} onClick={() => history.push(MAIN_ROUTE)} className="ms-2">На главную</Button>
                        <Button variant={"outline-dark"} onClick={() => history.push(BASKET_ROUTE)} className="ms-2">Доставка</Button>
                        <Button variant={"outline-dark"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;