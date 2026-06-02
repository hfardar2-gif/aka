
let darkMode = true;

document
.getElementById('themeToggle')

.addEventListener('click', () => {

darkMode = !darkMode;

if(darkMode){

document.body.classList.remove('light-mode');

}

else{

document.body.classList.add('light-mode');

}

});

let chinese = false;

document
.getElementById('langToggle')

.addEventListener('click', () => {

chinese = !chinese;

if(chinese){

document.querySelector('.topbar h2').innerText =
'智能工厂控制中心';

}

else{

document.querySelector('.topbar h2').innerText =
'Executive Dashboard';

}

});

function exportPDF(){

window.print();

}

function animateValue(id, end){

let start = 0;

const duration = 1000;

const step = end / (duration / 16);

const obj =
document.getElementById(id);

const counter = setInterval(() => {

start += step;

if(start >= end){

start = end;

clearInterval(counter);

}

obj.innerText =
Math.floor(start);

},16);

}

fetch('data.json')

.then(res => res.json())

.then(data => {

document.getElementById('reportDate').innerText =
data.date;

animateValue(
'inputCoils',
data.inputCoils
);

animateValue(
'galvanized',
data.galvanized
);

animateValue(
'totalSales',
data.totalSales
);

document.getElementById('shipmentStatus').innerText =
data.shipmentStatus;

function setupYield(name,value){

const num = parseFloat(value);

const card =
document.getElementById(name + 'Card');

const valueEl =
document.getElementById(name + 'Yield');

const alarmEl =
document.getElementById(name + 'Alarm');

valueEl.innerText = value;

if(num >= 95){

valueEl.classList.add('good');

alarmEl.innerText =
'🟢 NORMAL';

}

else if(num >= 85){

valueEl.classList.add('warn');

alarmEl.innerText =
'🟡 WARNING';

}

else{

valueEl.classList.add('bad');

alarmEl.innerText =
'🔴 CRITICAL';

}

}

setupYield(
'pickling',
data.picklingYield
);

setupYield(
'rolling',
data.rollingYield
);

setupYield(
'galvanizing',
data.galvanizingYield
);

setupYield(
'coil',
data.coilYield
);

const historyTable =
document.getElementById('historyTable');

data.history.forEach(row => {

historyTable.innerHTML += `

<tr>

<td>${row.date}</td>
<td>${row.input}</td>
<td>${row.pickling}</td>
<td>${row.rolling}</td>
<td>${row.galvanized}</td>
<td>${row.sold}</td>

</tr>

`;

});

const labels =
data.history.map(x => x.date);

new Chart(

document.getElementById('productionChart'),

{

type:'line',

data:{

labels:labels,

datasets:[

{

label:'Input',

data:data.history.map(x=>x.input),

borderWidth:3,

tension:0.4

},

{

label:'Rolling',

data:data.history.map(x=>x.rolling),

borderWidth:3,

tension:0.4

},

{

label:'Galvanized',

data:data.history.map(x=>x.galvanized),

borderWidth:3,

tension:0.4

}

]

}

}

);

new Chart(

document.getElementById('yieldChart'),

{

type:'bar',

data:{

labels:labels,

datasets:[

{

label:'Rolling Yield',

data:[88,90,92,93,94,95,96]

},

{

label:'Coil Yield',

data:[94,95,95,96,96,96,97]

}

]

}

}

);

});

