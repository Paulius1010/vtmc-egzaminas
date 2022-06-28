package lt.vtmc.egzaminas.payloads.responses;

public class OrderResponse {

    private Long userId;
    private String userEmail;
    private String categoryName;
    private Long bookId;
    private String bookName;

    public OrderResponse(Long userId, String userEmail, String categoryName, Long bookId, String bookName) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.categoryName = categoryName;
        this.bookId = bookId;
        this.bookName = bookName;
    }

    public OrderResponse() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    @Override
    public String toString() {
        return "OrderResponse{" +
                "userId=" + userId +
                ", userEmail='" + userEmail + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", bookId=" + bookId +
                ", bookName='" + bookName + '\'' +
                '}';
    }
}
