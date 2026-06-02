let darkMode = true;

document.getElementById('themeToggle').addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
});

let chinese = false;
document.getElementById('langToggle').addEventListener('click', () => {
    chinese = !chinese;
    const title = document.getElementById('dashboardTitle');
    if (chinese) {
        title.innerText = '智能工厂控制中心';
    } else {
        title.innerText = 'Executive Factory MIS';
    }
});

// ====================== NAVIGATION ======================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const pageId = item.getAttribute('data-page');

            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById(pageId).classList.remove('hidden');
        });
    });
}

// ====================== ANIMATION ======================
function animateValue(id, end) {
    let start = 0;
    const duration = 1000;
    const step = end / (duration / 16);
    const obj = document.getElementById(id);

    const counter = setInterval(() => {
        start += step;
        if (start >= end) {
            start = end;
            clearInterval(counter);
        }
        obj.innerText = Math.floor(start).toLocaleString();
    }, 16);
}

// ====================== LOAD DATA ======================
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        document.getElementById('reportDate').innerText = data.date;

        animateValue('inputCoils', data.inputCoils);
        animateValue('galvanized', data.galvanized);
        animateValue('totalSales', data.totalSales);

        document.getElementById('shipmentStatus').innerText = data.shipmentStatus;

        // Production Chart
        new Chart(document.getElementById('productionChart'), {
            type: 'line',
            data: {
                labels: data.history.map(x => x.date),
                datasets: [{
                    label: 'Production',
                    data: data.history.map(x => x.galvanized),
                    borderColor: '#22d3ee',
                    tension: 0.4
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    });

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    // Default page is dashboard
});