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
  //ParentData[['State[index]'] , DeathRate[index]];
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

function buildMap () {
  $.getJSON('map.json', function (data) {

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
          text : 'Strictness of State Dui Laws'
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
          type: 'logarithmic',
          minColor: '#dad5eb',
          maxColor: '#3D316A',
          stops: [
              [0, '#dad5eb'],
              [.8, '#66589e'],
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
          //name: 'Rankining of Strickness',
        //  tooltip: {
          //    pointFormat: '{point.value}'
        //  }
      }]
  });
});
buildTable();
};




function buildTable() {
  $('#tableinfo').DataTable( {
      "ajax": "table.txt"
  } );
};


$(document).ready(function(){
console.log("doc ready!");
loadData();
})
