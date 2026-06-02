
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

/* START */

loadDashboard();
