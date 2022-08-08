import React, {useState, useEffect} from "react";
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getOneOrderProducts} from "../http/ordersAPI";
import {observer} from "mobx-react-lite";

const OneOrder = observer(() => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderProducts(id).then(data => {
            setOrder(data);
            setLoading(false);
            console.log(order);
        })
    }, []);

    if(loading) {
        return <Spinner animation="grow"/>
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("en-US", options);
    }

    // убраны знаки вопроса
    return (
        <Container className="d-flex flex-column">
            id заказа: {id} <br />
            Формирование: {order.descr.complete ? "Сформирован" : "Не сформирован"} <br />
            Покупатель: {order.descr.userId ?  order.descr.userId : "Пользователь не зарегистрирован"} <br />
            Создан: {formatDate(order.descr.createdAt)} <br />
            {order.descr.complete ? formatDate(order.descr.complete.updatedAt) : false }
            <a href={`tel:${order.descr.mobile}`}>Телефон: {order.descr.mobile}</a>
            <br />

            {order.products.map( ({count,descr}, i) => {
                return (
                    <Row key={i} className="mb-5">
                        <Col xs={2}>
                            <Image width={150} src={process.env.REACT_APP_API_URL + descr.img}/>
                        </Col>
                        <Col xs={10}>
                            Брэнд: {descr.brands.name}<br />
                            Тип: {descr.type.name}<br />
                            Наименование: {descr.name}<br />
                            Цена: {descr.price} Р<br />
                            Количество: {count}<br />
                            Общая стоимость: {count * descr.price} Р
                        </Col>
                    </Row>
                )
            })}

        </Container>
    );
});

export default OneOrder;


