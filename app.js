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