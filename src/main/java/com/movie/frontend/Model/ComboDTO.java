package com.movie.frontend.Model;

import lombok.Data;

import java.util.List;

@Data
public class ComboDTO {
    private Long id ;
    private String title ;
    private String description ;
    private Integer price ;
    private String img_url;

    private int quantity ;

}
