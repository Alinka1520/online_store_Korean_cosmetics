import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {about_product} = useContext(Context)

    return (
        <Row className="d-flex flex-nowrap" >
            {about_product.brands.map(brand =>
                <Card
                    style={{cursor:'pointer', width:"auto"}}
                    key={brand.id}
                    className="p-2"
                    onClick={() => about_product.setSelectedBrands(brand)}
                    border={brand.id === about_product.selectedBrands.id ? 'dark' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;