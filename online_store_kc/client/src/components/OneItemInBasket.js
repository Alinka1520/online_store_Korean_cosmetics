import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";

const OneItemInBasket = ({about_product}) => {
    const {basket, user} = useContext(Context);

    return (
        <Card key={about_product.id} style={{width: "100%"}} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <Image src={process.env.REACT_APP_API_URL + about_product.img} style={{width: "100%", maxWidth: 250}} />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12}>
                                <b>Название:</b> <NavLink to={`/about_product/${about_product.id}`}>{about_product.name}</NavLink>
                            </Col>
                        </Row>
                        <br/><br/>
                        <Row>
                            <Col xs={12}>
                                <b>Описание:</b><br/><br/>
                                {about_product.product_info && about_product.product_info.length !== 0? about_product.product_info.map((product_info, i) => {

                                    if(i % 2 === 0 ) {
                                        return (
                                            <Row key={product_info.id}>
                                                <Col xs={6}>
                                                    {product_info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {product_info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={product_info.id} style={{backgroundColor: "lightgray"}}>
                                                <Col xs={6}>
                                                    {product_info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {product_info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Описание отсутствует"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(about_product, true)}>Удалить из корзины</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(about_product)}>Удалить из корзины</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Количество:
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={() => basket.setCountProduct(about_product.id, "+")}>+</Button>
                                <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountProduct(Number(e.target.value))} value={about_product.count}/>
                                <Button variant="outline-dark" onClick={() => basket.setCountProduct(about_product.id, "-")}>-</Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Цена: {about_product.price * about_product.count} Р
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
};

export default OneItemInBasket;