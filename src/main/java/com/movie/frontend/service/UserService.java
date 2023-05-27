package com.movie.frontend.service;


import com.movie.frontend.Model.*;
import com.movie.frontend.constants.Apis;
import com.movie.frontend.exception.JwtExpirationException;
import com.movie.frontend.utility.Utility;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {



    public DataContent findAll(HttpSession session) throws JwtExpirationException {
        String api = Apis.API_GET_USERS_FIRST_PAGE;
        String token = Utility.getJwt(session) ;
        HttpEntity<?> request = Utility.getHeaderWithJwt(token) ;
        ResponseEntity<DataContent> response = Utility.body(api , HttpMethod.GET , request , DataContent.class , session);
        return response.getBody();

    }
    public List<RoleDTO> findAllRole(HttpSession session) throws JwtExpirationException {
        String api = Apis.API_GET_ROLES;
        String token = Utility.getJwt(session) ;
        HttpEntity<?> request = Utility.getHeaderWithJwt(token) ;
        ResponseEntity<RoleDTO[]> response = Utility.body(api , HttpMethod.GET , request , RoleDTO[].class , session);
        return List.of(response.getBody());
    }
    public void logout(HttpSession session) throws JwtExpirationException {
        String api = Apis.API_AUTH_LOGOUT;
        String token = Utility.getJwt(session) ;
        HttpEntity<?> request = Utility.getHeaderWithJwt(token) ;
        ResponseEntity<String> response = Utility.body(api , HttpMethod.GET , request , String.class , session);
    }

    public JwtToken login(AuthenticationRequest auth) {
        RestTemplate restTemplate = new RestTemplate() ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT , MediaType.APPLICATION_JSON_VALUE);
        String authLoginURL = Apis.API_AUTH_LOGIN ;
        HttpEntity<?> entity =  new HttpEntity<>(auth , httpHeaders);
        ResponseEntity<JwtToken> response = restTemplate.exchange(authLoginURL, HttpMethod.POST,entity ,JwtToken.class);
        return response.getBody();
    }

    public String register(RegisterRequest auth ) {
        RestTemplate restTemplate = new RestTemplate() ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT , MediaType.APPLICATION_JSON_VALUE);
        // API : AUTH_REGISTER
        String authRegisterURL = Apis.API_AUTH_REGISTER;
        HttpEntity<?> entity =  new HttpEntity<>(auth , httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(authRegisterURL, HttpMethod.POST,entity ,String.class);
        return response.getBody();
    }

    public JwtToken verify(String code) {
        RestTemplate restTemplate = new RestTemplate() ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT , MediaType.APPLICATION_JSON_VALUE);
        // API : AUTH_REGISTER
        String authRegisterURL = Apis.API_VERIFY_CODE;
        HttpEntity<?> entity =  new HttpEntity<>(code , httpHeaders);
        ResponseEntity<JwtToken> response = restTemplate.exchange(authRegisterURL, HttpMethod.POST,entity ,JwtToken.class);
        return response.getBody();
    }

    public String resetPassword(String email) {
        RestTemplate restTemplate = new RestTemplate() ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT , MediaType.APPLICATION_JSON_VALUE);
        // API : AUTH_REGISTER
        String authRegisterURL = Apis.API_RESET_PASSWORD;
        HttpEntity<?> entity =  new HttpEntity<>(email , httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(authRegisterURL, HttpMethod.POST,entity ,String.class);
        return response.getBody();
    }
    public String verifyPassword(String code) {
        RestTemplate restTemplate = new RestTemplate() ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT , MediaType.APPLICATION_JSON_VALUE);
        // API : AUTH_REGISTER
        String authRegisterURL = Apis.API_VERIFY_PASSWORD;
        HttpEntity<?> entity =  new HttpEntity<>(code , httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(authRegisterURL, HttpMethod.POST,entity ,String.class);
        return response.getBody();
    }



    public String confirmPassword(String password, String token) {
        RestTemplate restTemplate = new RestTemplate() ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT , MediaType.APPLICATION_JSON_VALUE);
        String confirmPassword = Apis.API_CONFIRM_PASSWORD;
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(confirmPassword)
                .uriVariables(Collections
                        .singletonMap("token", token));
        HttpEntity<?> entity =  new HttpEntity<>(password , httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.POST,entity ,String.class);
        return response.getBody();
    }
}
