const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromCurr = document.querySelector("#fromCurrency");
const toCurr = document.querySelector("#toCurrency");
const resultBox = document.querySelector("#result");
const btn = document.querySelector("#convertBtn");

const select = document.querySelectorAll("select");

// Load currency codes and set default flags
for (let selectTag of select) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;
    
    // Set defaults
    if (selectTag.id === "fromCurrency" && currCode === "USD") {
      option.selected = true;
      document.querySelector("#from-flag").src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    }
    if (selectTag.id === "toCurrency" && currCode === "INR") {
      option.selected = true;
      document.querySelector("#to-flag").src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    }

    selectTag.append(option);
  }

  // Flag update on currency change
  selectTag.addEventListener("change", (e) => {
    const imgTag = e.target.id === "fromCurrency" ? document.querySelector("#from-flag") : document.querySelector("#to-flag");
    imgTag.src = `https://flagsapi.com/${countryList[e.target.value]}/flat/64.png`;
  });
}

// Fetch & convert currency
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amtInput = document.querySelector("#amount");
  let amtVal = parseFloat(amtInput.value);

  if (!amtVal || amtVal <= 0) {
    amtVal = 1;
    amtInput.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  try {
    const res = await fetch(`${BASE_URL}/${from}.json`);
    const data = await res.json();
    const rate = data[from][to];
    const finalAmount = (amtVal * rate).toFixed(2);

    resultBox.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    resultBox.innerText = "Something went wrong. Please try again!";
    console.error("API Error:", error);
  }
});
