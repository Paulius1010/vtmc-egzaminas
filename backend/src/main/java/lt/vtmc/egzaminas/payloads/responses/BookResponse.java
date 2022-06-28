package lt.vtmc.egzaminas.payloads.responses;

import lt.vtmc.egzaminas.models.Category;


public class BookResponse {
    private Long id;
    private String name;
    private String description;
    private String isbn;
    private String coverLink;
    private Integer pages;
    private Category category;
    private Boolean isBooked;

    public BookResponse(Long id, String name, String description, String isbn, String coverLink, Integer pages, Category category, Boolean isBooked) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isbn = isbn;
        this.coverLink = coverLink;
        this.pages = pages;
        this.category = category;
        this.isBooked = isBooked;
    }

    public BookResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCoverLink() {
        return coverLink;
    }

    public void setCoverLink(String coverLink) {
        this.coverLink = coverLink;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getBooked() {
        return isBooked;
    }

    public void setBooked(Boolean booked) {
        isBooked = booked;
    }

    @Override
    public String toString() {
        return "BookResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isbn='" + isbn + '\'' +
                ", coverLink='" + coverLink + '\'' +
                ", pages=" + pages +
                ", category=" + category +
                ", isBooked=" + isBooked +
                '}';
    }
}
