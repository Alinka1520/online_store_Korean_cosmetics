import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {about_product} = useContext(Context)

    const getAllProducts = () => {
        about_product.setSelectedTypes("all");
        about_product.setSelectedBrands("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                action variant="dark"
                active={"all" === about_product.selectedTypes}
                onClick={getAllProducts}
            >
                Все товары
            </ListGroup.Item>
            {about_product.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    action variant="dark"
                    active={type.id === about_product.selectedTypes.id}
                    onClick={() => about_product.setSelectedTypes(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;