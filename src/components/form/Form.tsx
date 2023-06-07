import provinces from "../../assets/data/vietnam-province-district.json";
import {
    Container,
    Row,
    Col,
    Form as BsForm,
    Button

} from "react-bootstrap";

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
import { useRef, useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
import {
  initialValues,
  gender, 
  object, 
  symptoms,
  country, 
  vaccines,
  validationSchema,
  FormatDate,
  TravelBlock


} from "../../utils/constants/form/FormConstants";
import { IProvince, IForm } from "../../utils/types/form/FormTypes";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
// import components
import { 
  CustomedTextInput, 
  CustomedDateSelect, 
  CustomedSelect,
  
} from "./CustomedForm/CustomedInputs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { renderData } from "../../store/reducers/loadDataSlice";
import { generateNewId } from "../../utils/constants/form/FormConstants";
import { editFormData } from "../../store/reducers/loadDataSlice";







const Form = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { rows } = useSelector((state: RootState) => state.loadData);
  const displayFieldsById = rows.find((val) => val.id === id);
  

  const initValues = displayFieldsById
        ? displayFieldsById : initialValues

  const renderProvinces = (provinces: IProvince) => {
    const province: string[] = [];
    for (const key in provinces) {
        province.push(provinces[key].name);
    }
    return province.map((provinceItem) => (
        <option value={provinceItem} key={provinceItem}>
            {provinceItem}
        </option>
    ));
  };


  const renderDistricts = (provinces: IProvince, keyOfProvinces: string) => {
    const key = Object.keys(provinces).find((key) => provinces[key].name === keyOfProvinces);
    let district: string[] = [];
    if (key) {
        district = Object.values(provinces[key].cities);
    } else {
        district = [];
    }

    return district.map((districtItem) => (
        <option value={districtItem} key={districtItem}>
            {districtItem}
        </option>
    ));
  };


  const FocusInvalidField = () => {
    const { submitCount, setTouched } = useFormikContext();
    const firstInvalidFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (submitCount > 0 && firstInvalidFieldRef.current) {
        firstInvalidFieldRef.current.focus();
        setTouched({});
      }
    }, [submitCount, setTouched]);

    return null;
  };



  const handleCancel = (dirty: boolean) => {
    if(dirty) {
      const confirmed: boolean = confirm("Do you want to cancel?");
      confirmed && navigate("/");
    } 
  };


  const handleReset = (props: any) => {
      if (props.dirty) {
        const confirmed: boolean = confirm("Do you want to reset?");
        confirmed && props.resetForm();
      } else navigate("/");
      
  };







    return (
      <Container>
        {/* header */}
        <header className="header">
          <Row>
            <Col>
              <h1 className="text-center mt-5 text-success">
                MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
              </h1>
            </Col>
          </Row>
        </header>
        {/* form */}
        <Row className="mt-5">
          <Col>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={
                (values, formikHelpers: FormikHelpers<typeof initValues>) => {
                  if(id) {
                    dispatch(editFormData(values));
                    navigate("/table");
                  } else if (values) {
                    // localStorage.setItem("form-data", JSON.stringify(values));
                    const valuesHaveId = { ...values, id: generateNewId()};
                    dispatch(renderData(valuesHaveId));
                    formikHelpers.setSubmitting(false);
                    formikHelpers.resetForm();
                    navigate("/");
                  } else {
                    throw new Error("There's something wrong with user's values");
                  }
                }
              }
            >
              {
                (props) => {
                  // console.log(props);

                  return (
                    <FormikForm>
                      {/* <FocusInvalidField /> */}

                      {/* Personal Information */}
                      <h5>Personal Information:</h5>
                      {/* Full name */}
                      <Row>
                        <Col>
                          <FastField
                            name="fullName"
                            as={CustomedTextInput}
                            label="Full name"
                            placeholder="Full name..."
                            type="text"
                            className="form-control"
                            danger={true}
                          />
                        </Col>
                      </Row>
                      {/* Object */}
                      <Row className="mt-4">
                        <Col className="col-12 col-md-6 col-lg-6">
                          <FastField
                            name="object"
                            as={CustomedSelect}
                            label="Object"
                            danger={true}
                            className="form-select"
                          >
                            <option value="">-----Choose</option>
                            {object.map((element, index) => (
                              <option key={index} value={element}>
                                {element}
                              </option>
                            ))}
                          </FastField>
                        </Col>
                        {/* Date of birth */}
                        <Col className="col-12 col-md-3 col-lg-3">
                          <FastField
                            name="dateOfBirth"
                            as={CustomedDateSelect}
                            type="date"
                            label="Date of birth"
                            className="form-control"
                            value={props.values?.dateOfBirth}
                          ></FastField>
                        </Col>
                        {/* Gender */}
                        <Col className="col-12 col-md-3 col-lg-3">
                          <FastField
                            name="gender"
                            as={CustomedSelect}
                            label="Gender"
                            danger={true}
                            className="form-select"
                            // type="select"
                          >
                            <option value="">-----Choose</option>
                            {gender.map((element, index) => (
                              <option key={index} value={element}>
                                {element}
                              </option>
                            ))}
                          </FastField>
                        </Col>
                      </Row>
                      {/* Nationality */}
                      <Row className="mt-4">
                        <Col className="col-12 col-md-6 col-lg-6">
                          <FastField
                            name="nationality"
                            as={CustomedSelect}
                            label="Nationality"
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
                        {/* NationID or Passport ID */}
                        <Col className="col-12 col-md-6 col-lg-6">
                          <FastField
                            name="nationId"
                            as={CustomedTextInput}
                            label="Nation ID or Passport ID"
                            placeholder="Nation ID or Passport ID..."
                            type="text"
                            className="form-control"
                            danger={true}
                          ></FastField>
                        </Col>
                      </Row>
                      {/* Travel */}
                      <TravelBlock
                        values={props.values.travels}
                        country={country}
                      />
                      {/* Contact */}
                      <h5 className="mt-3">Contact:</h5>
                      {/* Province */}
                      <Row>
                        <Col className="col-12 col-md-6 col-lg-6">
                          <Field
                            name="province"
                            as={CustomedSelect}
                            danger={true}
                            label="Province"
                            className="form-select"
                          >
                            <option value="">-----Choose</option>
                            {renderProvinces(provinces)}
                          </Field>
                        </Col>
                        {/* District */}
                        <Col className="col-12 col-md-6 col-lg-6">
                          <Field
                            name="district"
                            as={CustomedSelect}
                            danger={true}
                            label="District"
                            className="form-select"
                          >
                            <option value="">-----Choose</option>
                            {renderDistricts(provinces, props.values.province)}
                          </Field>
                        </Col>
                      </Row>
                      {/* Address */}
                      <Row className="mt-4">
                        <Col className="col-12 col-md-6 col-lg-6 col">
                          <FastField
                            name="address"
                            as={CustomedTextInput}
                            label="Address"
                            placeholder="Address..."
                            type="text"
                            className="form-control"
                            danger={true}
                          ></FastField>
                        </Col>
                        {/* Email */}
                        <Col className="col-12 col-md-3 col-lg-3">
                          <FastField
                            name="email"
                            as={CustomedTextInput}
                            label="Email"
                            placeholder="Email..."
                            type="text"
                            className="form-control"
                            danger={true}
                          ></FastField>
                        </Col>
                        {/* Mobile */}
                        <Col className="col-12 col-md-3 col-lg-3">
                          <FastField
                            name="mobile"
                            as={CustomedTextInput}
                            label="Mobile"
                            placeholder="Mobile..."
                            type="text"
                            className="form-control"
                            danger={true}
                          ></FastField>
                        </Col>
                      </Row>
                      {/* Symptoms */}
                      <h5 className="mt-4">Symptoms:</h5>
                      <Row>
                        <Col>
                          <BsForm.Group controlId="symptoms">
                            <Row className="d-flex">
                              <Col className="col-12 col-md-4 col-lg-4">
                                <BsForm.Label>
                                  Do you have any following symptoms?:
                                </BsForm.Label>
                              </Col>
                              <Col className="d-flex gap-3 col-12 col-md-8 col-lg-8">
                                {symptoms.map((element, index) => (
                                  <BsForm.Label
                                    key={element}
                                    className="d-flex gap-2"
                                    // htmlFor="symptoms"
                                  >
                                    <FastField
                                      type="checkbox"
                                      name="symptoms"
                                      value={element}
                                      // id="symptoms"
                                    />
                                      {element}
                                  </BsForm.Label>
                                ))}
                              </Col>
                            </Row>
                          </BsForm.Group>
                        </Col>
                      </Row>
                      {/* Vaccines */}
                      <h5 className="mt-4">Vaccines:</h5>
                      <Row>
                        <Col>
                          <BsForm.Group controlId="vaccines">
                            <Row className="d-flex">
                              <Col className="col-12 col-md-4 col-lg-4">
                                <BsForm.Label>
                                  Which one would you like to vaccinate?:
                                </BsForm.Label>
                              </Col>
                              <Col className="d-flex gap-3 col-12 col-md-8 col-lg-8">
                                {vaccines.map((element, index) => (
                                  <BsForm.Label
                                    key={index}
                                    className="d-flex gap-2"
                                  >
                                    {index === 0 ? (
                                      <FastField
                                        type="radio"
                                        name="vaccines"
                                        value=""
                                        checked={true}
                                      />
                                    ) : (
                                      <FastField
                                        type="radio"
                                        name="vaccines"
                                        value={element}
                                      />
                                    )}
                                      {element}
                                  </BsForm.Label>
                                ))}
                              </Col>
                            </Row>
                          </BsForm.Group>
                        </Col>
                      </Row>

                      <FocusInvalidField />
                      {/* Button groups */}
                      <Row className="mt-3 d-flex align-items-center justify-content-start mb-3">
                        <Col className="col-12 col-md-12 col-lg-1">
                          <Button
                            type="submit"
                            className="btn btn-success"
                            size="lg"
                          >
                            Submit
                          </Button>
                        </Col>
                        <Col className="col-12 col-md-12 col-lg-1">
                          <Button
                            className="btn btn-danger"
                            size="lg"
                            onClick={() => handleCancel(props.dirty)}
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col className="col-12 col-md-1 col-lg-1">
                          <Button
                            className="btn btn-secondary"
                            size="lg"
                            onClick={() => handleReset(props)}
                          >
                            Reset
                          </Button>
                        </Col>
                      </Row>
                    </FormikForm>
                  );
                }
              }
            </Formik>
          </Col>
        </Row>
      </Container>
    );
};

export default Form;