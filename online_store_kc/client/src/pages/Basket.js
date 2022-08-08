import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Col, Image, Row} from "react-bootstrap";
import OneItemInBasket from "../components/OneItemInBasket";
import emptyBasket from "./../assets/emptyBasket.jpg";
import {ORDERING_ROUTE, PRODUCTS_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";

const Basket = observer(() => {
    const {basket} = useContext(Context);

    if (basket.Basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mb-5 mt-5">
                <div className="text-center" style={{fontSize: 28}}>
                    <b>Корзина</b>
                </div>
                <Row className="mt-5"></Row>
                <Image src={emptyBasket}/>
            </div>
        )
    }

    return (
        <>
            <br/>
            <div className="text-center mt-5 mb-5" style={{fontSize: 28}}>
                <b>Корзина</b>
            </div>

            <Row className="d-flex justify-content-center mt-3 m-4">
                <NavLink to={PRODUCTS_ROUTE}>
                    <Button variant={"outline-dark"}>Назад в каталог</Button>
                </NavLink>
            </Row>

            <Row className="mt-3 m-4">
                <Col xs={12}>
                    {basket.Basket.map(about_product => <OneItemInBasket key={about_product.id} about_product={about_product}/>)}
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3 m-4">
                <NavLink to={ORDERING_ROUTE}>
                    <Button variant={"outline-dark"}>Оформление</Button>
                </NavLink>
            </Row>
        </>
    );
});

export default Basket;