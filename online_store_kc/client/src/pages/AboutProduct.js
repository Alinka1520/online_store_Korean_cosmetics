import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../assets/star.png'
import {useParams} from "react-router-dom";
import {addProductToBasket, addRating, checkRating, fetchOneProduct} from "../http/aboutProductAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import RatingStars from "../components/RatingStars";

const AboutProduct = observer(() => {

    const {user, basket} = useContext(Context)
    const [about_product, setProduct] = useState({product_info: []})
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setSsAccessRating] = useState(false);
    const {id} = useParams()

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        if(user.isAuth) {
            checkRating({productId: id}).then(res => setSsAccessRating(res.allow));
        }
    }, [id, resRate]);

    const isProductInBasket = () => {
        const findProduct = basket.Basket.findIndex(item => Number(item.id) === Number(about_product.id));
        return findProduct < 0;
    }

    const addProductInBasket = (about_product) => {
        if(user.isAuth) {
            addProductToBasket(about_product).then(() => basket.setBasket(about_product, true))
        } else {
            basket.setBasket(about_product);
        }
    }

    const ratingChanged = (rate) => {
        addRating({
            rate,
            productId: id
        }).then(res => {
            setResRate(res);
        });
    };

    //убраны знаки вопроса у цены

    return (
        <Container className="mt-5">
            <Row>
                <Col md={5}>
                    <Image width={525} height={500} src={process.env.REACT_APP_API_URL + about_product.img}/>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around mt-4"
                        style={{width: 525, height: 50, fontSize: 32, border: 'none'}}
                    >
                        { isProductInBasket() ?
                            <Button style={{width:341, height:50}} variant="outline-dark" onClick={() => addProductInBasket(about_product)}>В корзину</Button>
                            :
                            <Button style={{width:341, height:50}} variant="outline-dark" disabled>Товар уже в корзине</Button>
                        }
                    </Card>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <div>
                            <h2>{about_product.name}</h2>
                        </div>
                        <div className="mt-3">
                            <h3>{about_product.price || 0} Р</h3>
                        </div>
                        <div className="d-flex align-items-center mt-3 ">
                            <h4>{about_product.rating || 0}</h4>
                            <Image width={30} height={30} src={star}/>
                        </div>
                        <RatingStars
                            ratingChanged={ratingChanged}
                            ratingVal={about_product.rating || 0}
                            isAuth={user.isAuth}
                            isAccessRating={isAccessRating}
                        />
                        {resRate}
                        <Row className="d-flex flex-column mt-5">
                        {about_product.product_info.map((product_info, index) =>
                            <Row key={product_info.id}>
                                {product_info.title}: {product_info.description}
                            </Row>
                        )}
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default AboutProduct;