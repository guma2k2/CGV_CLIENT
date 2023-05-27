$(document).ready(function() {
   // Get the data to be encoded by the QR code from the div's data-ticket attribute
//   var data = $("#qrcode").data("ticketId");


   $(".ticket-btn").click(function() {
      var jwt = $("#token").val();
      console.log(jwt);
      var ticketId = $(this).data("id") ;
      var ticket = getTicket(jwt , ticketId);
      console.log(ticket);
      var html = ticketHtml(ticket) ;
      $(".modal-body-ticket").html(html);
      $("#ticket-modal").modal('show');
   });
   function getTicket(jwt, ticketId) {
     var ticket;
     $.ajax({
       url: 'http://localhost:8080/api/v1/ticket/' + ticketId,
       type: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
       },
       success: function(data) {
         ticket = data;
       },
       error: function(xhr, status, error) {
         console.log('Error: ' + error.message);
       },
       async: false
     });
     return ticket;
   }
   function ticketHtml(ticket) {
       let combosHTML = '';
         if (ticket.combos) {
           ticket.combos.forEach(cb => {
             combosHTML += `
               <div class="combo-item ml-2 mb-1">- ${cb.combo.title} - ${cb.combo.quantity}</div>
             `;
           });
         }
       var html = `<div class="container d-flex flex-column" >
                           <h1 class="text-center">Ve xem phim</h1>
                           <div class="ticketTitle mb-2 " style="font-weight: bold; color: black;">
                               ${ticket.event.movie.title}
                           </div>
                           <div class="ticketTitle mb-2 ">${ticket.event.start_date}</div>
                           <div class="ticketTitle mb-2 " > ${ticket.event.start_time}</div>
                           <div class="cinema-label mb-2" style="opacity: 0.5; margin-top: 20px;"  >RAP CGV</div>
                           <div class="cinema-name mb-2" >${ticket.event.cinemaName}</div>
                           <div class="row room-container " style="margin-top: 20px;" >
                               <div class="left-container col-6">
                                   <div class="seat-label mb-2" style="opacity: 0.5;" >Ghe</div>
                                   <div class="seat-name mb-2" >${ticket.seats}</div>
                               </div>
                               <div class="right-container col-6 pl-4 ">
                                   <div class="room-label mb-2" style="opacity: 0.5;" >Phong chieu</div>
                                   <div class="room-name mb-2" >${ticket.event.room.name}</div>
                               </div>
                           </div>
                           <div class="cinema-label mb-2" style="opacity: 0.5; margin-top: 20px;"  >Combo</div>
                           ${combosHTML}
                       </div>`;
       return html ;
   }
   function generateQRCodeUrl(text) {
     var qrcode = new QRCode({
       text: text,
       width: 256,
       height: 256,
       colorDark: "#000000",
       colorLight: "#ffffff",
       correctLevel: QRCode.CorrectLevel.H
     });
     return qrcode.toDataURL('image/png');
   }


});



