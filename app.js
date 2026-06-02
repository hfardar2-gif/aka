const lineChart = echarts.init(
document.getElementById('lineChart')
);

lineChart.setOption({

    backgroundColor:'transparent',

    xAxis:{
        type:'category',
        data:['00','04','08','12','16','20','24']
    },

    yAxis:{
        type:'value'
    },

    series:[{

        data:[500,1200,1000,2100,1800,2000,2400],

        type:'line',

        smooth:true,

        lineStyle:{
            width:4,
            color:'#00E5FF'
        },

        areaStyle:{
            color:'rgba(0,229,255,.15)'
        }

    }]

});

const pieChart = echarts.init(
document.getElementById('pieChart')
);

pieChart.setOption({

    series:[{

        type:'pie',

        radius:['50%','75%'],

        data:[

            {value:45,name:'Hot Rolled'},
            {value:25,name:'Cold Rolled'},
            {value:15,name:'Galvanized'},
            {value:15,name:'Coated'}

        ]

    }]

});

window.addEventListener('resize',()=>{

    lineChart.resize();
    pieChart.resize();

});
/* LIVE CLOCK */

function updateClock(){

    const now = new Date();

    const time = now.toLocaleTimeString();

    document.getElementById('liveClock')
    .innerText = time;

}

setInterval(updateClock,1000);

updateClock();
function animateValue(id,start,end,duration){

    let range = end - start;

    let current = start;

    let increment = end > start ? 1 : -1;

    let stepTime = Math.abs(
    Math.floor(duration / range)
    );

    const obj = document.getElementById(id);

    let timer = setInterval(function(){

        current += increment;

        obj.innerHTML = current;

        if(current == end){

            clearInterval(timer);

        }

    }, stepTime);

}
animateValue(
'productionValue',
0,
2073,
2000
);