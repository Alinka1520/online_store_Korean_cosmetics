import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteProductBrand, deleteProductType, fetchProductBrands, fetchProductTypes} from "../../http/aboutProductAPI";

const DeleteProductBrandOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [brandOrType, setBrandOrType] = useState("Brand");
    const [productBrands, setProductBrands] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [selectProductBrand, setSelectProductBrand] = useState({name: "A Brand not selected"});
    const [selectProductType, setSelectProductType] = useState({name: "A type not selected"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchProductTypes().then(data => setProductTypes(data));
        fetchProductBrands().then(data => setProductBrands(data));
    }, []);

    const Delete = async () => {
        if(brandOrType === "Brand") {
            if(selectProductBrand.name !== "A Brand not selected") {
                await deleteProductBrand(selectProductBrand.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectProductBrand({name: "A Brand not selected"});
                });
            } else {
                setMsgErr("Пожалуйста выберете брэнд");
                setShowMsgErr(true);
            }
        } else {
            if(selectProductType.name !== "A Type not selected") {
                await deleteProductType(selectProductType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectProductType({name: "A type not selected"});
                });
            } else {
                setMsgErr("Пожалуйста выберете тип");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectProductType, selectProductBrand, brandOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Удаление типа или брэнда
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Выберете категорию:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {brandOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brandOrType === "Brand" ? <Dropdown.Item disabled>Брэнд товара</Dropdown.Item> : <Dropdown.Item onClick={() => setBrandOrType("Brand")}>Брэнд товара</Dropdown.Item>}
                        {brandOrType === "Type" ? <Dropdown.Item disabled>Тип товара</Dropdown.Item> : <Dropdown.Item onClick={() => setBrandOrType("Type")}>Тип товара</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Выберете свойство {brandOrType === "Brand" ? "Brand" : "Type"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {brandOrType === "Brand" ? selectProductBrand.name : selectProductType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brandOrType === "Brand" ?
                            productBrands.map(({id, name}) =>
                                selectProductBrand.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectProductBrand({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            productTypes.map(({id, name}) =>
                                selectProductType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectProductType({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={Delete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProductBrandOrType;