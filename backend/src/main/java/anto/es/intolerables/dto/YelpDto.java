package anto.es.intolerables.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class YelpDTO {
//uso yelp dto para obtener los datos desde  la api y guardarlos
    private List<Business> businesses;

    @Getter
    @Setter
    public static class Business {
        private String id;
        private String name;
        private Location location;
        private List<Category> categories;
        private Coordinates coordinates;
        private String image_url;
        private String url;
    }

    @Getter
    @Setter
    public static class Location {
        private String address1;
    }

    @Getter
    @Setter
    public static class Category {
        private String title;
    }

    @Getter
    @Setter
    public static class Coordinates {
        private double latitude;
        private double longitude;
    }
}
