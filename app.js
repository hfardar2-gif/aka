
async function loadDashboard() {

    try {

        const response =
            await fetch('./data/latest-report.json');

        const data =
            await response.json();

        renderMaterialFlow(
            data.totalProductionTill
        );
         renderYieldGauge(
            data.totalProductionTill
         );

        renderWarehouse({

            unpickled:
                data.totalProductionTill.inputCoilsTon
                - data.totalProductionTill.picklingTon,

            pickled:
                data.totalProductionTill.picklingTon
                - data.totalProductionTill.rollingTon,

            rolled:
                data.totalProductionTill.rollingTon
                - data.totalProductionTill.galvanizedTon

        });
         renderProductionChart(
            data.cumulativeProductionReport
        );
        renderKPI(
            data.totalProductionTill
        );
        renderProductionTable(
    data.cumulativeProductionReport
);
renderWIP(
    data.totalProductionTill
);

       

    }

    catch (error) {

        console.error(
            'Dashboard Load Error:',
            error
        );

    }

}

/* =====================================
   FACTORY LINES
===================================== */

function renderMaterialFlow(data) {

    const flowGrid =
        document.getElementById('flowGrid');

    flowGrid.innerHTML = `

        <div class="plant-card">

            <div class="plant-title">
                PICKLING
            </div>

            <div class="plant-row">
                <span>Production</span>
                <strong>
                    ${data.picklingTon.toFixed(1)} T
                </strong>
            </div>

            <div class="plant-row">
                <span>Warehouse</span>
                <strong>
                    ${(data.picklingTon - data.rollingTon).toFixed(1)} T
                </strong>
            </div>

            <div class="plant-row">
                <span>Yield</span>
                <strong class="good">
                    ${(
            data.picklingTon /
            data.inputCoilsTon *
            100
        ).toFixed(1)}%
                </strong>
            </div>

        </div>

        <div class="process-arrow">
            →
        </div>

        <div class="plant-card">

            <div class="plant-title">
                COLD ROLLING
            </div>

            <div class="plant-row">
                <span>Production</span>
                <strong>
                    ${data.rollingTon.toFixed(1)} T
                </strong>
            </div>

            <div class="plant-row">
                <span>Warehouse</span>
                <strong>
                    ${(data.rollingTon - data.galvanizedTon).toFixed(1)} T
                </strong>
            </div>

            <div class="plant-row">
                <span>Yield</span>
                <strong class="warning">
                    ${(
            data.rollingTon /
            data.picklingTon *
            100
        ).toFixed(1)}%
                </strong>
            </div>

        </div>

        <div class="process-arrow">
            →
        </div>

        <div class="plant-card">

            <div class="plant-title">
                GALVANIZING
            </div>

            <div class="plant-row">
                <span>Production</span>
                <strong>
                    ${data.galvanizedTon.toFixed(1)} T
                </strong>
            </div>

            <div class="plant-row">
                <span>Sold</span>
                <strong>
                    ${data.soldTon.toFixed(1)} T
                </strong>
            </div>

            <div class="plant-row">
                <span>Yield</span>
                <strong class="good">
                    ${(
            data.galvanizedTon /
            data.rollingTon *
            100
        ).toFixed(1)}%
                </strong>
            </div>

        </div>

    `;

}
/* =====================================
   kpi 
===================================== */
function renderKPI(data) {

    const grid =
        document.getElementById(
            'kpiGrid'
        );

    const overallYield =
        (
            data.galvanizedTon /
            data.inputCoilsTon
        ) * 100;

    const salesConversion =
        (
            data.soldTon /
            data.galvanizedTon
        ) * 100;

    const utilization =
        (
            data.rollingTon /
            data.inputCoilsTon
        ) * 100;

    grid.innerHTML = `

        <div class="kpi-card">

            <div class="kpi-label">
                OVERALL YIELD
            </div>

            <div class="kpi-value">
                ${overallYield.toFixed(1)}%
            </div>

        </div>

        <div class="kpi-card">

            <div class="kpi-label">
                SALES CONVERSION
            </div>

            <div class="kpi-value">
                ${salesConversion.toFixed(1)}%
            </div>

        </div>

        <div class="kpi-card">

            <div class="kpi-label">
                FACTORY UTILIZATION
            </div>

            <div class="kpi-value">
                ${utilization.toFixed(1)}%
            </div>

        </div>

    `;
}

/* =====================================
   WAREHOUSE STATUS
===================================== */

function renderWarehouse(data) {

    const grid =
        document.getElementById(
            'warehouseGrid'
        );

    grid.innerHTML = `

        <div class="warehouse-card">

            <div class="warehouse-label">
                UNPICKLED COILS
            </div>

            <div class="warehouse-value">
                ${data.unpickled.toFixed(1)} T
            </div>

        </div>

        <div class="warehouse-card">

            <div class="warehouse-label">
                PICKLED COILS
            </div>

            <div class="warehouse-value">
                ${data.pickled.toFixed(1)} T
            </div>

        </div>

        <div class="warehouse-card">

            <div class="warehouse-label">
                COLD ROLLED COILS
            </div>

            <div class="warehouse-value">
                ${data.rolled.toFixed(1)} T
            </div>

        </div>

    `;
}


/* =====================================
PRODUCTION CHART
===================================== */

function renderProductionChart(data) {

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

    chart.setOption({

        backgroundColor: 'transparent',

        tooltip: {
            trigger: 'axis'
        },

        legend: {
            top: 10,
            textStyle: {
                color: '#8EA4C1'
            }
        },

        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                color: '#8EA4C1'
            }
        },

        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#8EA4C1'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.05)'
                }
            }
        },

        series: [

            {
                name: 'Pickling',
                type: 'line',
                smooth: true,
                data: pickling
            },

            {
                name: 'Rolling',
                type: 'line',
                smooth: true,
                data: rolling
            },

            {
                name: 'Galvanized',
                type: 'line',
                smooth: true,
                data: galvanized
            },

            {
                name: 'Sold',
                type: 'line',
                smooth: true,
                data: sold
            }

        ]

    });

}
function renderProductionTable(data){

    const table =
    document.getElementById(
        'productionTable'
    );

    table.innerHTML = `

        <table class="production-table">

            <thead>

                <tr>

                    <th>Date</th>
                    <th>Pickling</th>
                    <th>Rolling</th>
                    <th>Galvanized</th>
                    <th>Sold</th>

                </tr>

            </thead>

            <tbody>

                ${data.map(item => `

                    <tr>

                        <td>${item.date}</td>

                        <td>
                            ${item.pickling.toFixed(1)}
                        </td>

                        <td>
                            ${item.rolling.toFixed(1)}
                        </td>

                        <td>
                            ${item.galvanized.toFixed(1)}
                        </td>

                        <td>
                            ${item.sold.toFixed(1)}
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `;
}
function renderYieldGauge(data){

    const grid =
    document.getElementById(
        'yieldGrid'
    );

    grid.innerHTML = `

        <div class="yield-card">

            <div class="yield-title">
                PICKLING YIELD
            </div>

            <div
                id="picklingGauge"
                class="yield-chart">
            </div>

        </div>

        <div class="yield-card">

            <div class="yield-title">
                ROLLING YIELD
            </div>

            <div
                id="rollingGauge"
                class="yield-chart">
            </div>

        </div>

        <div class="yield-card">

            <div class="yield-title">
                GALVANIZING YIELD
            </div>

            <div
                id="galvanizingGauge"
                class="yield-chart">
            </div>

        </div>

    `;

    createGauge(
        'picklingGauge',
        (
            data.picklingTon /
            data.inputCoilsTon
        ) * 100
    );

    createGauge(
        'rollingGauge',
        (
            data.rollingTon /
            data.picklingTon
        ) * 100
    );

    createGauge(
        'galvanizingGauge',
        (
            data.galvanizedTon /
            data.rollingTon
        ) * 100
    );

}
function createGauge(id,value){

    const chart =
    echarts.init(
        document.getElementById(id)
    );

    chart.setOption({

        series:[{

            type:'gauge',

            startAngle:225,

            endAngle:-45,

            min:0,

            max:100,

            progress:{
                show:true,
                width:18
            },

            axisLine:{
                lineStyle:{
                    width:18
                }
            },

            pointer:{
                show:false
            },

            axisTick:{
                show:false
            },

            splitLine:{
                show:false
            },

            axisLabel:{
                show:false
            },

            detail:{
                valueAnimation:true,
                formatter:'{value}%',

                color:'#ffffff',

                fontSize:28,

                offsetCenter:[
                    0,
                    '10%'
                ]
            },

            data:[{
                value:Number(
                    value.toFixed(1)
                )
            }]

        }]

    });

}
function renderWIP(data){

    const grid =
    document.getElementById(
        'wipGrid'
    );

    const unpickled =
        data.inputCoilsTon -
        data.picklingTon;

    const pickled =
        data.picklingTon -
        data.rollingTon;

    const rolled =
        data.rollingTon -
        data.galvanizedTon;

    const galvanizedStock =
        data.galvanizedTon -
        data.soldTon;

    grid.innerHTML = `

        <div class="wip-card">

            <div class="wip-label">
                UNPICKLED
            </div>

            <div class="wip-value">
                ${unpickled.toFixed(1)} T
            </div>

        </div>

        <div class="wip-card">

            <div class="wip-label">
                PICKLED WIP
            </div>

            <div class="wip-value">
                ${pickled.toFixed(1)} T
            </div>

        </div>

        <div class="wip-card">

            <div class="wip-label">
                ROLLED WIP
            </div>

            <div class="wip-value">
                ${rolled.toFixed(1)} T
            </div>

        </div>

        <div class="wip-card">

            <div class="wip-label">
                FINISHED STOCK
            </div>

            <div class="wip-value">
                ${galvanizedStock.toFixed(1)} T
            </div>

        </div>

    `;

}
/* =====================================
   START
===================================== */
loadDashboard()