package com.movie.frontend.model;

public enum RatingDTO {
    P("Mọi lứa tuổi"),
    C13("13 tuổi trở lên"),
    C16("16 tuổi trở lên"),
    C18("18 tuổi trở lên");

    public final String label;
    private RatingDTO(String label) {
        this.label = label;
    }
}
