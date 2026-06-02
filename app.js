
async function loadReport(){

    const response =
    await fetch('./data/latest-report.json');

    const data =
    await response.json();

    console.log(data);

}

loadReport();

