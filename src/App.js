import { SelectCity} from './selectCity';
import {WeatherPred} from './weatherPred';

import { useState } from 'react';
import {Container} from 'react-bootstrap';


const Aemet = () => {
  const [city, setCity] = useState("");

  const handleChange = ({ newCity}) => {
    setCity(newCity);
    console.log("Set city...");
  };
  console.log("Rendering app...");

  return (
    <Container>
      <SelectCity handleChange={handleChange}></SelectCity>
      {city !== "" && <WeatherPred cityCode={city}></WeatherPred>}
    </Container>
  );
};


export default Aemet;
