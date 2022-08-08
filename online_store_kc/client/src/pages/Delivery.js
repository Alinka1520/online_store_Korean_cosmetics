import React from 'react';
import {Container, Image, Row} from "react-bootstrap";
import registration_photo_gif from '../assets/registration_photo_gif.gif'

const Delivery = () => {
    return (
        <Container className="mt-5">
            <Row className="d-flex justify-content-center align-items-center text-center">
                <h1>Доставка</h1>
            </Row>
            <Row className="mt-3 d-flex justify-content-center align-items-center text-center">
                <h7>Стоимость доставки Почтой России в любой населённый пункт РФ от 350 рублей - срок доставки рассчитывается индивидуально в зависимости от города.</h7>
                Стоимость доставки курьером EMS Почты России- в Москву и Санкт-Петербург от 590 рублей.
                Стоимость доставки СДЭК рассчитывается индивидуально в зависимости от вашего города.
                <h5> ------------------------------</h5>

            </Row>
            <Row className="mt-3 d-flex justify-content-center align-items-center text-center">
                <h1>Оплата</h1>
                Оплата заказа осуществляется при получении заказа (картой и наличным расчетом), чек поступает на Ваш номер телефона.
                <h5> -----------------------------</h5>

            </Row>
            <Row className="mt-3 d-flex justify-content-center align-items-center text-center">
                <h1>Отправка</h1>
                В течение 14 рабочих дней с момента оформления заказа (срок доставки рассчитывается индивидуально в зависимости от вашего города и начинается с дня отправки)
            </Row>
            <div className="d-flex align-items-center mt-3 ">
                <Image className="rounded" width={window.innerWidth - 50} height={window.innerHeight - 50} src={registration_photo_gif}/>
            </div>
            <Row className="mt-5 mb-3 d-flex justify-content-center align-items-center text-center">
            <h3>WITH LOVE, YOUR VTS!</h3>
            </Row>
        </Container>
    );
};

export default Delivery;