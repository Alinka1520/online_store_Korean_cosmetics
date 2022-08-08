import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Image, InputGroup, ListGroup, Pagination, Form, Row} from "react-bootstrap";
import CreateProductBrandModal from "../components/modals/CreateProductBrandModal";
import CreateProductTypeModal from "../components/modals/CreateProductTypeModal";
import CreateProductModal from "../components/modals/CreateProductModal";
import DeleteProductBrandOrType from "../components/modals/DeleteProductBrandOrType";
import {getAllProductsInAdminPage} from "../http/aboutProductAPI";
import {NavLink} from "react-router-dom";
import {PRODUCT_EDIT_ROUTE} from "../utils/consts";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [deleteProductBrandOrType, setDeleteProductBrandOrType] = useState(false)
    const [searchProduct, setSearchProduct] = useState('')
    const [searchedProduct, setSearchedProduct] = useState([])
    const [filter, setFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(1)
    const [successMsg, setSuccessMsg] = useState('')
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)

    //pagination
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllProductsInAdminPage(searchProduct, currentPage, filter).then(({count, rows}) => {
            setSearchedProduct(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllProductsInAdminPage(searchProduct, 1, filter).then(({count, rows}) => {
            setSearchedProduct(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchProduct = () => {
        getAllProductsInAdminPage(searchProduct, currentPage, filter).then(({count, rows}) => {
            setSearchedProduct(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }


    return (
        <Container className="d-flex flex-column">
            {showSuccessMsg && <p>{successMsg}</p>}
            <Button variant={"outline-dark"} className="mt-2 p-2" onClick={() => setTypeVisible(true)}>
                Добавить тип
            </Button>
            <Button variant={"outline-dark"} className="mt-2 p-2" onClick={() => setBrandVisible(true)}>
                Добавить брэнд
            </Button>
            <Button variant={"outline-dark"} className="mt-2 p-2" onClick={() => setProductVisible(true)}>
                Добавить товар
            </Button>
            <Button variant={"outline-dark"} className="mt-2 p-2" onClick={() => setDeleteProductBrandOrType(true)}>
                Удалить тип брэнда
            </Button>
            <CreateProductTypeModal show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateProductBrandModal show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProductModal show={productVisible} onHide={() => setProductVisible(false)}/>
            <DeleteProductBrandOrType show={deleteProductBrandOrType} onHide={() => setDeleteProductBrandOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>

            <Dropdown className="mt-5 mb-3" style={{margin: "0 auto"}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {filter === "All" ? <Dropdown.Item disabled>Все</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("All")}>Все</Dropdown.Item>}
                    {filter === "Without Brand or Type" ? <Dropdown.Item disabled>Без типа или брэнда</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Without Brand or Type")}>Без типа или брэнда</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>

            <InputGroup className="mb-3">
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

            <ListGroup>
                {searchedProduct && searchedProduct.map( ({id, img, product_brands, product_types, price, name}) => {
                    return (
                        <ListGroup.Item className="mt-3" key={id}>
                            <Row>
                                <Col xs={2}>
                                    <Image width={150} src={process.env.REACT_APP_API_URL + img}/>
                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={12}>
                                            <NavLink to={PRODUCT_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Наименование: {name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Цена: {price}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Название брэнда: {product_brands}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Название типа: {product_types}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <NavLink to={PRODUCT_EDIT_ROUTE + `/${id}`}>Изменить</NavLink>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {searchedProduct && searchedProduct.length > 0 ? pages : false}
            </Pagination>
        </Container>
    );
};

export default Admin;