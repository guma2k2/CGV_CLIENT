package com.movie.frontend.controller.admin;


import com.movie.frontend.Model.CityDTO;
import com.movie.frontend.Model.JwtToken;
import com.movie.frontend.exception.JwtExpirationException;
import com.movie.frontend.service.CinemaService;
import com.movie.frontend.service.CityService;
import com.movie.frontend.utility.Utility;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/vincinema/admin")
@Slf4j
public class AdminHomeController {

    @Autowired
    private CityService cityService ;
    @GetMapping
    public String adminHome(HttpSession session, Model model) {
        try {
            String token = Utility.getJwt(session) ;
//            log.info(token);
            List<CityDTO> cites = cityService.findAll(session) ;
            LocalDate endDate = LocalDate.now();
            LocalDate  startDate = endDate.minusDays(1);
            model.addAttribute("startDate" , startDate);
            model.addAttribute("endDate" , endDate);
            model.addAttribute("token" , token ) ;
            model.addAttribute("cites", cites) ;
            return "admin/home" ;
        } catch (HttpClientErrorException | JwtExpirationException e ) {
            return "redirect:/vincinema/login";
        }

    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        return "redirect:/vincinema";
    }


    @GetMapping("/about")
    public String about() {
        return "admin/about";
    }
}
