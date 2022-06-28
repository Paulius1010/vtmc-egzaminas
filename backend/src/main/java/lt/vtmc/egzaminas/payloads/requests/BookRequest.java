package lt.vtmc.egzaminas.payloads.requests;

public class BookRequest {

    private String name;
    private String description;
    private String isbn;
    private String coverLink;
    private Integer pages;
    private Long categoryId;

    public BookRequest(String name, String description, String isbn, String coverLink, Integer pages, Long categoryId) {
        this.name = name;
        this.description = description;
        this.isbn = isbn;
        this.coverLink = coverLink;
        this.pages = pages;
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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

    @Override
    public String toString() {
        return "BookRequest{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isbn='" + isbn + '\'' +
                ", coverLink='" + coverLink + '\'' +
                ", pages=" + pages +
                '}';
    }
}
