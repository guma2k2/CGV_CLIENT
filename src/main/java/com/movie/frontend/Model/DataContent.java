package com.movie.frontend.Model;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@lombok.Data
@AllArgsConstructor
@NoArgsConstructor
public class DataContent<T> {
    private Paginate paginate ;
    private List<T> results;
}
