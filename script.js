const URL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=50751097610c47618bf5ab3a6ef80de9`;
const selects = document.querySelectorAll("select");
const dropdowns = document.querySelectorAll(".dropdown");
const parentImg = document.querySelectorAll(".parentImg");
const button = document.querySelector("button");
const input = document.querySelector("input");
const from = document.querySelector(".fromCurrency");
const to = document.querySelector(".toCurrency");
const result = document.querySelector(".result");

selects.forEach((select, index) => {
  for (let currencyCode in countryList) {
    const options = document.createElement("option");
    options.value = currencyCode;
    options.innerText = currencyCode;
    select.appendChild(options);
  }
  let ParentImg = parentImg[index];
  console.log(select.value);
  const trackChanges = () => {
    console.log(select);
    ParentImg.innerHTML = "";
    const img = document.createElement("img");
    img.src = `https://flagsapi.com/${countryList[select.value]}/flat/64.png`;
    console.log(img.src);
    img.alt = countryList[select.value];
    console.log(select.value);
    ParentImg.appendChild(img);
  };
  select.addEventListener("change", trackChanges);
});

const showResult = () => {
  let Input = input.value;
  const getAPI = async () => {
    try {
      if (Input !== "") {
        let fetchResponse = await fetch(URL);
        console.log(fetchResponse);
        let getJSO = await fetchResponse.json();
        console.log(getJSO);
        let conversion = await getJSO.rates;
        console.log(conversion);
        let multiply = Input * conversion[to.value];
        console.log(multiply / conversion[from.value]);
        let convert = multiply / conversion[from.value];
        let decimal = convert.toFixed(2);
        if (conversion[from.value] !== undefined) {
          result.innerText = `${Input} ${from.value} = ${decimal} ${to.value}`;
        } else {
          result.innerText = "Server Error";
        }
      } else {
        button.innerText = "Please inter the value";
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAPI();
  input.addEventListener("click", () => {
    button.innerText = "Get Exchange Value";
  });
};
button.addEventListener("click", showResult);
