$(function () {

$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=us-population-density.json&callback=?', function (data) {

    // Make codes uppercase to match the map data
    $.each(data, function () {
        this.code = this.code.toUpperCase();
    });

    // Instanciate the map
    $('#usmap').highcharts('Map', {

        chart : {
            borderWidth : 1
        },

        title : {
            text : 'US population density (/km²)'
        },

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 25
        },

        mapNavigation: {
            enabled: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
            ]
        },

        series : [{
            animation: {
                duration: 50
            },
            data : data,
            mapData: Highcharts.maps['countries/us/us-all'],
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: 'white',
                format: '{point.code}'
            },
            name: 'Strictness per State',
            tooltip: {
                pointFormat: '{point.code}: {point.value} Fatalities'
            }
        }]
    });
});
};
