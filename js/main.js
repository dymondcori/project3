// var classes = ["j187","j586","j583"];
// var female = [15, 10, 6];
// var male = [5,2,3];

var State = [];
// var Population = [];
// var Rank = [];
var CriminalRank = [];
var PreventionRank = [];
var DeathRate = [];
var ParentData = [];


function loadData(){
  console.log("loading data");
  $.ajax({
    url:'data/info.xml',
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
    //ParentData[State[index]] = DeathRate[index];
    //ParentData.push(State[index] + ", " + DeathRate[index]);


    ParentData.push("[" + State[index] + "," + DeathRate[index] + "]");

    //console.log(ParentData);

//console.log(State[index]);
//console.log(DeathRate[index]);


// var theData = [];
// var i = 0;
// while (i < ParentData.length) {
//
// console.log("loop");
//
// theData[i] = "'" + State[index] + "'" + "," + DeathRate[index];

//var Parent += "'" + State[index] + "'" + "," + DeathRate[index];

// theData += "'" + State[index] + "'";
//
// console.log(theData);
//
// i++;
// }


//console.log(theData);

  //ParentData[['State[index]' + "," + DeathRate[index]];
  //  Parent Data += [State, DeathRate]
  });


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
        categories: State,
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
        title: {
            text: 'Rank'
        }
    },
    series: [{
        name: 'Criminal Penalty Rank',
        data: CriminalRank,
        color: '#dad5eb'

    }, {
        name: 'DUI Prevention Rank',
        data: PreventionRank,
        color: '#3d316a'
    }
  ]
    // dataLabels: {
    //     //enabled: true,
    //     rotation: -90,
    //     color: '#3D316A',
    //     align: 'right',
    //     y: -10, // 10 pixels down from the top
    //     style: {
    //         fontSize: '13px',
    //         fontFamily: 'Verdana, sans-serif'
    //     }
    //   }




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
      data:  [
        ['South Dakota', 65],
        ['Discrict of Columbia', 20],
        ['Pennsylvania', 37],
        ['North Dakota', 73],
        ['Maryland', 29],
        ['Montana', 93],
        ['Wisconsin', 45],
        ['Kentucky', 47],
        ['Vermont', 34],
        ['Ohio', 32],
        ['New Jersey', 21],
        ['Idaho', 45],
        ['Wyoming', 89],
        ['Mississippi', 86],
        ['Michigan', 27],
        ['Minnesota', 27],
        ['Rhode Island', 29],
        ['Indiana', 34],
        ['New Mexico', 60],
        ['Maine', 37],
        ['California', 27],
        ['New York', 19],
        ['Missouri', 55],
        ['North Carolina', 42],
        ['Hawaii', 35],
        ['Illinois', 30],
        ['Massachusetts', 21],
        ['Arkansas', 60],
        ['Alabama', 66],
        ['Nevada', 38],
        ['Florida', 44],
        ['South Carolina', 83],
        ['Texas', 51],
        ['New Hampshire', 30],
        ['Colorado', 33],
        ['Oregon', 32],
        ['Iowa', 32],
        ['Louisiana', 67],
        ['Oklahoma', 58],
        ['Tennessee', 53],
        ['Washington', 28],
        ['Georgia', 38],
        ['Delaware', 47],
        ['Virginia', 32],
        ['Utah', 17],
        ['Nebraska', 37],
        ['Kansas', 42],
        ['West Virginia', 59],
        ['Connecticut', 29],
        ['Alaska', 31],
        ['Arizona', 45],
      ],
      color: '#3D316A',
      //ParentData,
      dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#3D316A',
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

function buildMap () {
  $.getJSON('data/map.json', function (data) {

//$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=us-population-density.json&callback=?', function (data) {


  // Make codes uppercase to match the map data
   $.each(data, function () {
       this.code = this.code.toUpperCase();
   });

  // Instanciate the map
  $('#usmap').highcharts('Map', {

      chart : {
        //  borderWidth : 1
      },

      title : {
          text : 'Strictness of State DUI Laws'
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
          //enabled: true
      },

      colorAxis: {
          min: 1,
          max: 51,
          type: 'linear',
          minColor: '#dad5eb',
          maxColor: '#3D316A',
          stops: [
              [0, '#dad5eb'],
              [.5, '#66589e'],
              [1, '#3D316A']
          ]
      },

      series : [{
          animation: {
            //  duration: 1000
          },
          data : data,
          mapData: Highcharts.maps['countries/us/us-all'],
          joinBy: ['postal-code', 'code'],
          dataLabels: {
              enabled: true,
              color: 'white',
              format: '{point.code}'
          },
          name: 'Ranking of Strictness',
        tooltip: {
          pointFormat: '{point.value}'
        }
      }]
  });
});
buildDeathMap();
//buildTable();
};

function buildDeathMap () {
$.getJSON('data/deathmap.json', function (data) {

//$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=us-population-density.json&callback=?', function (data) {


// Make codes uppercase to match the map data
$.each(data, function () {
this.code = this.code.toUpperCase();
});

// Instanciate the map
$('#deathmap').highcharts('Map', {

chart : {
//  borderWidth : 1
},

title : {
text : 'DUI Related Fatalities per State (per 100,000 people)'
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
//enabled: true
},

colorAxis: {
min: 1,
max: 100,
type: 'linear',
minColor: '#dad5eb',
maxColor: '#3D316A',
stops: [
    [0, '#dad5eb'],
    [.5, '#66589e'],
    [1, '#3D316A']
]
},

series : [{
animation: {
  //  duration: 1000
},
data : data,
mapData: Highcharts.maps['countries/us/us-all'],
joinBy: ['postal-code', 'code'],
dataLabels: {
    enabled: true,
    color: 'white',
    format: '{point.code}'
},
name: 'DUI Fatalities',
tooltip: {
pointFormat: '{point.value} deaths per 100,000 people'
}
}]
});
});
buildTable();
};




function buildTable() {
  $('#tableinfo').DataTable( {
      "ajax": "data/table.txt"
  } );
};


$(document).ready(function(){
console.log("doc ready!");
loadData();
})
