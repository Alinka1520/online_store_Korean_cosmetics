import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import AboutProductList from "../components/AboutProductList";
import Pages from "../components/Pages";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProductBrands, fetchProduct, fetchProductTypes} from "../http/aboutProductAPI";


const Products = observer(() => {
    const {about_product} = useContext(Context)
    const [searchProduct, setSearchProduct] = useState('')
    // const [currentPage, setCurrentPage] = useState(1)
    // const [filter, setFilter] = useState("All")

    // useEffect(() => {
    //     getAllProductsInUserPage(searchProduct, currentPage, filter).then(({count, rows}) => {
    //         setSearchedProduct(rows);
    //         setCount(count)
    //     })
    // }, [currentPage])
    //
    // useEffect(() => {
    //     getAllProductsInUserPage(searchProduct, 1, filter).then(({count, rows}) => {
    //         setSearchedProduct(rows);
    //         setCount(count);
    //         setCurrentPage(1);
    //     })
    // }, [filter, successMsg])


    useEffect(() => {
        fetchProductTypes().then(data => about_product.setTypes(data))
        fetchProductBrands().then(data => about_product.setBrands(data))
        fetchProduct(null, null, 1, 6).then(data => {
            about_product.setProducts(data.rows)
            about_product.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProduct(about_product.selectedTypes.id, about_product.selectedBrands.id, about_product.page, 6).then(data => {
            about_product.setProducts(data.rows)
            about_product.setTotalCount(data.count)
        })
    }, [about_product.page, about_product.selectedTypes, about_product.selectedBrands, ])

    // const fetchProduct = () => {
    //     getAllProductsInUserPage(searchProduct, currentPage, filter).then(({count, rows}) => {
    //         setSearchedProduct(rows);
    //         setCount(count)
    //     })
    // };

    return (
        <Container>
            <InputGroup className="mb-3 mt-2">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchProduct}
                    onChange={e => setSearchProduct(e.target.value)}
                    placeholder="Введите наименование товара..."
                />
                <Button
                    onClick={fetchProduct}
                    variant="outline-dark"
                    className="ml-2"
                >
                    Поиск
                </Button>
            </InputGroup>

            <Row className="mt-2">
                <Col style={{width:150}} md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <AboutProductList/>
                    <Pages/>
                </Col>

            </Row>
        </Container>
    );
});

export default Products;