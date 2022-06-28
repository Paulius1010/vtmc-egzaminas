package lt.vtmc.egzaminas.payloads.requests;

public class CategoryUpdateRequest {
    private Long id;
    private String name;

    public CategoryUpdateRequest(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public CategoryUpdateRequest() {
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

    @Override
    public String toString() {
        return "CategoryUpdateRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
