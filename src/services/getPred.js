const axios = require('axios').default;


async function getPred(cityCode) {
    const key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2FiYW5pbGxhc0BnbWFpbC5jb20iLCJqdGkiOiJiZTMxNmI3ZS0zODY5LTRmYjktOWYwYS1mMDEyYjU4NjNmZWIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY2NDc4MDg1MiwidXNlcklkIjoiYmUzMTZiN2UtMzg2OS00ZmI5LTlmMGEtZjAxMmI1ODYzZmViIiwicm9sZSI6IiJ9.22Ihq41WmXob1OtjDnuJ_2oJPwLyk5Po54qRSJwV8E0';
    let url = await getPredURL(cityCode);

    let config = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'api-key': key
        },
        withCredentials: true,
        credentials: 'same-origin',
    };

    let metadata = await axios.get(url.data.metadatos, config)
        .then( (res) => { 
            return res})
        .catch( (err) => {
            return err})

    const result = await axios.get(url.data.datos, config)
        .then( (res) => { 
            return res})
        .catch( (err) => {
            return err})
    return result;
};


const getPredURL = async (cityCode) => {
    const key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2FiYW5pbGxhc0BnbWFpbC5jb20iLCJqdGkiOiJiZTMxNmI3ZS0zODY5LTRmYjktOWYwYS1mMDEyYjU4NjNmZWIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY2NDc4MDg1MiwidXNlcklkIjoiYmUzMTZiN2UtMzg2OS00ZmI5LTlmMGEtZjAxMmI1ODYzZmViIiwicm9sZSI6IiJ9.22Ihq41WmXob1OtjDnuJ_2oJPwLyk5Po54qRSJwV8E0';

    let url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${cityCode}/?api_key=${key}`;

    let config = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'api-key': key
        },
        withCredentials: true,
        credentials: 'same-origin',
        url,
    };

    const result = await axios.get(url, config)
        .then( (res) => { 
            return res})
        .catch( (err) => {
            return err})
    return result;
}

export {getPred};