package lt.vtmc.egzaminas.services;

import lt.vtmc.egzaminas.models.Category;
import lt.vtmc.egzaminas.payloads.requests.CategoryRequest;
import lt.vtmc.egzaminas.payloads.requests.CategoryUpdateRequest;
import lt.vtmc.egzaminas.payloads.responses.CategoryResponse;
import lt.vtmc.egzaminas.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(category -> new CategoryResponse(category.getId(), category.getName())).collect(Collectors.toList());
    }


    public Category saveCategory(CategoryRequest categoryRequest) {
        Category category = new Category(categoryRequest.getName());
        return categoryRepository.save(category);
    }


    public Category updateCategory(CategoryUpdateRequest categoryUpdateRequest) {
        Optional<Category> category = this.categoryRepository.findById(categoryUpdateRequest.getId());
        if (category.isPresent()) {
            category.get().setName(categoryUpdateRequest.getName());
            this.categoryRepository.save(category.get());
            return category.get();
        } else {
            return null;
        }
    }

    public String deleteCategory(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
        return "deleted";
    }

    public Category getCategoryById(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            return category.get();
        } else {
            return null;
        }
    }
}
