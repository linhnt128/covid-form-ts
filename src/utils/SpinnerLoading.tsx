import {
    Container,
    Spinner


} from "react-bootstrap";




const SpinnerLoading = () => {

    return(
        <Container
            className="d-flex justify-content-center align-items-center gap-2"
            style={{ minHeight: '100vh' }}
        >
            <Spinner as="span" animation="border" role="status" variant="primary">
                
            </Spinner>
      </Container>
    )
};

export default SpinnerLoading;


