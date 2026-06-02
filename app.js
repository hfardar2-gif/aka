
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

    }

    catch(error){

        console.error(
            'Dashboard Load Error:',
            error
        );

    }

}

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

loadDashboard();

