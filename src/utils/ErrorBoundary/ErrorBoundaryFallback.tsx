import {
    Container,
    Button
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";




const ErrorBoundaryFallback = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return(
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <p className="text-danger fs-5">Something went wrong, application could not render!</p>
            <Button className="variant-primary btn-md" onClick={handleGoBack}>Go Back</Button>
        </Container>
    )
}

export default ErrorBoundaryFallback;