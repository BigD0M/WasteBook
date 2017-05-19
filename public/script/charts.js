firebase.auth().onAuthStateChanged(function(user) {
    //Reasons chart
    var reasonCTX = $('#reasonChart');
    var reason = reasons();
    reason.then(function(info) {
         var reasonChart = new Chart(reasonCTX, {
             type: 'pie',
             data: {
                 labels: ["Expired", "Tasted Bad", "Got Stale", "Over Bought", "Over Cooked", "Other"],
                 datasets: [{
                     label: 'Reasons',
                     data: [info[0], info[1], info[2], info[3], info[4], info[5]],
                     backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                         'rgba(255, 159, 64, 0.2)'
                     ],
                     borderColor: [
                         'rgba(255,99,132,1)',
                         'rgba(54, 162, 235, 1)',
                         'rgba(255, 206, 86, 1)',
                         'rgba(75, 192, 192, 1)',
                         'rgba(153, 102, 255, 1)',
                         'rgba(255, 159, 64, 1)'
                     ],
                     borderWidth: 1
                 }]
             },
             options: {
                 title: {
                     display: true,
                     text: "Reasons Chart",
                     fontSize: 20
                 }
             }
        });
        $(".stats").click(function () {
            reason = reasons();
            reason.then(function (info) {
                reasonChart.data.datasets[0].data[0] = info[0];
                reasonChart.data.datasets[0].data[1] = info[1];
                reasonChart.data.datasets[0].data[2] = info[2];
                reasonChart.data.datasets[0].data[3] = info[3];
                reasonChart.data.datasets[0].data[4] = info[4];
            });
            reasonChart.update();
        });
    });
    
    
    //Brand chart
    var brandCTX = $('#brandChart');
    var brand = brands();
    brand.then(function(info) {
         var brandChart = new Chart(brandCTX, {
            type: 'bar',
            data: {
                labels: [info[0][0], info[1][0], info[2][0], info[3][0], info[4][0]],
                datasets: [{
                    label: 'Quantity',
                    data: [info[0][1], info[1][1], info[2][1], info[3][1], info[4][1]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Top 5 Brands Thrown Away",
                    fontSize: 20
                }
            }
        });
        $(".stats").click(function () {
            brand = brands();
            brand.then(function (info) {
                brandChart.data.datasets[0].data[0] = info[0][1];
                brandChart.data.datasets[0].data[1] = info[1][1];
                brandChart.data.datasets[0].data[2] = info[2][1];
                brandChart.data.datasets[0].data[3] = info[3][1];
                brandChart.data.datasets[0].data[4] = info[4][1];
            });
            brand.then(function (info) {
                brandChart.data.labels[0] = info[0][0];
                brandChart.data.labels[1] = info[1][0];
                brandChart.data.labels[2] = info[2][0];
                brandChart.data.labels[3] = info[3][0];
                brandChart.data.labels[4] = info[4][0];
            });
            brandChart.update();
        });
    });
    //Food chart
    var foodCTX = $('#foodChart');
    var food = topFoods();
    food.then(function(info) {
        var foodChart = new Chart(foodCTX, {
            type: 'bar',
            data: {
                labels: [info[0][0], info[1][0], info[2][0], info[3][0], info[4][0]],
                datasets: [{
                    label: 'Quantity',
                    data: [info[0][1], info[1][1], info[2][1], info[3][1], info[4][1]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Top 5 Foods Thrown Away",
                    fontSize: 20
                }
            }
        });
        $(".stats").click(function () {
            food = topFoods();
            food.then(function (info) {
                foodChart.data.datasets[0].data[0] = info[0][1];
                foodChart.data.datasets[0].data[1] = info[1][1];
                foodChart.data.datasets[0].data[2] = info[2][1];
                foodChart.data.datasets[0].data[3] = info[3][1];
                foodChart.data.datasets[0].data[4] = info[4][1];
            });
            brand.then(function (info) {
                foodChart.data.labels[0] = info[0][0];
                foodChart.data.labels[1] = info[1][0];
                foodChart.data.labels[2] = info[2][0];
                foodChart.data.labels[3] = info[3][0];
                foodChart.data.labels[4] = info[4][0];
            });
            foodChart.update();
        });
    });

    $(".stats").click(function () {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var total = summoney();

        total.then(function (info) {
            ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Total Money Lost", canvas.width / 2, canvas.height / 8);
            ctx.font = "140px Arial";
            ctx.fontWeight = 'bold';
            ctx.fillStyle = 'red';
            ctx.fillText("$" + info, canvas.width / 2, canvas.height / 1.75);
        });
    });
});
