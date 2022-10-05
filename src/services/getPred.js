async function getPred({cityCode}) {
    let response = await fetch("./diaria.json");
    const data = await response.json();
    return data;
}

export {getPred};