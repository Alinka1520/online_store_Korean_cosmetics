import React from 'react';
import {Button, Container, Image, Row} from "react-bootstrap";
import main_photo2 from "../assets/main_photo2.jpg";
import social_media from "../assets/social_media.png";
import {NavLink} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../utils/consts";
import SimpleImageSlider from "react-simple-image-slider";

const images1 = [
    { url: "https://i.ebayimg.com/00/s/MTEwOFgxMTIy/z/XXgAAOSwGPNcNW7t/$_57.JPG?set_id=8800005007" },
    { url: "https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/pScAAOSwvv1b0e4n/$_57.JPG?set_id=8800005007" },
    { url: "https://i.ebayimg.com/00/s/MTE5N1gxMjAw/z/dkIAAOSwdUdgFrmN/$_57.JPG?set_id=8800005007" },
    { url: "https://i.ebayimg.com/00/s/OTAwWDkwMA==/z/hV8AAOSwDLNdBuzw/$_57.JPG?set_id=8800005007" },
    { url: "https://i.ebayimg.com/00/s/NTUwWDU1MA==/z/iXcAAOSwQfRcODkY/$_57.JPG?set_id=8800005007" },

];

const Main = () => {
    return (
        <Container className="mt-5">
            <Row className="d-flex justify-content-center align-items-center text-center">
                <h1>VTS</h1>
            </Row>

            <div className="d-flex align-items-center mt-3 ">
                <Image className="rounded" width={window.innerWidth} height={window.innerHeight - 200} src={main_photo2}/>
            </div>

            <Row className="mt-3 d-flex justify-content-center align-items-center text-center">
                <h5>Welcome to the world of VT x BTS and VT BT21 Cosmetics!</h5>
                <h5>Popular beauty bloggers, K-Pop fans, and beauty enthusiast alike can’t get enough of the fun, innovative packaging and professional, long-lasting makeup that has come from the k-pop/beauty collaboration. Previously unavailable in the RF, we’re so happy to bring these most-wanted K-Beauty collections to Russia!</h5>
            </Row>

            <div className="d-flex align-items-center justify-content-center mt-3 ">
                <Image className="rounded" width={90} height={90} src={social_media}/>
            </div>

            <div className="d-flex align-items-center justify-content-center mt-3 ">
                <SimpleImageSlider
                    width={600}
                    height={600}
                    images={images1}
                    showBullets={true}
                    showNavs={true}
                />
            </div>

            <Row className="d-flex justify-content-center text-center mt-4 m-4">
                <NavLink to={PRODUCTS_ROUTE}>
                    <Button variant={"outline-dark"}>GO SHOPPING</Button>
                </NavLink>
            </Row>
        </Container>

    );
};

export default Main;