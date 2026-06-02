
async function loadDashboard(){

    try{

        const response =
        await fetch('./data/latest-report.json');

        const data =
        await response.json();

        console.log(data);

        renderExecutiveSummary(
            data.totalProductionTill
        );

        renderMaterialFlow(
            data.totalProductionTill
        );

              renderProductionChart(
                 data.cumulativeProductionReport
              );



    }

    catch(error){

        console.error(
            'Dashboard Load Error:',
            error
        );

    }

}

/* EXECUTIVE SUMMARY */

function renderExecutiveSummary(data){

    const summaryGrid =
    document.getElementById('summaryGrid');

    summaryGrid.innerHTML = `

        <div class="summary-card">

            <div class="summary-label">
                FACTORY INPUT
            </div>

            <div class="summary-value">
                ${data.inputCoilsTon}
                <span>T</span>
            </div>

        </div>

        <div class="summary-card">

            <div class="summary-label">
                PICKLED
            </div>

            <div class="summary-value">
                ${data.picklingTon}
                <span>T</span>
            </div>

        </div>

        <div class="summary-card">

            <div class="summary-label">
                ROLLED
            </div>

            <div class="summary-value">
                ${data.rollingTon}
                <span>T</span>
            </div>

        </div>

        <div class="summary-card">

            <div class="summary-label">
                GALVANIZED
            </div>

            <div class="summary-value">
                ${data.galvanizedTon}
                <span>T</span>
            </div>

        </div>

        <div class="summary-card">

            <div class="summary-label">
                SOLD
            </div>

            <div class="summary-value">
                ${data.soldTon}
                <span>T</span>
            </div>

        </div>

        <div class="summary-card">

            <div class="summary-label">
                INPUT COILS
            </div>

            <div class="summary-value">
                ${data.inputCoilsQty}
                <span>QTY</span>
            </div>

        </div>

    `;

}

/* MATERIAL FLOW */

function renderMaterialFlow(data){

    const flowGrid =
    document.getElementById('flowGrid');

    const factoryInput =
    data.inputCoilsTon;

    const items = [

        {
            label:'INPUT',
            value:data.inputCoilsTon
        },

        {
            label:'PICKLING',
            value:data.picklingTon
        },

        {
            label:'ROLLING',
            value:data.rollingTon
        },

        {
            label:'GALVANIZING',
            value:data.galvanizedTon
        },

        {
            label:'SOLD',
            value:data.soldTon
        }

    ];

    flowGrid.innerHTML =
    items.map(item => {

        const percent =
        (item.value / factoryInput) * 100;

        return `

        <div class="flow-card">

            <div class="flow-label">
                ${item.label}
            </div>

            <div class="flow-value">
                ${item.value.toFixed(1)} T
            </div>

            <div class="flow-progress">

                <div
                class="flow-progress-bar"
                style="
                width:${percent}%">
                </div>

            </div>

        </div>

        `;

    }).join('');

}

function renderProductionChart(data){

    const chartDom =
    document.getElementById(
        'productionChart'
    );

    const chart =
    echarts.init(chartDom);

    const dates =
    data.map(item => item.date);

    const pickling =
    data.map(item => item.pickling);

    const rolling =
    data.map(item => item.rolling);

    const galvanized =
    data.map(item => item.galvanized);

    const sold =
    data.map(item => item.sold);

    const option = {

        backgroundColor:'transparent',

        tooltip:{
            trigger:'axis'
        },

        legend:{
            top:0,
            textStyle:{
                color:'#8EA4C1'
            }
        },

        grid:{
            left:'3%',
            right:'3%',
            bottom:'3%',
            containLabel:true
        },

        xAxis:{
            type:'category',
            data:dates,
            axisLine:{
                lineStyle:{
                    color:'#334155'
                }
            },
            axisLabel:{
                color:'#8EA4C1'
            }
        },

        yAxis:{
            type:'value',
            axisLine:{
                lineStyle:{
                    color:'#334155'
                }
            },
            splitLine:{
                lineStyle:{
                    color:'rgba(255,255,255,.05)'
                }
            },
            axisLabel:{
                color:'#8EA4C1'
            }
        },

        series:[

            {
                name:'Pickling',
                type:'line',
                smooth:true,
                data:pickling
            },

            {
                name:'Rolling',
                type:'line',
                smooth:true,
                data:rolling
            },

            {
                name:'Galvanized',
                type:'line',
                smooth:true,
                data:galvanized
            },

            {
                name:'Sold',
                type:'line',
                smooth:true,
                data:sold
            }

        ]

    };

    chart.setOption(option);

}



/* START */

loadDashboard();
