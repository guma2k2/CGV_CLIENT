package com.movie.frontend.Model;

public record ProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber
) {

}
