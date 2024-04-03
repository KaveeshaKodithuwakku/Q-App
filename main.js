let interval = undefined;
let min = 0;
let sec = 0;
let questionNumber = 1;
let count = 0;
let op = ['+','-','*','/','%'];

let num1 = 0;
let num2 = 0;
let selectedOp = '';

let minElement= document.getElementById('min');
let secElement = document.getElementById('sec');

let countElement= document.getElementById('count');

let num1Element= document.getElementById('num1');
let num21Element= document.getElementById('num2');
let operatorElement= document.getElementById('operator');
let ansElement= document.getElementById('ans');
let table = document.getElementById('result-table-body');

let result = [];

const countDown = () => {

    manageQuestion();

    if(interval){
        clearInterval(interval);
    }
   
   interval =  setInterval(() => {

    sec++;

    if(sec < 10){
        secElement.innerHTML = '0' + sec;
    }else{
        secElement.innerHTML = sec;
    }

    if(sec === 59){
        min++;
        minElement.innerHTML = min;
        sec = 0;
    }
       
    },1000)
}

const start = () => {
    result = [];
    countDown();
}

const reset = () => {
    if(interval){
        clearInterval(interval);
    }

    secElement.innerHTML = '00';
    minElement.innerHTML = '00';

    count=0;
    countElement.innerHTML = count;

    num1Element.innerHTML = 0;
    num21Element.innerHTML = 0;
    operatorElement.innerHTML = '+';

}

const setCount = () => {
    count++;
    countElement.innerHTML = count;
}

const manageQuestion = () => {

    setCount();

    num1 = Math.floor(Math.random() * 100) + 1;
    num2 = Math.floor(Math.random() * 100) + 1;
    selectedOp = op[Math.floor(Math.random() * 5)];

    num1Element.innerHTML = num1;
    num21Element.innerHTML = num2;
    operatorElement.innerHTML = selectedOp;
}

const setAnswer = () => {

    let correctAnswer = 0;
    let userAnswer = parseInt(ansElement.value);

    switch(selectedOp){
        case '+' : correctAnswer = num1 + num2;
        break;
        case '-' : correctAnswer = num1 - num2;
        break;
        case '*' : correctAnswer = num1 * num2;
        break;
        case '/' : correctAnswer = num1 / num2;
        break;
        case '%' : correctAnswer = num1 % num2;   
    }

    result.push({
        'Number 1':num1,
        'Number 2':num2,
        'Correct Answer':correctAnswer,
        'User Answer': userAnswer,
        'operator':selectedOp,
        'time':minElement.innerHTML + ':' + secElement.innerHTML,
        'isCorrect': correctAnswer === userAnswer
    })

    ansElement.value = 0;

    if(count == 5){
        console.log(result);
        count=0;

        setTableData();

        reset();
    }

    manageQuestion();
}

const setTableData = () => {
    result.forEach(item => {
        let row = document.createElement('tr');

        for(let key in item){
            if(item.hasOwnProperty(key)){
                let cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
        }

        table.appendChild(row);
    })
}