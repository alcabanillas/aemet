import { useState, useEffect } from "react";
import { getCities } from "./services/getCities";

import {Row, Form, Col, FormGroup} from 'react-bootstrap'

const SelectCity = ({ handleChange }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities().then((data) => {
      setCities(data);
    })
    .catch( (err) => console.log(err))
  }, []);

  const handleSubmit = (event) => {
    console.log('handleSubmit')
    event.preventDefault();

    const selected = event.target.city.selectedOptions[0];
    const { value, text } = selected;
    if (value === "") return;

    handleChange({ newCity: value, newCityName: text });
  };

  console.log("Rendering form...");

  return (
    <Row className="mb-3">
      <Form onSubmit={handleSubmit}>
        <Col>
          <FormGroup className="mb-3">
            <Form.Label htmlFor="city">Seleccione municipio:</Form.Label>
            <Form.Select name="city" defaultValue="">
              <option value="">...</option>
              {cities.map((item) => (
                <option
                  key={`${item.CPRO}${item.CMUN}`}
                  value={`${item.CPRO}${item.CMUN}`}
                >
                  {item.NOMBRE}
                </option>
              ))}
            </Form.Select>
          </FormGroup>
        </Col>
        <Col>
          <input type="Submit" className="btn btn-primary" />
        </Col>
      </Form>
    </Row>
  );
};


export {SelectCity};