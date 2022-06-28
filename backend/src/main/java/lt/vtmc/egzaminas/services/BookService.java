package lt.vtmc.egzaminas.services;

import lt.vtmc.egzaminas.models.Book;
import lt.vtmc.egzaminas.models.Category;
import lt.vtmc.egzaminas.payloads.requests.BookRequest;
import lt.vtmc.egzaminas.payloads.requests.BookUpdateRequest;
import lt.vtmc.egzaminas.payloads.responses.BookResponse;
import lt.vtmc.egzaminas.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryService categoryService;

    public BookService(BookRepository bookRepository, CategoryService categoryService) {
        this.bookRepository = bookRepository;
        this.categoryService = categoryService;
    }

    public Optional<Book> getBookById(Long bookId) {
        return bookRepository.findById(bookId);
    }

    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream().map(book -> new BookResponse(
                book.getId(),
                book.getName(),
                book.getDescription(),
                book.getIsbn(),
                book.getCoverLink(),
                book.getPages(),
                book.getCategory(),
                book.getBooked()
                )).collect(Collectors.toList());
    }


    public Book saveBook(BookRequest bookRequest) {
        Category category = categoryService.getCategoryById(bookRequest.getCategoryId());
        Book book = new Book(
                bookRequest.getName(),
                bookRequest.getDescription(),
                bookRequest.getIsbn(),
                bookRequest.getCoverLink(),
                bookRequest.getPages(),
                category
                );
        return bookRepository.save(book);
    }


    public Book updateBook(BookUpdateRequest bookUpdateRequest) {
        Category category = categoryService.getCategoryById(bookUpdateRequest.getCategoryId());
        Optional<Book> searchedBook = this.bookRepository.findById(bookUpdateRequest.getId());
        if (searchedBook.isPresent()) {
            Book book = searchedBook.get();
            book.setName(bookUpdateRequest.getName());
            book.setCategory(category);
            book.setDescription(book.getDescription());
            book.setCoverLink(bookUpdateRequest.getCoverLink());
            book.setIsbn(bookUpdateRequest.getIsbn());
            book.setPages(bookUpdateRequest.getPages());
            this.bookRepository.save(book);
            return book;
        } else {
            return null;
        }
    }

    public String deleteBook(Long bookId) {
        this.bookRepository.deleteById(bookId);
        return "deleted";
    }
}
