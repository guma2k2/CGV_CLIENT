package com.movie.frontend.Model;

public enum LanguageDTO {

    EN("English"),
    VN("Vietnamese"),
    KR("Korean"),
    JP("Japanese"),
    CN("Chinese"),
    IN("Hindu"),
    SP("Spainish"),
    GM("German"),
    FR("French");

    public final String label;
    private LanguageDTO(String label) {
        this.label = label;
    }
}
