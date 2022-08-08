import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct, fetchProductBrands, fetchProductTypes} from "../../http/aboutProductAPI";
import {observer} from "mobx-react-lite";

const CreateProductModal = observer(({show, onHide}) => {
    const {about_product} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [product_info, setProductInfo] = useState([])

    useEffect(() => {
        fetchProductTypes().then(data => about_product.setTypes(data))
        fetchProductBrands().then(data => about_product.setBrands(data))
    }, [])

    const addProductInfo = () => {
        setProductInfo([...product_info, {title: '', description: '', number: Date.now()}])
    }
    const removeProductInfo = (number) => {
        setProductInfo(product_info.filter(i => i.number !== number))
    }
    const changeProductInfo = (key, value, number) => {
        setProductInfo(product_info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('productBrandId', about_product.selectedBrands.id)
        formData.append('productTypeId', about_product.selectedTypes.id)
        formData.append('product_info', JSON.stringify(product_info))
        createProduct(formData).then(() => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-3">
                        <Dropdown.Toggle>{about_product.selectedTypes.name || "Выберите тип товара"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {about_product.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => about_product.setSelectedTypes(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-3">
                        <Dropdown.Toggle>{about_product.selectedBrands.name || "Выберите брэнд товара"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {about_product.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => about_product.setSelectedBrands(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость товара"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addProductInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {product_info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeProductInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeProductInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeProductInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProductModal;