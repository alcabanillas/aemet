async function getCities() {
    let response = await fetch("./20codmun08.json");
    const data = await response.json();
    return data;
}

export {getCities};