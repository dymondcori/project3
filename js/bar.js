$(function () {
  $('#bar').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Drunk Driving Fatalities'
    },
    subtitle: {
        text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '8px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          // title: {
          //     text: 'Level of Strictness for DUI Laws'
          // }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Fatalities per 100,000 people'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Arizona', 45],
            ['Alaska', 31],
            ['Connecticut', 29],
            ['West Virginia', 59],
            ['Kansas', 42],
            ['Nebraska', 37],
            ['Utah', 17],
            ['Virginia', 32],
            ['Delaware', 47],
            ['Georgia', 38],
            ['Washington', 28],
            ['Tennessee', 53],
            ['Oklahoma', 58],
            ['Louisiana', 67],
            ['Iowa', 32],
            ['Oregon', 32],
            ['Colorado', 33],
            ['New Hampshire', 30],
            ['Texas', 51],
            ['South Carolina', 83],
            ['Florida', 44],
            ['Nevada', 38],
            ['Alabama', 66],
            ['Arkansas', 60],
            ['Massachusetts', 21],
            ['Illinois', 30],
            ['Hawaii', 35],
            ['North Carolina', 42],
            ['Missouri', 55],
            ['New York', 19],
            ['California', 27],
            ['Maine', 37],
            ['New Mexico', 60],
            ['Indiana', 34],
            ['Rhode Island', 29],
            ['Minnesota', 27],
            ['Michigan', 27],
            ['Mississippi', 86],
            ['Wyoming', 89],
            ['Idaho', 45],
            ['New Jersey', 21],
            ['Ohio', 32],
            ['Vermont', 34],
            ['Kentucky', 47],
            ['Wisconsin', 45],
            ['Montana', 93],
            ['Maryland', 29],
            ['North Dakota', 73],
            ['Pennsylvania', 37],
            ['Discrict of Columbia', 20],
            ['South Dakota', 65]
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
          //  format: '{point.y:.1f}', // one decimal
            y: -10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
  });
});
