package lt.vtmc.egzaminas.controllers;

import lt.vtmc.egzaminas.models.Category;
import lt.vtmc.egzaminas.payloads.requests.CategoryRequest;
import lt.vtmc.egzaminas.payloads.requests.CategoryUpdateRequest;
import lt.vtmc.egzaminas.payloads.responses.CategoryResponse;
import lt.vtmc.egzaminas.services.BookService;
import lt.vtmc.egzaminas.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/categories")
public class CategoryController {
    private final BookService bookService;
    private final CategoryService categoryService;

    public CategoryController(BookService bookService, CategoryService categoryService) {
        this.bookService = bookService;
        this.categoryService = categoryService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<CategoryResponse>> fetchAllCategories() {
        return ResponseEntity.ok().body(this.categoryService.getAllCategories());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Category> saveNewCategory(@RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok().body(this.categoryService.saveCategory(categoryRequest));
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryUpdateRequest categoryUpdateRequest) {
        return ResponseEntity.ok().body(this.categoryService.updateCategory(categoryUpdateRequest));
    }

    @DeleteMapping(value = "/{categoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok().body(this.categoryService.deleteCategory(categoryId));
    }
}
