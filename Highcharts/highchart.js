// var classes = ["j187","j586","j583"];
// var female = [15, 10, 6];
// var male = [5,2,3];

var State = [];
// var Population = [];
// var Rank = [];
var CriminalRank = [];
var PreventionRank = [];
var DeathRate = [];
var ParentData = {};

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
    State.push($(this).attr("name"));
    CriminalRank.push(parseFloat($(this).find("CriminalRank").text()));
    PreventionRank.push(parseFloat($(this).find("PreventionRank").text()));
    DeathRate.push(parseFloat($(this).find("DeathRate").text()));
    ParentData[State[index]] = DeathRate[index];
  //  Parent Data += [State, DeathRate]
  });
  console.log(ParentData);

  console.log("parsing data");

  // console.log(CriminalRank);
  // console.log(PreventionRank);

buildChart();
}

function buildChart(){
$('#doublebar').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'State Criminal Rank and Prevention Rank'
    },
    xAxis: {
        categories: State
    },
    yAxis: {
        title: {
            text: 'Rank'
        }
    },
    series: [{
        name: 'Criminal Penalty Rank',
        data: CriminalRank
    }, {
        name: 'DUI Prevention Rank',
        data: PreventionRank
    }]
});

buildBar();
};



function buildBar() {
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
      name: 'Death Rate',
      data: [ParentData],
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
buildMap();
};

function buildMap() {

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
      buildTable ();
  }


function buildTable() {
  $('#tableinfo').DataTable( {
      "ajax": "table.txt"
  } );
};


$(document).ready(function(){
console.log("doc ready!");
loadData();
})
