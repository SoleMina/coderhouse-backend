const getInfo = () => {
    const data =  await axios.get("https://superheroapi.com/api/4764260866957513/")
    .then((res) => res.data)
    .catch((err) => console.log("Se produjo un error"));

}

//async await
const getData = () => {
    const response = await fetch("https://restcountries.eu/rest/2/all");
    const data = await response.json();
    return data;
}
getData().then(response => console.log(response))
.catch(err => console.log(err.message));

