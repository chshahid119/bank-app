'use strict';

const account1 = {
  user: 'ali',
  owner: 'Ali Raza',
  LoggedIn: false,
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 13.5, 15.3, 16.4],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  user: 'jerry',
  LoggedIn: false,
  owner: 'Muhammad Zubair',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  user: 'amna',
  LoggedIn: false,
  owner: 'Amna Ghulam Rasool',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  user: 'shahid',
  LoggedIn: false,
  owner: 'Shahid Chaudhary',
  movements: [430, 1000, 700, 50, 90, 4000, 50000, 100000, 90000, -4600],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
// first check the password the logged in using this
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const allAccounts = [account1, account2, account3, account4];

//Get All Objects using allAccounts array
const ALLAccounts = allAccounts.map(curr => {
  return curr;
});

// Check Which User is Authenticated
function checkWhichUsersAuthentication(userName, userPass) {
  const AvailableAccount = allAccounts?.find(
    account => account?.user === userName && account?.pin === parseInt(userPass)
  );

  if (AvailableAccount) {
    containerApp.style.opacity = 1;
    displayMovements(AvailableAccount);

    // console.log(AvailableAccount);
  } else {
    alert('wrong credentials');
  }
}

//First
const showUserInterface = event => {
  // Prevent Form from submitting
  event.preventDefault();
  // console.log('clicked');
  const user = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  checkWhichUsersAuthentication(user, pin);

  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
};

// Btn is login here
btnLogin.addEventListener('click', showUserInterface);

const changePreviousLoginStatus = (LoggedIN, previousAllAccounts) => {
  previousAllAccounts.map(curr => {
    return (curr.LoggedIn = false);
  });
  LoggedIN.LoggedIn = true;
};

// Fourth
const CalculateBalance = AccountLoggedIn => {
  const movement = AccountLoggedIn.movements;
  const TotalBalance = movement.reduce((acc, cur) => {
    return acc + cur;
  });

  changePreviousLoginStatus(AccountLoggedIn, ALLAccounts);

  AccountLoggedIn.TotalAmount = TotalBalance;

  // console.log(ALLAccounts);

  labelBalance.innerText = TotalBalance.toFixed(3) + '€';
};

const sendAmount = event => {
  event.preventDefault();

  const transferToUser = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);

  const LoggedInArray = allAccounts
    .map(curr => {
      return curr;
    })
    .find(curr => {
      if (curr.LoggedIn === true) {
        return curr.movements;
      }
    });

  const Accounts = allAccounts.map(curr => {
    return curr;
  });
  let CalculateBalanceLoginAcc = LoggedInArray.movements.reduce((acc, curr) => {
    return acc + curr;
  });

  // Receiver Accounts
  const ReceiverAccount = allAccounts
    .map(curr => {
      return curr;
    })
    .find(curr => {
      return curr.user === transferToUser;
    });

  if (+CalculateBalanceLoginAcc < +transferAmount) {
    alert('You dont have enough Money :(');
  } else {
    // console.log(Accounts);
    const sendAmount = ReceiverAccount.movements.push(Number(transferAmount));
    const loginBalance =
      Number(CalculateBalanceLoginAcc) - Number(transferAmount);
    labelBalance.innerText = loginBalance.toFixed(2) + '€';
    const updateLoginArray = LoggedInArray.movements;

    const upDateArray = updateLoginArray.push(-transferAmount);
    // console.log(updateLoginArray);

    updateLoginArray.map((value, index) => {
      const type = value > 0 ? 'deposit' : 'withdrawal';
      // console.log(`Value at ${index} : ${value}`);
      const html = ` <div class="movements__row">
      <div class="movements__type movements__type--${type}">2 deposit</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${value}€</div>
    </div>`;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });

    // console.log(LoggedInArray);
  }
};

btnTransfer.addEventListener('click', sendAmount);

// Fifth
const calculateIn_out_interest = AccountLoggedIn => {
  const AmountDeposited = AccountLoggedIn.movements;
  const interest = AccountLoggedIn.interestRate;
  const amountIN = AmountDeposited.filter(value => {
    return value > 0;
  }).reduce((acc, curr) => {
    return acc + curr;
  });
  // console.log(amountIN);
  labelSumIn.innerText = `${amountIN} €`;

  const amountOUT = AmountDeposited.filter(value => {
    return value < 0;
  }).reduce((acc, curr) => {
    return acc + curr;
  });
  // console.log(amountOUT);
  labelSumOut.textContent = `${Math.abs(amountOUT)} €`;

  const CalculateInterest = AmountDeposited.filter(amount => amount > 0)
    .map(amount => (amount * interest) / 100)
    .filter((interest, index, array) => {
      return interest >= 1;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = `${CalculateInterest}€`;
  // console.log(CalculateInterest);
};

const startLogoutTimer = function () {
  let time = 600;
  const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);

      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Login to Get Started';
    }
    time--;
  }, 1000);
};

//Third
const displayMovements = AccountLoggedIn => {
  //Logged In Account
  let date = new Date().getDate() + '';
  date = date.padStart(2, '0');
  // console.log(typeof date);
  let month = new Date().getMonth() + '';
  month = month.padStart(2, '0');
  let year = new Date().getFullYear();

  const movement = AccountLoggedIn?.movements; // amount Movements Array
  containerMovements.innerHTML = '';
  labelDate.innerHTML = `${date}/${month}/${year}`;
  CalculateBalance(AccountLoggedIn);

  labelWelcome.innerText = `Hi, ${AccountLoggedIn?.owner}`;

  calculateIn_out_interest(AccountLoggedIn);
  movement?.forEach(function (value, index) {
    const Transactiondate = new Date(
      AccountLoggedIn.movementsDates[index]
    ).getDate();
    const TransactionMonth = new Date(
      AccountLoggedIn.movementsDates[index]
    ).getMonth();
    const TransactionYear = new Date(
      AccountLoggedIn.movementsDates[index]
    ).getFullYear();
    const type = value > 0 ? 'deposit' : 'withdrawal';
    // console.log(`Value at ${index} : ${value}`);
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">2 deposit</div>
    <div class="movements__date">${Transactiondate}/${TransactionMonth}/${TransactionYear}</div>
    <div class="movements__value">${value}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  startLogoutTimer();
};

const sortArrray = () => {
  const LogINAcc = ALLAccounts.find(curr => {
    return curr.LoggedIn === true;
  });
  // console.log(LogINAcc.movements.length);

  const sortedMovements = LogINAcc.movements.slice().sort((a, b) => a - b);

  containerMovements.innerText = '';

  sortedMovements.map((value, index) => {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const Transactiondate = new Date(LogINAcc.movementsDates[index]).getDate();
    const TransactionMonth = new Date(
      LogINAcc.movementsDates[index]
    ).getMonth();
    const TransactionYear = new Date(
      LogINAcc.movementsDates[index]
    ).getFullYear();
    // console.log(`Value at ${index} : ${value}`);
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">2 deposit</div>
    <div class="movements__date">${Transactiondate}/${TransactionMonth}/${TransactionYear}</div>
    <div class="movements__value">${value}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  LogINAcc.sorted = false;
};

btnSort.addEventListener('click', sortArrray);

const LoanApproved = e => {
  e.preventDefault();
  const LoanAmount = inputLoanAmount.value;
  const LogINAcc = ALLAccounts.find(curr => {
    return curr.LoggedIn === true;
  });
  const AmountsArray = LogINAcc.movements;
  // Get maximum Number from an array
  const maxNumber = AmountsArray.reduce((acc, cur) => {
    if (acc > cur) {
      return acc;
    } else {
      return cur;
    }
  });
  if (+LoanAmount >= +maxNumber) {
    // console.log(LogINAcc);
    LogINAcc.movements.push(+LoanAmount);
    const TotalAmount = LogINAcc.movements.reduce((acc, cur) => acc + cur);
    labelBalance.innerText = TotalAmount.toFixed(3) + '€';
    console.log(TotalAmount);
    const Transactiondate = new Date().getDate();
    const TransactionMonth = new Date().getMonth();
    const TransactionYear = new Date().getFullYear();
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--deposit">2 deposit</div>
    <div class="movements__date">${Transactiondate}/${TransactionMonth}/${TransactionYear}</div>
    <div class="movements__value">${LoanAmount}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  } else {
    alert('Your Amount is too much Less!');
  }
  // AmountsArray.some((mov)=>mov>)
};

btnLoan.addEventListener('click', LoanApproved);

const closeAccount = e => {
  e.preventDefault();
  const userWhichIdClosed = inputCloseUsername.value;
  const pinWhichIdClosed = Number(inputClosePin.value);

  const indexToRemove = allAccounts.findIndex(curr => {
    return curr.user === userWhichIdClosed && curr.pin === pinWhichIdClosed;
  });

  if (indexToRemove !== -1) {
    allAccounts.splice(indexToRemove, 1);

    alert('Account removed successfully.');
  } else {
    console.log('Account not found.');
  }
};

btnClose.addEventListener('click', closeAccount);

//Delete Accounts

// closeAccount(allAccounts);
///////////////////////////////////////////////////////////////////////////

// Calculate HummanAge Average

// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const AverageHumman = array1 => {
//   const average = array1.reduce((acc, cur) => acc + cur / array1.length, 0);
//   return average;
// };
// console.log(AverageHumman(data1));

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// const calculateRecomendedFood = dogs.forEach((value, indexNo) => {
//   value.recomendedFood = value.weight ** 0.75 * 28;
//   console.log(value.recomendedFood);
// });
// console.log(calculateRecomendedFood);
