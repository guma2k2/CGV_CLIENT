package com.movie.frontend.constants;

public class Apis {

    public static String base_url = "http://localhost:8080/api/v1";
    public static String API_VERIFY_CODE = base_url+ "/auth/verify";

    public static String API_VERIFY_PASSWORD = base_url+ "/auth/verifyPassword";
    public static String API_RESET_PASSWORD = base_url+ "/auth/resetPassword";
    public static String API_CONFIRM_PASSWORD = base_url+ "/auth/confirmPassword/{token}";
    public static String API_GET_MOVIES_IS_SHOWING = base_url+ "/movies/is/showing";
    public static String API_GET_MOVIES_FIRST_PAGE = base_url+ "/admin/movie/paginate/firstPage";
    public static String API_GET_ROLES = base_url+ "/admin/user/roles" ;
    public static String API_GET_USERS_FIRST_PAGE = base_url+ "/admin/user/paginate/firstPage";
    public static String API_GET_GENRES = base_url+ "/admin/movie/genres";
    public static String API_GET_CINEMAS = base_url+ "/admin/cinema";
    public static String API_GET_ROOMS = base_url+ "/admin/room";
    public static String API_GET_ROOM_BY_ID = base_url+ "/admin/room/{id}";
    public static String API_AUTH_REFRESH_TOKEN = base_url+ "/auth/refresh-token" ;
    public static String API_GET_MOVIES_WILL_SHOWING = base_url+ "/movies/will/showing";
    public static  String API_GET_CITES = base_url +"/movies/cities";
    public static  String API_GET_SETTINGS_MAIL_SERVER = base_url +"/admin/setting/mailTemplate";
    public static  String API_GET_SETTINGS = base_url +"/admin/setting";
    public static  String API_GET_SETTINGS_MAIL_TEMPLATE = base_url +"/admin/setting/mailTemplate";
    public static String API_GET_TICKETS_BY_USER_ID = "http://localhost:8080/api/v1/ticket/user/{id}";
    public static String API_CREATE_TICKET = "http://localhost:8080/api/v1/ticket/create" ;
    public static String API_AUTH_REGISTER = "http://localhost:8080/api/v1/auth/register";
    public static String API_AUTH_LOGIN = "http://localhost:8080/api/v1/auth/authenticate";
    public static String API_AUTH_LOGOUT = base_url+"/auth/logout";
    public static String API_GET_MOVIES = "http://localhost:8080/api/v1/movies";
    public static String APT_GET_MOVIE_BY_ID = "http://localhost:8080/api/v1/movies/{id}";
    public static String API_EVENT_BY_ID = "http://localhost:8080/api/v1/movies/events/booking/{id}";
    public static String API_GET_ALL_COMBO = "http://localhost:8080/api/v1/movies/combos";
    public static String API_CREATE_BOOKING = "http://localhost:8080/api/v1/create/booking";
}
