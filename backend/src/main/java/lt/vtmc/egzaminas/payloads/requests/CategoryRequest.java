package lt.vtmc.egzaminas.payloads.requests;

public class CategoryRequest {
    private String name;

    public CategoryRequest(String name) {
        this.name = name;
    }

    public CategoryRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CategoryRequest{" +
                "name='" + name + '\'' +
                '}';
    }
}
