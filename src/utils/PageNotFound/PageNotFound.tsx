import React from 'react';
import {
    Container,
    Row,
    Col,
    Button 
} from "react-bootstrap";

import { NavLink } from 'react-router-dom';



const PageNotFound = () => {


    return(
        <Container className="min-vh-100 d-flex align-items-center justify-content-center">
            <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                <h1 className="display-4 text-danger" >Error 404 !!!</h1>
                <p className="lead my-3">Oops! Page not found</p>
                <p className="text-muted">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <NavLink to="/" >
                    <Button variant="primary" className="mt-3">Go to Homepage</Button>
                </NavLink>
                </Col>
            </Row>
        </Container>
    )
}

export default PageNotFound;