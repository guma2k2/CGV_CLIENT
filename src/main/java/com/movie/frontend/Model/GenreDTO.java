package com.movie.frontend.Model;

import lombok.Data;

@Data
public class GenreDTO {
    private Integer id ;
    private String name ;

    @Override
    public String toString() {
        return this.name;
    }
}
