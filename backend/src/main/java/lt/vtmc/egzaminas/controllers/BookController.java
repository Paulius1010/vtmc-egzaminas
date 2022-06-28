package lt.vtmc.egzaminas.controllers;

import lt.vtmc.egzaminas.models.Book;
import lt.vtmc.egzaminas.payloads.requests.BookRequest;
import lt.vtmc.egzaminas.payloads.requests.BookUpdateRequest;
import lt.vtmc.egzaminas.payloads.responses.CategoryResponse;
import lt.vtmc.egzaminas.services.BookService;
import lt.vtmc.egzaminas.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/books")
public class BookController {
    private final BookService bookService;
    private final CategoryService categoryService;

    public BookController(BookService bookService, CategoryService categoryService) {
        this.bookService = bookService;
        this.categoryService = categoryService;
    }


    @GetMapping(value = "/all")
    public ResponseEntity<List<CategoryResponse>> fetchAllCategories() {
        return ResponseEntity.ok().body(this.categoryService.getAllCategories());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Book> saveNewBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok().body(this.bookService.saveBook(bookRequest));
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Book> updateBook(@RequestBody BookUpdateRequest bookUpdateRequest) {
        return ResponseEntity.ok().body(this.bookService.updateBook(bookUpdateRequest));
    }

    @DeleteMapping(value = "/{categoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId) {
        return ResponseEntity.ok().body(this.bookService.deleteBook(bookId));
    }

}
