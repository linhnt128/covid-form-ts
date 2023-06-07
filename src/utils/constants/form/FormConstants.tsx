import country from "../../../assets/data/countries.json";
import uuid from "react-uuid";
import * as Yup from 'yup';
import {
    Container,
    Row,
    Col,
    Form as BsForm,
    Button

} from "react-bootstrap";
import {
    CustomedDateSelect, 
    CustomedSelect,
    
} from "../../../components/form/CustomedForm/CustomedInputs";
import { 
    Formik, 
    Field, 
    FastField, 
    Form as FormikForm,
    FormikHelpers,
    useFormikContext,
    FormikProps,
    FieldArray
    
} from 'formik';
import { ITravelBlockProps } from "../../types/form/FormTypes"




const REGEX_EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGEX_MOBILE = /^[0-9]+$/;

const generateNewId = () => {
    const newId = uuid();
    return newId;
};

const initialValues = {
    id: "",
    fullName: "",
    object: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    nationId: "",
    travels: [],
    province: "",
    district: "",
    address: "",
    email: "",
    mobile: "",
    symptoms: [],
    vaccines: ""
};

const object = [
    "Expert",
    "Vietnamese",
    "International Student",
    "Other"
];

const gender = [
    "Male",
    "Female",
    "Other"
];

const symptoms = [
    "Fiber",
    "Fever",
    "Sore throat",
    "Difficulty of breathing"
];

const vaccines = [
    "None",
    "Astra Zenecca",
    "Pfizer",
    "Moderna",
    "Sinopharm"
];

const validationSchema = Yup.object().shape(
    {
        fullName: Yup.string().required("Name is required"),
        object: Yup.string().required("Object is required"),
        dateOfBirth: Yup.string().required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
        nationality: Yup.string().required("Nationality is required"),
        nationId: Yup.string().required("Nation ID is required"),
        travels: Yup.array().of(
            Yup.object().shape({
                departureDate: Yup.string().required('Departure date is required'),
                immigrationDate: Yup.string().required('Immigration date is required'),
                departure: Yup.string().required('Departure is required'),
                destination: Yup.string().required('Destination is required'),
            }),
        ),

        province: Yup.string().required("Contact province is required"),
        district: Yup.string().required("Contact district is required"),
        address: Yup.string().required("Contact address is required"),
        email: Yup.string()
        .required("Email is required")
        .matches(REGEX_EMAIL, "Invalid email format"),
        mobile: Yup.string().required("Mobile is required")
                            .matches(REGEX_MOBILE, "Mobile is invalid")

                
    }
);

const FormatDate = (value: string): string => {
    const [year, month, day] = value?.split('/');
    return `${day}/${month}/${year}`;
};

const TravelBlock = (props: ITravelBlockProps) => {

    const { values } = props;

    return (
      <>
        <h5 className="mt-3">Travel:</h5>
        <FieldArray name="travels">
          {({ remove, push }) => (
            <>
              {(values.length > 0 &&
                values.map((value, index) => (
                  <div key={index}>
                    <Row>
                      <h6 className="text-primary">Travel {index + 1}:</h6>
                      {/* Departure Date */}
                      <Col className="col-12 col-md-6 col-lg-6">
                        <FastField
                          name={`travels[${index}].departureDate`}
                          as={CustomedDateSelect}
                          type="date"
                          label="Departure Date"
                          className="form-control"
                        />
                      </Col>
                      {/* Immigration Date */}
                      <Col className="col-12 col-md-6 col-lg-6">
                        <FastField
                          name={`travels[${index}].immigrationDate`}
                          as={CustomedDateSelect}
                          type="date"
                          label="Immigration Date"
                          className="form-control"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      {/* Departure */}
                      <Col className="col-12 col-md-6 col-lg-6">
                        <FastField
                          name={`travels[${index}].departure`}
                          as={CustomedSelect}
                          label="Departure"
                          className="form-select"
                          danger={true}
                        >
                          <option value="">-----Choose</option>
                          {country.map((element, index) => (
                            <option key={element.code} value={element.name}>
                              {element.name}
                            </option>
                          ))}
                        </FastField>
                      </Col>
                      {/* Destination */}
                      <Col className="col-12 col-md-6 col-lg-6">
                        <FastField
                          name={`travels[${index}].destination`}
                          as={CustomedSelect}
                          label="Destination"
                          className="form-select"
                          danger={true}
                        >
                          <option value="">-----Choose</option>
                          {country.map((element, index) => (
                            <option key={element.code} value={element.name}>
                              {element.name}
                            </option>
                          ))}
                        </FastField>
                      </Col>
                    </Row>
                    {/* Button groups */}
                    <Row className="mt-3 d-flex align-items-center justify-content-start mb-3">
                      <Col className="col-12 col-md-12 col-lg-2" style={{width: "200px"}}>
                        <Button
                          className="btn btn-warning"
                          style={{width: "80%", height: "80%"}}
                          size="lg"
                          onClick={() =>
                            push({
                              departureDate: "",
                              immigrationDate: "",
                              departure: "",
                              destination: "",
                            })
                          }
                        >
                          Add more
                        </Button>
                      </Col>
                      <Col className="col-12 col-md-12 col-lg-2" style={{padding: "0"}}>
                        <Button 
                        className="btn btn-danger" 
                        size="lg"
                        onClick={() => {
                            if (
                                Object.values(values[index]).every((item) => item === "",)
                            ) {
                                remove(index);
                            } else {
                                const confirmDelete = confirm('Do you want to remove?');
                                confirmDelete && remove(index);
                            }
                        }}

                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))) || (
                <Row className="">
                  <Col className="col-12 col-md-6 col-lg-6 d-flex align-items-center gap-4">
                    <p className="">Do you travel in the last 14 days?</p>
                    <Button
                      className="btn btn-warning"
                      onClick={() =>
                        push({
                          departureDate: "",
                          immigrationDate: "",
                          departure: "",
                          destination: "",
                        })
                      }
                    >
                      Add more
                    </Button>
                  </Col>
                </Row>
              )}
            </>
          )}
        </FieldArray>
      </>
    );
};



export {
    generateNewId,
    initialValues,
    object,
    gender,
    symptoms,
    country,
    vaccines,
    validationSchema,
    TravelBlock,

    
    FormatDate
};