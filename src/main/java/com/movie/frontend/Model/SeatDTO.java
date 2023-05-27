package com.movie.frontend.Model;

import lombok.Data;

@Data
public class SeatDTO {
    private Long id ;
    private String seat_name;

    private int row_num;
    private int column_num;
    private SeatTypeDTO type;
    private RoomDTO room;
    private boolean reserved;
    private boolean empty ;
    private boolean paid ;
}
