package com.movie.frontend.Model;

public record ProfileUpdateRequest(
        String firstName,
        String lastName,
        String phoneNumber,
        String password
) {
}
