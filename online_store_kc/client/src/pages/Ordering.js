import React, {useContext, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import {useHistory} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const Ordering = observer(() => {
    const {basket, user} = useContext(Context);
    const [phone, setPhone] = useState(null);
    const history = useHistory();

    const buy = () => {
        let order = {
            mobile: phone,
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.authorization = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            basket.setDeleteAllProductFromBasket();
            history.push(PRODUCTS_ROUTE);
        });
    }
    return (
        <>
            <Form className="mt-3 m-4">
                <Form.Control
                    placeholder="Введите ваш телефон..."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </Form>
            <Row className="mt-3 m-4">
                <Col xs={12}>
                    <Button variant="outline-dark" onClick={buy}>Купить</Button>
                </Col>
            </Row>
        </>
    );
});

export default Ordering;
