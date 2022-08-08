import React, {useState, useContext, useEffect} from "react";
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useHistory} from "react-router-dom";
import {fetchDeleteProduct, fetchOneProduct, updateProducts} from "../http/aboutProductAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";

const AboutProductEdit = () => {
    const {about_product} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();
    const [productCurr, setProductCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectProductBrand, setSelectProductBrand] = useState({});
    const [selectProductType, setSelectProductType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [product_info, setProductInfo] = useState([]);
    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteProduct = () => {
        fetchDeleteProduct(id).then(() => {
            history.push(ADMIN_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //product_info
    const addInfo = () => {
        setProductInfo([...product_info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setProductInfo(product_info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setProductInfo(product_info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('productBrandId', selectProductBrand.id);
        formData.append('productTypeId', selectProductType.id);
        formData.append('product_info', JSON.stringify(product_info));
        updateProducts(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        product_info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if(productCurr.product_info && productCurr.product_info.length !== product_info.length) {
            checkInfoVal = checkInfo();
        }

        if(productCurr && productCurr.brands && productCurr.type) {
            if(productCurr.brands.name !== selectProductBrand.name ||
                productCurr.type.name !== selectProductType.name ||
                productCurr.name !== name ||
                productCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectProductBrand, selectProductType, price, img, product_info]);

    useEffect(() => {
        fetchOneProduct(id).then(data => {
            setProductCurr(data);
            setSelectProductBrand(data.brands);
            setSelectProductType(data.type);
            setName(data.name);
            setPrice(data.price);
            setProductInfo(data.product_info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            {showMsg && <Row>
                {msg}
            </Row>}

            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            id:
                        </Col>
                        <Col xs={11}>
                            {productCurr.id}
                        </Col>
                    </Row>
                    {/*Brand*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Брэнд:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectProductBrand.name || "Choose Brand"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {about_product.brands.map(brand => {
                                        return brand.name === selectProductBrand.name ?
                                            <Dropdown.Item
                                                key={brand.id}
                                                disabled
                                            >
                                                {brand.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={brand.id}
                                                onClick={() => setSelectProductBrand(brand)}
                                            >
                                                {brand.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Тип:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectProductType.name || "Выберете тип"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {about_product.types.map(type => {
                                        return type.name === selectProductType.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectProductType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Имя товара:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{color: "red"}}>Пожалуйста введите имя товара</b>}
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center">
                            Цена:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {price === 0 && <b style={{color: "red"}}>Пожалуйста введите цену товара</b>}
                        </Col>
                    </Row>

                    {/*Name*/}
                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center">
                            Текущее изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={process.env.REACT_APP_API_URL + productCurr.img}/>
                        </Col>
                        {img && <Col xs={6} className="d-flex flex-column justify-content-center text-center">
                            Новое изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={img}/>
                        </Col>}
                        <Col xs={3} className="d-flex align-items-center">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Upload file" onChange={imgHandler}/>
                                </Form.Group>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/*Characteristics*/}
                    <Row className="d-flex flex-column m-3">
                        <h4>Characteristics</h4>
                        <Button
                            variant="outline-dark"
                            onClick={() => addInfo()}
                        >
                            Добавить новую информацию
                        </Button>
                        {product_info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите название свойства товара..."
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!product_info[index].title &&  <b style={{color: "red"}}>Пожалуйста введите назание свойства</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание свойства..."
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!product_info[index].description &&  <b style={{color: "red"}}>Пожалуйста введите описание</b>}
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteInfo(item.number)}
                                    >
                                        Удалить новую информацию
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить товар</Button> : <Button onClick={putProduct}>Обновить товар</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить товар</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить этот товар {productCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteProduct}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AboutProductEdit;


