const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromCurr = document.querySelector("#fromCntry");
const toCurr = document.querySelector(".to select");

const valueMsg = document.querySelector(".value");


let select = document.querySelectorAll("select");
const btn = document.querySelector("button");

for(let s of select){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(s.name === "from" && currCode === "NPR"){
            newOption.selected = "selected";
        }
        else if (s.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        s.append(newOption);
    }
    s.addEventListener('change', (evt) => {
        flagUpdate(evt.target);
    })
}


const flagUpdate = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal= 1;
        amount.value= "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    


    let finalAmount = amtVal * rate;
    valueMsg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});


// '${BASE_URL}/${toCurr.valur.toLowerCase()}.json';