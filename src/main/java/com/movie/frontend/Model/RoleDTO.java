package com.movie.frontend.Model;

import lombok.Data;

@Data
public class RoleDTO {
    private Integer id ;
    private String name ;

    @Override
    public String toString() {
        return this.name;
    }
}
