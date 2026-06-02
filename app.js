// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
            document.getElementById(item.getAttribute('data-page')).classList.remove('hidden');
        });
    });
}

// Charts
function createProductionChart() {
    new Chart(document.getElementById('productionChart'), {
        type: 'bar',
        data: {
            labels: ['اسیدشویی', 'نورد', 'گالوانیزه'],
            datasets: [{
                label: 'تناژ',
                data: [2025.87, 1872.57, 1035.39],
                backgroundColor: ['#22d3ee', '#a855f7', '#eab308']
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false }}}
    });
}

function createYieldChart() {
    new Chart(document.getElementById('yieldChart'), {
        type: 'doughnut',
        data: {
            labels: ['اسیدشویی', 'نورد', 'گالوانیزه', 'کلاف به کلاف'],
            datasets: [{
                data: [100, 53.69, 97.47, 96.57],
                backgroundColor: ['#22c55e', '#eab308', '#06b6d4', '#8b5cf6']
            }]
        },
        options: { responsive: true }
    });
}

function createSalesChart() {
    new Chart(document.getElementById('salesChart'), {
        type: 'pie',
        data: {
            labels: ['آماده ارسال', 'فروخته شده', 'WIP'],
            datasets: [{
                data: [757.92, 251.26, 1035.39],
                backgroundColor: ['#22d3ee', '#f59e0b', '#64748b']
            }]
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    createProductionChart();
    createYieldChart();
    createSalesChart();
});