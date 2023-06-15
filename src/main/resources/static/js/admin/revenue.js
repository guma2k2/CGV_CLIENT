$(document).ready(function () {
    var jwt = $("input[name='token']").val() ;
    console.log(jwt);
    google.charts.load('current', {'packages': ['corechart', 'table']});
    google.charts.setOnLoadCallback(loadSalesReportByDate);
    $("#drawChart").on('click', function() {
        loadSalesReportByDate();
    })
    function loadSalesReportByDate() {
        var startDate = $("input[name='startDate']").val() ;
        var endDate = $("input[name='endDate']").val() ;
        var cinemaId = $("#cinema-list").val() ;
        handleDrawChart(startDate, endDate, cinemaId,  jwt) ;
    }
    function handleDrawChart(startDate, endDate, cinemaId, jwt) {
        getReport(startDate, endDate, cinemaId, jwt)
            .then(function(sales) {
                console.log(sales);
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Date');
                data.addColumn('number', 'Total Sales');
                $.each(sales, function(index, sale) {
                    data.addRows([[sale.date, sale.totalAmount]]);
                });
                formatChartData(data);
                var options = {
                		title: 'sale by cinema',
                		'height': 360,
                		legend: {position: 'top'},

                		series: {
                			0: {targetAxisIndex: 0},
                		},

                		vAxes: {
                			0: {title: 'Sales Amount', format: '₫#,##0'}
                		}
                	};
                var salesChart = new google.visualization.ColumnChart(document.getElementById('chart_sales'));
                salesChart.draw(data, options);
            })
            .catch(function(error) {
                   console.log(error) ;
                   if (error.responseJSON) {
                     alert(error.responseJSON.message);
                   } else {
                     alert("An error occurred.");
                   }
            })
    }
    function getReport(startDate, endDate, cinemaId , jwt) {
      var url = baseUrl +  "/api/v1/ticket/admin/between/" + startDate + "/" + endDate + "/where/" + cinemaId ;
      var headers = { "Authorization": "Bearer " + jwt };
      return new Promise(function(resolve, reject) {
        $.ajax({
          type: "GET",
          contentType: "application/json",
          url: url,
          headers: headers,
          success: function(data) {
            resolve(data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            reject(jqXHR);
          }
        });
      });
    }
    function formatChartData(data) {
    	var formatter = new google.visualization.NumberFormat({
            pattern: '###,### VND'
        });
    	formatter.format(data, 0);
    	formatter.format(data, 1);
    }

        //jquery for toggle sub menus
    $(".sub-btn").click(function () {
      $(this).next(".sub-menu").slideToggle();
      $(this).find(".dropdown").toggleClass("rotate");
    });
    $(".item.active").removeClass("active");
    $(".item.dashboard").addClass("active");
    //jquery for expand and collapse the sidebar
    $(".menu-btn").click(function () {
      $(".side-bar").toggleClass("active");
      $(".main").toggleClass("active");
    });
    var cityId = $("#city-list").val() ;
    var cinemas = getCinemaByCity(cityId) ;
    $("#cinema-list").empty() ;
    if(cinemas.length > 0){
      listCinemaHtml(cinemas) ;
    }
    $("#city-list").on('change', function() {
        var selectedCityId = $(this).val() ;
        $("#cinema-list").empty() ;
        var cinemas = getCinemaByCity(selectedCityId) ;
        if(cinemas.length > 0){
          listCinemaHtml(cinemas) ;
        }
    })
    function listCinemaHtml(cinemas) {
         $.each(cinemas, function(index, cinema) {
           $('#cinema-list').append(`<option value="${cinema.id}">${cinema.name}</option>`);
         });
       }
    function getCinemaByCity(cityId) {
       var cinemas = [];
       var url =  baseUrl +  "/api/v1/movies/cinemas/find/city/" + cityId;
         $.ajax({
           url: url,
           method: 'GET',
           success: function(data) {
             cinemas = data;
           },
           async: false // Make the request synchronous
         });
         return cinemas;
   }
});