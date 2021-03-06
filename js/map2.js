  var State = [];
  var Population = [];
  var Rank = [];
  var CriminalRank = [];
  var PreventionRank = [];
  var DeathRate = [];
  var ParentData = {};
  var mapChart = " ";

  function loadData(){
    console.log("loading data");
    $.ajax({
      url:'staterank.xml',
      type: 'GET',
      dta: 'xml',
      success: parseData
    });
  } // important! using ajax to call xml

  function parseData(xml){
    $(xml).find("State").each(function(index){



      mapChart += '<tr><td>' + $(this).find("Rank").text() + '</td>'
      mapChart += '<td>' + $(this).attr('name') + '</td>'
      mapChart += '<td>' + $(this).attr('Deaths') + '</td></tr>'

      $("#data").append(mapChart);

    });
    console.log(ParentData);

    console.log("parsing data");


    $(function () {
    // Load the data from the HTML table and tag it with an upper case name used for joining
    var data = [],
        // Get the map data
        mapData = Highcharts.geojson(Highcharts.maps['countries/us/custom/us-small']);

    Highcharts.data({
        table: document.getElementById('data'),
        startColumn: 1,
        startRow: 1,
        complete: function (options) {
            $.each(options.series[0].data, function () {
                data.push({
                    ucName: this[0],
                    value: this[1]
                });
            });
        }
    });

    // Process mapdata
    $.each(mapData, function () {
        var path = this.path,
            copy = {
                path: path
            };

        // This point has a square legend to the right
        if (path[1] === 9727) {

            // Identify the box
            Highcharts.seriesTypes.map.prototype.getBox.call(0, [copy]);

            // Place the center of the data label in the center of the point legend box
            this.middleX = ((path[1] + path[4]) / 2 - copy._minX) / (copy._maxX - copy._minX);
            this.middleY = ((path[2] + path[7]) / 2 - copy._minY) / (copy._maxY - copy._minY);

        }
        // Tag it for joining
        this.ucName = this.name.toUpperCase();
    });




    // Initiate the chart
    $('#map').highcharts('Map', {

        title: {
            text: 'State Strictness Ranking for DUI Laws'
        },

        subtitle: {
            text: 'Small US map with data labels'
        },

        mapNavigation: {
            enabled: true,
            enableButtons: false
        },

        xAxis: {
            labels: {
                enabled: false
            }
        },

        colorAxis: {},

        series: [{
            mapData: mapData,
            data: data,
            joinBy: 'ucName',
            name: 'Strictness Ranking',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return this.point.properties['hc-a2'];
                },
                style: {
                    fontSize: '10px'
                }
            },
            tooltip: {
                valueSuffix: '%'
            }
        }, {
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/us/custom/us-small'], 'mapline'),
            color: 'silver'
        }]
    });
});
