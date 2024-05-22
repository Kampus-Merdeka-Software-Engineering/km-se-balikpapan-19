const ctx = document.getElementById('myChart');

let myChart;
let jsonData;

fetch('final_dataset.json')
.then(function(response){
    if(response.ok == true){
        return response.json()
    }
})
.then(function(data){
    jsonData = data
    createchart(data, 'bar');
})

function setchartType(chartType){
    myChart.destroy()
    createchart(jsonData, chartType);
}

function createchart(data, type){
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: data.map(row => row.product_category),
            datasets: [{
                label: 'insert the label',
                data: data.map(row => row.store_location),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false
        }
    });
}