async function loadDashboard(){

    try{

        const response =
        await fetch('./data/latest-report.json');

        const data =
        await response.json();

        renderMaterialFlow(
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

/* FACTORY LINES */

function renderMaterialFlow(data){

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
                    153.3 T
                </strong>
            </div>

            <div class="plant-row">
                <span>Yield</span>
                <strong class="good">
                    100%
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
                    837.2 T
                </strong>
            </div>

            <div class="plant-row">
                <span>Yield</span>
                <strong class="warning">
                    53.7%
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
                <span>Ready To Ship</span>
                <strong>
                    757.9 T
                </strong>
            </div>

            <div class="plant-row">
                <span>Yield</span>
                <strong class="good">
                    97.5%
                </strong>
            </div>

        </div>

    `;

}

/* CHART */

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

    chart.setOption({

        tooltip:{
            trigger:'axis'
        },

        legend:{
            textStyle:{
                color:'#8EA4C1'
            }
        },

        xAxis:{
            type:'category',
            data:dates
        },

        yAxis:{
            type:'value'
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

    });

}
function renderWarehouse(data){

    const grid =
    document.getElementById(
        'warehouseGrid'
    );

    grid.innerHTML = `

    <div class="warehouse-card">

        <div class="warehouse-label">
            UNPICKLED
        </div>

        <div class="warehouse-value">
            ${data.unpickled.toFixed(1)} T
        </div>

    </div>

    <div class="warehouse-card">

        <div class="warehouse-label">
            PICKLED
        </div>

        <div class="warehouse-value">
            ${data.pickled.toFixed(1)} T
        </div>

    </div>

    <div class="warehouse-card">

        <div class="warehouse-label">
            ROLLED
        </div>

        <div class="warehouse-value">
            ${data.rolled.toFixed(1)} T
        </div>

    </div>

    `;

}
loadDashboard();
