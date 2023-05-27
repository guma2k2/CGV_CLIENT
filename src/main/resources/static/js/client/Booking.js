$(document).ready(function() {


  // Show default tab on page load
  // Handle tab link button clicks
  $(".tablinks").click(function(event) {
    event.preventDefault();
    var tabId = $(this).attr("data-tab");

    var tab_name = $(".tabcontent.show").attr("data-tab");

    const names = $('.seat.checked').map(function() {
      return $(this).data('name');
    }).get();

    var seat_num = names.length;
    if(tabId == 'tab2' && tab_name =='tab1' ) {
       if(seat_num == 0) {
          alert("Bạn phải chọn một chỗ ngồi trước");
       } else {
           var loadingElement =  $("#loading")
            loadingElement.addClass("loading");
            setTimeout(function() {
            loadingElement.removeClass("loading");
            countdown(4,59 , 'Bắp Nước') ;
            toggleTab(tabId, event , 'Bắp Nước');
            },700);
       }
    } else if (tabId == 'tab2' && tab_name == 'tab2') {
       $("#form-booking").submit();
    }else {
        var loadingElement =  $("#loading")
        loadingElement.addClass("loading");
        setTimeout(function() {
            loadingElement.removeClass("loading");
            countdown(0 , 0 , 'Người / Ghế ');
            toggleTab(tabId , event);
        },500);
    }
  });


  $(".fa-plus").click(function(e) {
    e.preventDefault();
    var price = parseInt($(this).data("price")) ;
    var currentValue = parseInt($("#combo" + $(this).attr("id").substr(4)).val());
    var newValue = currentValue + 1;
    $("#combo" + $(this).attr("id").substr(4)).val(newValue);
    var currentTotal = parseInt($("#total-price").val());
    var currentComboPrice = parseInt($("#price-combo").val());
    console.log(currentComboPrice)
    $("#price-combo").val(currentComboPrice  + price);
    $("#total-price").val(currentTotal + price);
  })

  $(".fa-minus").click(function(e) {
       e.preventDefault();
       var price = parseInt($(this).data("price")) ;
       var currentValue = parseInt($("#combo" + $(this).attr("id").substr(5)).val());
       if(currentValue > 0 ) {
           var newValue = currentValue - 1;
           $("#combo" + $(this).attr("id").substr(5)).val(newValue);
           var currentTotal = parseInt($("#total-price").val());
           var currentComboPrice = parseInt($("#price-combo").val());
           console.log(currentComboPrice)
           $("#price-combo").val(currentComboPrice  - price);
           $("#total-price").val(currentTotal - price);
        }
    })

  $('.seat').click(function() {
    if ($(this).hasClass('reserved')) {
      return;
    }
    var isCouple = $(this).hasClass("couple");
    var isSw = $(this).hasClass("sweetbox");

    if(isCouple || isSw ) {
       let seat_name = $(this).data('name');
       var seat_start = seat_name.charAt(0);
       let seat_name_num = parseInt(seat_name.substring(1));
       console.log(seat_name_num);
       var ok = seat_name_num % 2 == 0;
       $(this).toggleClass('checked');
       var sideSeat ;
       if(ok){
          sideSeat = $("#" + seat_start + (seat_name_num - 1) );
       } else {
          sideSeat = $("#" + seat_start + (seat_name_num +  1) );
       }
       sideSeat.toggleClass("checked");
       const names = $('.seat.checked').map(function() {
            return $(this).data('name');
       }).get();

       let num_normal = $('.seat.normal.checked').length;
       let num_vip = $('.seat.vip.checked').length;
       let num_king = $('.seat.king.checked').length;
       let num_deluxe = $('.seat.vip.deluxe').length;
       let num_couple = $('.seat.couple.checked').length;
       let num_sweetbox = $('.seat.sweetbox.checked').length;
       let selectedTypes = [num_normal, num_vip, num_king, num_deluxe, num_couple , num_sweetbox];
       let numSelectedTypes = selectedTypes.filter(type => type > 0).length;
       console.log(numSelectedTypes);
       var num_seat = names.length;
       if(num_seat > 0) {
         if(numSelectedTypes >= 2) {
            $(this).removeClass('checked');
            sideSeat.removeClass('checked');
            alert("Chỉ được chọn 1 loại ghể") ;
         }else{
            $("#seats-label").text("Ghế");
            switch(true) {
               case(num_sweetbox > 0):
                 var price = $("#total-price-sweetbox").data("price") ;
                 $("#total-price").val(price*num_seat);
                 break;
               default:
                 var price = $("#total-price-couple").data("price") ;
                 $("#total-price").val(price*num_seat);
                 break;
            }
            $('#selected-seats').val(names.join(', '));
         }
      }else {
         $('#selected-seats').val("");
         $("#seats-label").text("");
         $("#total-price").val("0");
      }

    } else {
       // toggle active class
           $(this).toggleClass('checked');
           // update the seat name text
           const names = $('.seat.checked').map(function() {
             return $(this).data('name');
           }).get();
           let num_normal = $('.seat.normal.checked').length;
           let num_vip = $('.seat.vip.checked').length;
           let num_king = $('.seat.king.checked').length;
           let num_deluxe = $('.seat.vip.deluxe').length;
           let num_couple = $('.seat.couple.checked').length;
           let num_sweetbox = $('.seat.sweetbox.checked').length;
           let selectedTypes = [num_normal, num_vip, num_king, num_deluxe, num_couple , num_sweetbox];
           let numSelectedTypes = selectedTypes.filter(type => type > 0).length;
           var num_seat = names.length;
           if(num_seat > 0) {
              if(numSelectedTypes >= 2) {
                 $(this).removeClass('checked');
                 alert("Chỉ được chọn 1 loại ghe") ;
              }else{
                 $("#seats-label").text("Ghế");
                 switch(true) {
                    case(num_normal > 0):
                      var price = $("#total-price-normal").data("price") ;
                      $("#total-price").val(price*num_seat);
                      break;
                    case(num_vip > 0):
                       var price = $("#total-price-vip").data("price") ;
                       $("#total-price").val(price*num_seat);
                      break;
                    case(num_king > 0):
                      var price = $("#total-price-king").data("price") ;
                      $("#total-price").val(price*num_seat);
                      break;
                    default:
                      var price = $("#total-price-deluxe").data("price") ;
                      $("#total-price").val(price*num_seat);
                      break;
                 }
                 $('#selected-seats').val(names.join(', '));
              }
           }else {
              $('#selected-seats').val("");
              $("#seats-label").text("");
              $("#total-price").val("0");
           }
    }



  });


  function countdown(minutes, seconds , booking_title) {
    var clockDown = $('.clock');
    if(minutes === 0 && seconds === 0) {
       clockDown.css("display" , "none");
       $("#minute").text('');
       $("#second").text('');
       $("#clock-title").css("display" ,"none");
       return;
    }
    $("#clock-title").css("display" ,"block");
    clockDown.show();
    var totalSeconds = minutes * 60 + seconds;
    var interval = setInterval(function() {
      var remainingSeconds = totalSeconds % 60;
      var remainingMinutes = Math.floor(totalSeconds / 60);
      var formattedMinute = pad(remainingMinutes, 2);
      var formattedSecond = pad(remainingSeconds, 2);
      $("#minute").text(formattedMinute);
      $("#second").text(formattedSecond);
      console.log(totalSeconds);
      totalSeconds--;
      if (totalSeconds < 0) {
        $(".tabcontent").removeClass("show");
        $("#tab1" ).addClass("show");
        $('.tablinks').removeClass('active');
        $("#btn-tap1").addClass('active');
        $(".booking-title").text(booking_title);
        clockDown.css("display" , "none");
        $("#minute").text('');
        $("#second").text('');
        $("#clock-title").css("display" ,"none");
        clearInterval(interval);

      }
    }, 1000);
  }
  function toggleTab(tabId , event , booking_title) {
       $(".tabcontent").removeClass("show");
       $("#" + tabId).addClass("show");
       $('.tablinks').removeClass('active');
       $(event.target).addClass('active');
       $(".booking-title").text(booking_title);
    }

  function pad(num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

});
