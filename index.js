const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const money_minus = document.getElementById("money-minus");
const localStorageTransations = JSON.parse(localStorage.getItem("transations"));

let transations =
  localStorage.getItem("transations") !== null ? localStorageTransations : &#91;];

//add transation
function addTransation(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "please add a text";
    text.style.backgroundColor = "#ccc";
    amount.placeholder = "please add amount";
    amount.style.backgroundColor = "#ccc";
  } else {
    const transation = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };
    transations.push(transation);
    addTransationDOM(transation);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
//generate id
function genenrateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transations to dom list
function addTransationDOM(transation) {
  //get sign
  const sign = transation.amount &lt; 0 ? "-" : "+";
  const item = document.createElement("li");
  //add class based on value
  item.classList.add(transation.amount &lt; 0 ? "minus" : "plus");
  item.innerHTML = `${transation.text} &lt;span&gt;${sign}${Math.abs(
    transation.amount
  )}&lt;/span&gt; &lt;button class="delete-btn" onclick="removeTransation(${
    transation.id
  })"&gt;x&lt;/button&gt;`;
  list.appendChild(item);
}
//update the balance
function updateValues() {
  const amounts = transations.map((transation) =&gt; transation.amount);
  const total = amounts.reduce((acc, item) =&gt; (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) =&gt; item &gt; 0)
    .reduce((acc, item) =&gt; (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) =&gt; item &lt; 0).reduce((acc, item) =&gt; (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `₱${total}`;
  money_plus.innerText = `₱${income}`;
  money_minus.innerText = `₱${expense}`;
}
//remove
function removeTransation(id) {
  transations = transations.filter((transation) =&gt; transation.id !== id);
  updateLocalStorage();
  init();
}

//updatelocal storage
function updateLocalStorage() {
  localStorage.setItem("transations", JSON.stringify(transations));
}

//init
function init() {
  list.innerHTML = "";
  transations.forEach(addTransationDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransation);
