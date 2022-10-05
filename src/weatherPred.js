import { useEffect, useState } from 'react';
import {getPred} from './services/getPred'


let dates = () => {
  let curDate = new Date();
  let res = [];
  const dayOfWeekName = d => `${d.toLocaleString('default', {weekday: 'short'})} ${d.getDate()}`;

  for (let i = 0; i <= 6; i++) {
    res.push( {i, date: dayOfWeekName(curDate)});
    curDate.setDate(curDate.getDate()+1);
  }

  return res;
}


const isValidPeriod = (elem, numDia)  => {
  if (numDia <= 1){
    return (elem.value != '' &&   (!((/00-24/.test(elem.periodo)) ||  (/00-12/.test(elem.periodo) || /12-24/.test(elem.periodo)))))
  }
  return (numDia > 3) ||
     (/00-12/.test(elem.periodo) || /12-24/.test(elem.periodo))
}


const TableHeader = ({isLoading, dias}) => {
  
  let header = dates();

  let col = [dias[0].estadoCielo.filter( (elem) => isValidPeriod(elem,0)).length, "4","2","2","1","1","1"];

  console.log('rendering header')

  return (
    <thead>
      <tr key='row0'>
      { !isLoading &&
        (header.map((element, index) =>{
        return <th key={`${element.i}`} className='th_header' colSpan={col[index]}>{element.date}</th>
        })) }
      </tr>
    </thead>
  )
}

const HeaderNiv2 = ({estadoCielo, numDia}) => {

  return (
    estadoCielo.filter( (element) => isValidPeriod(element,numDia)).
      map( (element, index) => { 
      return (<td key={`${numDia}${index}`} align='center'>
        <div>{(element.periodo) ? element.periodo : '\u00A0' }</div>
        <div><img src={`assets/images/${element.value}.png`} title={element.descripcion} ></img></div>
        <div>{`${numDia}${index}`}</div>
        </td>)}
    )
  )
}


const Row1 = ({dias}) => {
  return (
    <tr>{
      dias.map( (element, index) => {
        return <HeaderNiv2 key={index} numDia={index} estadoCielo={element.estadoCielo}></HeaderNiv2>})}
    </tr>  
  )
}

const Row2 = () => {
  return (<tr></tr>)  
}


const WeatherPred = ({ cityCode, cityName}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      getPred(cityCode).then((res) => {
        setData(res[0])
        setIsLoading(false)
      })
      .catch( (err) => console.log(err))
    }, [cityCode]);

    return (
      <div className="row">
        <h1>Weather pred in {cityCode} - {cityName}</h1>
        {isLoading ? (<div>Loading...</div>) : (
        <table id = "tabla_prediccion">
          <TableHeader dias={data.prediccion.dia} isLoading={isLoading}></TableHeader>
          <tbody>
            <Row1 dias={data.prediccion.dia}></Row1>
            <Row2 dias={data.prediccion.dia}></Row2>
          </tbody>
        </table>) }
      </div>
    );
  };

  export {WeatherPred};