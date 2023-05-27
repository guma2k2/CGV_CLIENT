$(document).ready(function() {

   var bookingId= $("#bookingId").val();
   console.log(bookingId);
   var jwtToken = $("#token").val();
   countdown(4 , 59);
   // form-payment
   $("#btn-payment").click(function() {
      alert("perform action");
      $("#form-payment").submit();
   })
   function countdown(minutes, seconds) {
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
           $("#minute").text('');
           $("#second").text('');
           cancelBooking(jwtToken,bookingId) ;
           $("#overTime").submit();
           clearInterval(interval);

         }
       }, 1000);
     }
     function pad(num, size) {
         var s = num + '';
         while (s.length < size) s = '0' + s;
         return s;
       }

   function cancelBooking(jwtToken, bookingId) {
     $.ajax({
       url: "http://localhost:8080/api/v1/delete/booking/" + bookingId,
       type: 'DELETE',
       headers: {
         'Authorization': 'Bearer ' + jwtToken
       },
       success: function(result) {
         console.log('Success:', result);
       },
       error: function(xhr, status, error) {
         console.error('Error:', error);
       }
     });
   }

})


