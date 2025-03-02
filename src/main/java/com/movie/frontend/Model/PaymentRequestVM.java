package com.movie.frontend.Model;

public record PaymentRequestVM(
        int amount,
        String bankCode,
        Long bookingId
) {
}
