

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
buildMap();
})
