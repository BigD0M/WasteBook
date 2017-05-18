$(document).ready(function() {
    
    //Reasons chart
    var reasonCTX = document.getElementById("reasonChart");
    var reason = reasons();
    reason.then(function(info) {
         var reasonChart = new Chart(reasonCTX, {
            type: 'bar',
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
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    });
    
    
    //Reasons chart
    var brandCTX = document.getElementById("brandChart");
    var brand = brands();
    brand.then(function(info) {
         var brandChart = new Chart(brandCTX, {
            type: 'bar',
            data: {
                labels: [info[0][0], info[1][0], info[2][0], info[3][0], info[4][0]],
                datasets: [{
                    label: 'Brands',
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
                }
            }
        });
    });
    
    
});