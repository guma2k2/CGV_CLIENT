package com.movie.frontend.controller.client;

import com.movie.frontend.Model.JwtToken;
import com.movie.frontend.Model.TicketDTO;
import com.movie.frontend.Model.UserDTO;
import com.movie.frontend.constants.Apis;
import com.movie.frontend.exception.JwtExpirationException;
import com.movie.frontend.service.TicketService;
import com.movie.frontend.utility.Utility;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Controller
@RequestMapping("/vincinema")
@Slf4j
public class TicketController {


    @Autowired
    private TicketService ticketService;
    @PostMapping("/create/ticket")
    public String createTicket(@RequestParam("STK") String STK ,
                               @RequestParam("banking") String banking ,
                               HttpServletRequest servletRequest,
                               HttpSession session
                               ) {

        try {
            String jwt = Utility.getJwt(session) ;
            if (jwt.equals("")) {
                return "redirect:/vincinema/login";
            }
            Long eventId = Long.valueOf(servletRequest.getParameter("eventId"));
            Long bookingId = Long.valueOf(servletRequest.getParameter("bookingId"));


            if (bookingId == null) {
                return "redirect:/vincinema/booking/" + eventId ;
            }
//            log.info(String.valueOf(bookingId));
//            log.info(jwt);

            // get user from session
            Long userId = ((JwtToken) session.getAttribute("jwtToken")).getUser().getId();

            // API : CREATE_TICKET
            ticketService.createTicket(userId, bookingId, jwt, session);
            return "client/success";
        } catch (HttpClientErrorException e) {
            log.error("err: {}" , e.getMessage());
            return "redirect:/vincinema/login";
        } catch (JwtExpirationException e) {
            return "redirect:/vincinema/login";
        }
    }
    @GetMapping("/ticket/history")
    public String historyBookingTicket(HttpSession session ,
                                       Model model ) {

        try {
            String jwt = Utility.getJwt(session) ;
            if (jwt.equals("")) {
                return "redirect:/vincinema/login";
            }

            Long userId = ((JwtToken) session.getAttribute("jwtToken")).getUser().getId();
            // API : GET_TICKETS_BY_USER_ID ;

            List<TicketDTO> tickets = ticketService.findByUserId(jwt, userId, session) ;
            model.addAttribute("token" , jwt);
            model.addAttribute("tickets",tickets);
            return "client/ticket-history" ;
        } catch (HttpClientErrorException e) {
            return "redirect:/vincinema/login";
        } catch (JwtExpirationException e) {
            return "redirect:/vincinema/login";
        }
    }
}
