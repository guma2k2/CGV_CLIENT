package com.movie.frontend.Model;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email ;
    private String password ;
}
