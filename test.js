const api_url = 'https://api.v2.emissions-api.org'
        + '/api/v2/carbonmonoxide/average.json'
        + '?country=DE&begin=2019-02-01&end=2019-03-01'
window.onload = function () {
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        let ctx = document.getElementById('average-example').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                // use start times contained in the requested data as labels
                labels: data.map(x => x.start.substring(8, 10)),
                datasets: [{
                    label: 'Germany',
                    backgroundColor: '#93bd20',
                    // use the average values as data
                    data: data.map(x => x.average),
                }]
            },

            // add a few sensible configuration options
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'carbon monoxide [mol/m²]'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'day'
                        }
                    }]
                }
            }
        });
    })
}