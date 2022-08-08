import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AboutProductItem from "./AboutProductItem";

const AboutProductList = observer(() => {
    const {about_product} = useContext(Context)
    return (
        <Row className="d-flex">
            {about_product.products.map(about_product =>
                <AboutProductItem key={about_product.id} about_product={about_product}/>
            )}
        </Row>
    );
});

export default AboutProductList;