let con = document.createElement("div");
con.setAttribute("class","container");

let heading = document.createElement("div");
let h1 = document.createElement("h1");
h1.innerText = "Weather Forecast";
h1.setAttribute("style", "text-align : center");
heading.appendChild(h1);
con.appendChild(heading);


let rows = document.createElement("div");
rows.setAttribute("class","row");

con.appendChild(rows);
document.body.appendChild(con);

fetch ("https://restcountries.com/v3.1/all",{
  method : 'GET'
})

.then((data) => {
    let res = data.json()
    return res;
})

.then((result) =>{
    console.log(result);
    result.forEach(element => {
        let cards = document.createElement("div");
        cards.setAttribute("class", "card; col-lg-4 ; d-flex; justify-content-around");
        cards.setAttribute("style","width : 350px ;height : 400px; margin : 2px ;background-color : #1b1a33");
        rows.appendChild(cards);

        let heads = document.createElement("div");
        heads.setAttribute("class","card-header");
        heads.setAttribute("style", "background-color :black ; color:white ; text-align : center");
        let name = element.name.common;
        heads.innerText = name;
        cards.appendChild(heads);

        let bodys = document.createElement("div");
        bodys.setAttribute("class","card-body");
        bodys.setAttribute("style" , "background-image: linear-gradient(to right, #f0e9e9 , #998988)")
        let flag = document.createElement("img");
        flag.src = element.flags.png;
        flag.setAttribute("style","width:250px; height:200px; position: relative; top: 40%; left: 12%;");
        bodys.appendChild(flag);
        let cap = document.createElement("p");
        let capital = element.capital;
        cap.innerText = "Capital : " +capital;
        cap.setAttribute("style" , "text-align : center");
        let reg = document.createElement("p");
        let region = element.region;
        reg.innerText = "Region : " +region;
        reg.setAttribute("style" , "text-align : center");
        let code = document.createElement("p");
        let countryCode = element.altSpellings[0];
        code.innerText = "Country Code : " +countryCode;
        code.setAttribute("style" , "text-align : center");
        let weather = document.createElement("button");
        weather.setAttribute("class", "btn btn-light");
        weather.innerText = "Click for weather";
        weather.setAttribute("style" , "position: relative; top: 40%; left: 25%;");
        weather.onclick = function(){
        console.log(name);
        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=36a7781492d6ad5c4cbf7717ea2c50f7`,{
        method : 'GET'
      })

      .then((data) => { 
        let res = data.json();
        return res;
     })

     .then((result) => {
        console.log(result);
        let kelvin = result.main.temp;
        console.log(kelvin);
        let celsius = kelvin - 273.15;
        let temp = celsius.toFixed(2);
        console.log(temp);
        let desc = result.weather[0].description;

        weather.innerText = "Temp : " +temp + '\u00B0' + " " +desc;
        
     })
     .catch((err) => {
        console.log(err);
        weather.innerText = "City Not Found";
     })
  }
        bodys.appendChild(cap);
        bodys.appendChild(reg);
        bodys.appendChild(code);
        bodys.appendChild(weather);
        cards.appendChild(bodys);
    });
})

.catch((err) => {
    console.log(err);
})

