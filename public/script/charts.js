$(document).ready(function() {
    
    $('.stats').on('click', function() {
        
        var height = $(window).height() * .70;
    
        if ($('.stats').height() < height) {
            
            if (reasonCTX != null) {
                reasonCTX.destroy();
                reasonCTX.clear();
                brandCTX.destroy();
                foodCTX.destroy();
                ctx.destroy();
            }
        
    
            //Reasons chart
            var reasonCTX = $('#reasonChart');
            var reason = reasons();
            reason.then(function(info) {
                 var reasonChart = new Chart(reasonCTX, {
                     type: 'doughnut',
                     data: {
                         labels: ["Expired", "Tasted Bad", "Got Stale", "Over Bought", "Over Cooked", "Other"],
                         datasets: [{
                             label: 'Reasons',
                             data: [info[0], info[1], info[2], info[3], info[4], info[5]],
                             backgroundColor: [
                                 'rgb(255, 99, 132)',
                                 'rgb(54, 162, 235)',
                                 'rgb(255, 206, 86)',
                                 'rgb(75, 192, 192)',
                                 'rgb(153, 102, 255)',
                                 'rgb(255, 159, 64)'
                             ],
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
            });


            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            var total = summoney();


            ctx.clearRect(0, 0, canvas.width, canvas.height);

            total.then(function (info) {
                ctx.font = "50px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = 'black';
                ctx.fillText("Total Money Lost", canvas.width / 2, canvas.height / 8);
                ctx.font = "140px Arial";
                ctx.fontWeight = 'bold';
                ctx.fillStyle = 'red';
                ctx.fillText("$" + info, canvas.width / 2, canvas.height / 1.75);
            });
        
        }
        
    });
});
