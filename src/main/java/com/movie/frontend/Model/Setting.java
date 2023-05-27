package com.movie.frontend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class Setting {
    private String key ;
    private String value ;
    private TypeSetting type;
}
