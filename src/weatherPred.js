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
    return (elem.value !== '' &&   (!((/00-24/.test(elem.periodo)) ||  (/00-12/.test(elem.periodo) || /12-24/.test(elem.periodo)))))
  }
  return (numDia > 3) ||
     (/00-12/.test(elem.periodo) || /12-24/.test(elem.periodo))
}


const TableHeader = ({isLoading, dias}) => {
  
  let header = dates();

  let col = [dias[0].estadoCielo.filter( (elem) => isValidPeriod(elem,0)).length, "4","2","2","1","1","1"];

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



const EstadoCielo = ({estadoCielo, numDia}) => {
  return (
    estadoCielo.filter( (element) => isValidPeriod(element,numDia)).
      map( (element, index) => { 
      return (<td className='td_icon borde_dcha' key={`${numDia}${index}`} align='center'>
        <div>{(element.periodo) ? element.periodo : '\u00A0' }</div>
        <div><img src={`assets/images/${element.value}.png`} title={element.descripcion} ></img></div>
        </td>)}
    )
  )
}


const Row1 = ({dias}) => {
  return (
    <tr>{
      dias.map( (element, index) => {
        return <EstadoCielo key={index} numDia={index} estadoCielo={element.estadoCielo}></EstadoCielo>})}
    </tr>  
  )
}

const FilaPar = ({dias, texto}) => {
  let col = [dias[0].estadoCielo.filter( (elem) => isValidPeriod(elem,0)).length, "4","2","2","1","1","1"];
  let numCols = col.reduce( (accValue, current) => accValue + Number(current));

  return (<tr className='fila_par'>
    <th colSpan={numCols}>{texto}</th>
  </tr>)  
}

const Row3 = ({dias}) => {
  let col = [dias[0].estadoCielo.filter( (elem) => isValidPeriod(elem,0)).length, "4","2","2","1","1","1"];
  return (<tr style={{textAlign:'center'}}>
  {dias.map((elem, index) => {
    let datos = elem.probPrecipitacion.filter((value) => { return /00-24/.test(value.periodo) || (value.periodo===undefined) });
    return <ProbPrecipitacion key={index} probPrecipitacion={datos[0].value} colSpan={col[index]} ></ProbPrecipitacion>
  })}
  </tr>
)}


const ProbPrecipitacion = ({probPrecipitacion, colSpan}) => {
    return (
      <td className='borde_dcha_nocomunes' colSpan={colSpan}>{probPrecipitacion}%</td>
    )
}


const Row4 = ({dias}) => {
  let col = [dias[0].estadoCielo.filter( (elem) => isValidPeriod(elem,0)).length, "4","2","2","1","1","1"];
  return (<tr style={{textAlign:'center'}}>
  {dias.map((elem, index) => {
    return <Temperatura key={index} maxima={elem.temperatura.maxima} minima={elem.temperatura.minima} colSpan={col[index]} ></Temperatura>
  })}
  </tr>
  )
}


const Temperatura = ({maxima, minima, colSpan}) => {
  return (
    <td className='borde_dcha_nocomunes' colSpan={colSpan}>{minima}/{maxima}</td>
  )
}


const WeatherPred = ({ cityCode, cityName}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getPred(cityCode).then((res) => {
        setData(res.data[0])
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
            <FilaPar dias={data.prediccion.dia} texto={"Probabilidad de precipitacion"} ></FilaPar>
            <Row3 dias={data.prediccion.dia}></Row3>
            <FilaPar dias={data.prediccion.dia} texto={"Temperatura"}></FilaPar>
            <Row4 dias={data.prediccion.dia}></Row4>
          </tbody>
        </table>) }
      </div>
    );
  };

  export {WeatherPred};