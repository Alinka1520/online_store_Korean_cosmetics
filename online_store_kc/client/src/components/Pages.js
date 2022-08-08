import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";


const Pages = observer(() => {
    const {about_product} = useContext(Context)
    const pageCount = Math.ceil(about_product.totalCount / about_product.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-5" >
            {pages.map(page =>
                <Pagination.Item
                    key = {page}
                    action variant= "outline-dark"
                    active = {about_product.page === page}
                    onClick = {() => about_product.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;