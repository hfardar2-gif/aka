// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
            document.getElementById(item.getAttribute('data-page')).classList.remove('hidden');
        });
    });
}

// Cumulative Production Trend Chart
function createCumulativeChart() {
    new Chart(document.getElementById('cumulativeChart'), {
        type: 'line',
        data: {
            labels: ['اسیدشویی', 'نورد', 'گالوانیزه'],
            datasets: [{
                label: 'تولید تجمعی (تن)',
                data: [2025.87, 1872.57, 1035.39],
                borderColor: '#22d3ee',
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                tension: 0.4,
                borderWidth: 4,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true, position: 'top' } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Fill Galvanized Coils Table (نمونه از شیت Product list)
function fillCoilsTable() {
    const tbody = document.querySelector('#coilsTable tbody');
    tbody.innerHTML = '';

    const sampleCoils = [
        {id: "52507005503", thick: "1", weight: "5510", status: "انبار"},
        {id: "52507005502", thick: "1", weight: "5555", status: "انبار"},
        {id: "52507005501", thick: "1", weight: "5445", status: "انبار"},
        {id: "52506020503", thick: "0.7", weight: "5175", status: "انبار"},
        {id: "52512004503", thick: "0.6", weight: "5120", status: "انبار"},
    ];

    sampleCoils.forEach(coil => {
        const row = `
            <tr>
                <td>${coil.id}</td>
                <td>${coil.thick}</td>
                <td>${coil.weight}</td>
                <td><span class="status">${coil.status}</span></td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    createCumulativeChart();
    fillCoilsTable();

    // KPI values
    document.getElementById('inputCoils').textContent = '2073.75';
    document.getElementById('pickling').textContent = '2025.87';
    document.getElementById('rolling').textContent = '1872.57';
    document.getElementById('galvanized').textContent = '1035.39';
});