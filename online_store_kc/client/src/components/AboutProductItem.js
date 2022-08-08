import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom";
import {ABOUT_PRODUCT_ROUTE} from "../utils/consts";

// убрано .name ошибка
const AboutProductItem = ({about_product}) => {
    const history = useHistory()
    return (
        <Col md={4} className={"mt-3"} onClick={() => history.push(ABOUT_PRODUCT_ROUTE + '/' + about_product.id)}>
            <Card style={{width:180, cursor: 'pointer', border: "none"}} border={"light"}>
                <Image className="rounded" width={230} height={209} src={process.env.REACT_APP_API_URL + about_product.img}/>
                <div className="text-black-50 mt-2 me-1 ms-lg-1 d-flex justify-content-between align-items-center">
                    <div>{about_product.price} Р</div>
                    <div className="d-flex align-items-center">
                        <div>{about_product.rating}</div>
                        <Image width={16} height={16} src={star}/>
                    </div>
                </div>
                <div className= "mb-3 ms-lg-1 d-flex justify-content-between align-items-center">{about_product.name}</div>
            </Card>
        </Col>
    );
};

export default AboutProductItem;