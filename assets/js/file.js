"use strict";

// BANKIST APP
//data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300, 200],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2023-11-14T09:48:16.867Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2023-11-14T09:48:16.867Z",
    "2023-11-17T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 700],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2023-11-14T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2023-11-14T09:48:16.867Z",
    "2023-11-16T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "yousef Essam",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 700],
  interestRate: 1.9,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2023-11-14T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2023-11-14T09:48:16.867Z",
    "2023-11-16T10:51:36.790Z",
  ],
  currency: "EGP",
  locale: "ar-EG",
};

const accounts = [account1, account2, account3];

// Elements

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const updateUi = function (acc) {
  addDiv(acc);
  currentBalance(acc);
  currentsummary(acc);
};

const timer = function () {
  labelTimer.textContent = " ";
  // log  05:00
  let time = 5 * 60;
  const counter = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(finalResult);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  counter();
  const finalResult = setInterval(counter, 1000);
  return finalResult;
};

const kindNum = function (value, local, currencydate) {
  const options = {
    style: "currency",
    useGrouping: true,
    currency: currencydate,
  };
  return new Intl.NumberFormat(local, options).format(value);
};

const formateDate = function (date, countre) {
  const daysAgo = function (date1, date2) {
    return Math.trunc(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const dayPassed = daysAgo(date, new Date());

  if (dayPassed === 0) return "today";
  if (dayPassed === 1) return "yesterday";
  if (dayPassed <= 7) return `${dayPassed} days AGO`;
  else {
    return new Intl.DateTimeFormat(countre).format(date);
  }
};

//monementes

const addDiv = function (movement, sort = false) {
  containerMovements.innerHTML = "";

  const typeSort = sort
    ? movement.movements.slice().sort((a, b) => a - b)
    : movement.movements;

  typeSort.forEach(function (value, index, array) {
    const type = value > 0 ? "deposit" : "withdrawal";
    // current date in movmentes

    const date = new Date(movement.movementsDates[index]);
    const runDate = formateDate(date, movement.locale);

    const money = kindNum(value, movement.locale, movement.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">${runDate}</div>
        <div class="movements__value">${money} </div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// creatUsernamr
const creatUsernamr = function (accounts) {
  accounts.forEach(function (value) {
    value.username = value.owner
      .toLowerCase()
      .split(" ")
      .map((value) => value.at(0))
      .join("");
  });
};
creatUsernamr(accounts);

//currentBalance
const currentBalance = function (mov) {
  mov.balance = mov.movements.reduce((acc, val) => acc + val);
  0;
  labelBalance.textContent = kindNum(mov.balance, mov.locale, mov.currency);
};

const currentsummary = function (mov) {
  //current in
  const currentmoney = mov.movements
    .filter((mov) => mov > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = kindNum(currentmoney, mov.locale, mov.currency);

  //out
  const currentOut = Math.abs(
    mov.movements.filter((mov) => mov < 0).reduce((acc, val) => acc + val, 0)
  );
  labelSumOut.textContent = kindNum(currentOut, mov.locale, mov.currency);
  //interest
  const currentinterest = mov.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * currentAcount.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, val) => acc + val, 0);

  labelSumInterest.textContent = kindNum(
    currentinterest,
    mov.locale,
    mov.currency
  );
};

let currentAcount, timing;

//log in
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAcount = accounts.find(
    (mov) => mov.username === inputLoginUsername.value
  );
  //pin
  if (currentAcount?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome
    // current date
    labelWelcome.textContent = `Welcome ${currentAcount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    //timer
    if (timing) clearInterval(timing);
    timing = timer();

    //date current balance
    const dateNow = new Date();
    const optional = {
      hours: "numeric",
      minuntes: "numeric",
      year: "numeric",
      day: "numeric",
      month: "numeric",
    };
    //const local = navigator.language; // language website

    const local = currentAcount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(local, optional).format(
      dateNow
    );
    updateUi(currentAcount);
    inputLoginUsername.value = inputLoginPin.value = " ";
  }
});

//transfer money
let transferAcount;
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  transferAcount = accounts.find(
    (mov) => mov.username === inputTransferTo.value
  );

  let mount = Number(inputTransferAmount.value);
  if (
    mount > 0 &&
    transferAcount &&
    currentAcount?.balance >= mount &&
    transferAcount?.username !== currentAcount.username
  ) {
    currentAcount.movements.push(-mount);
    transferAcount.movements.push(mount);
    currentAcount.movementsDates.push(new Date().toISOString());
    transferAcount.movementsDates.push(new Date().toISOString());
    clearInterval(timing);
    timing = timer();
    updateUi(currentAcount);
  }
  inputTransferTo.value = inputTransferAmount.value = "";
});

//close account
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    currentAcount.username === inputCloseUsername.value &&
    currentAcount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.pin === Number(inputClosePin.value)
    );
    accounts.splice(index, 1);
    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = " ";
  }
});

//Request loan
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.trunc(Number(inputLoanAmount.value));
  if (amount > 0 && currentAcount.movements.some((acc) => acc > 0.1 * amount)) {
    currentAcount.movements.push(amount);
    currentAcount.movementsDates.push(new Date().toISOString());
    inputLoanAmount.value = " ";
    updateUi(currentAcount);
  }
  clearInterval(timing);
  timing = timer();
});

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  addDiv(currentAcount, !sorted);
  sorted = !sorted;
});
///////////////////////////////////////
