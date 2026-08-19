package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.*;
import com.ecommerceshop.ecommerceshop.repo.*;
import com.ecommerceshop.ecommerceshop.request.CreateProductRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImplemetation implements ProductService{

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private OrderItemRepo orderItemRepository;

    @Autowired
    private CartItemRepo cartItemRepository;

    @Autowired
    private OrderRepo orderRepo;

    @Override

    public Product createProduct(CreateProductRequest req) throws Exception {

        Category topLevel = categoryRepo.findByName(req.getTopLevelCategory());
        if (topLevel == null) {
            Category topCategory = new Category();
            topCategory.setName(req.getTopLevelCategory());
            topCategory.setLevel(1);
            topLevel = categoryRepo.save(topCategory);
        }

        Category secondLevel = categoryRepo.findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());
        if (secondLevel == null) {
            Category secondLavelCategory = new Category();
            secondLavelCategory.setName(req.getSecondLevelCategory());
            secondLavelCategory.setParentCategory(topLevel);
            secondLavelCategory.setLevel(2);
            secondLevel = categoryRepo.save(secondLavelCategory);
        }

        Category thirdLevel = categoryRepo.findByNameAndParent(req.getThirdLevelCategory(), secondLevel.getName());
        if (thirdLevel == null) {
            Category thirdLavelCategory = new Category();
            thirdLavelCategory.setName(req.getThirdLevelCategory());
            thirdLavelCategory.setParentCategory(secondLevel);
            thirdLavelCategory.setLevel(3);
            thirdLevel = categoryRepo.save(thirdLavelCategory);
        }

        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setColor(req.getColor());
        product.setPrice(req.getPrice());
        if (req.getPrice() < 0) {
            throw new Exception("Price cannot be negative");
        }

        if (req.getDiscountPercent() < 0 || req.getDiscountPercent() > 100) {
            throw new ProductException("Discount must be between 0 and 100");
        }
        product.setDiscountPercent(req.getDiscountPercent());

        int discountedPrice = req.getPrice()
                - (req.getPrice() * req.getDiscountPercent() / 100);

        product.setDiscountedPrice(discountedPrice);
        product.setImageUrl(req.getImageUrl());
        product.setBrand(req.getBrand());

        int totalQuantity;

        if (req.getSizes() != null && !req.getSizes().isEmpty()) {

            totalQuantity = req.getSizes()
                    .stream()
                    .mapToInt(Size::getQuantity)
                    .sum();

            product.setSizes(req.getSizes());

        } else {

            totalQuantity = req.getQuantity();

            product.setSizes(new HashSet<>());
        }

        product.setQuantity(totalQuantity);

        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());
        product.setHighlights(req.getHighlights());

        Product savedProduct = productRepo.save(product);
        return savedProduct;
    }


    @Override
    public String deleteProduct(Long productId) throws ProductException {

        Product product = findProductById(productId);

        // Delete CartItems referencing this product
        cartItemRepository.deleteByProduct(product);

        // Clear sizes (if needed)
        product.getSizes().clear();

        // Finally delete product
        productRepo.delete(product);

        return "Product deleted successfully";
    }






//    @Override
//    public String deleteProduct(Long productId) throws ProductException {
//        Product product = findProductById(productId);
//        if (product == null) {
//            throw new ProductException("Product not found");
//        }
//
//        product.setDeleted(true);
//        productRepo.save(product); // Soft delete
//        return "Product marked as deleted";
//    }




    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);

        // ✅ Basic fields
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setDiscountPercent(req.getDiscountPercent());
        product.setQuantity(req.getQuantity());
        product.setBrand(req.getBrand());
        product.setColor(req.getColor());
        product.setImageUrl(req.getImageUrl());

        // ✅ Handle Sizes – update existing or add new
        if (req.getSizes() != null && !req.getSizes().isEmpty()) {
            Set<Size> existingSizes = product.getSizes();

            // Map existing sizes by name for quick lookup
            Map<String, Size> sizeMap = existingSizes.stream()
                    .collect(Collectors.toMap(Size::getName, s -> s));

            for (Size newSize : req.getSizes()) {
                Size existing = sizeMap.get(newSize.getName());
                if (existing != null) {
                    // Update existing quantity
                    existing.setQuantity(newSize.getQuantity());
                } else {
                    // Add new size
                    existingSizes.add(new Size(newSize.getName(), newSize.getQuantity()));
                }
            }

            // Remove any size that is not present in request
            existingSizes.removeIf(old -> req.getSizes().stream()
                    .noneMatch(s -> s.getName().equals(old.getName())));

            product.setSizes(existingSizes);
        }
        if (product.getSizes() != null && !product.getSizes().isEmpty()) {

            int totalQuantity = product.getSizes()
                    .stream()
                    .mapToInt(Size::getQuantity)
                    .sum();

            product.setQuantity(totalQuantity);

        } else {

            product.setQuantity(req.getQuantity());
        }

        // ✅ Handle Highlights
        if (req.getHighlights() != null) {
            product.setHighlights(req.getHighlights());
        }

        return productRepo.save(product);
    }



    @Override
    public Product findProductById(Long productId) throws ProductException {

        Optional<Product> opt=productRepo.findById(productId);
        if(opt.isPresent())
        {
            return opt.get();
        }
        throw new ProductException("Product not found");

    }

    public List<Product> searchProduct(String query) {
        return productRepo.findByTitleContainingIgnoreCaseOrBrandContainingIgnoreCaseOrCategory_NameContainingIgnoreCase(
                        query, query, query
                );

    }

    @Override
    public List<Product> findProductByCategory(String category) throws ProductException {
        return List.of();
    }

    @Override
    public Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes,
                                       Integer minPrice, Integer maxPrice, Integer minDiscount,
                                       String sort, String stock, Integer pageNumber, Integer pageSize)
            throws ProductException {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<Product> products = productRepo.filterProducts(category, minPrice, maxPrice, minDiscount, sort);

        if (!colors.isEmpty()) {
            products = products.stream()
                    .filter(p -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor())))
                    .collect(Collectors.toList());
        }

        if (stock != null && !stock.isEmpty()) {
            if (stock.equals("in_stock")) {
                products = products.stream().filter(p -> p.getQuantity() > 0).collect(Collectors.toList());
            } else if (stock.equals("out_stock")) {
                products = products.stream().filter(p -> p.getQuantity() < 1).collect(Collectors.toList());
            }
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        List<Product> pageContent = products.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent, pageable, products.size());
    }

    @Override
    public List<Product> findAllProduct() throws ProductException {
        List<Product> products = productRepo.findAll();
        if (products.isEmpty()) {
            throw new ProductException("No products found.");
        }
        return products;
    }

    @Override
    @Transactional
    public void reduceStock(Order order) throws ProductException {

        if (order == null) {
            throw new ProductException("Invalid order");
        }

        // VERY IMPORTANT
        // Stock already reduced for this order
        if (Boolean.TRUE.equals(order.getStockReduced())) {
            System.out.println(
                    "⚠️ STOCK ALREADY REDUCED FOR ORDER: " + order.getId()
            );
            return;
        }

        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new ProductException("Order has no items");
        }

        for (OrderItem orderItem : order.getOrderItems()) {

            Product product = orderItem.getProduct();

            if (product == null) {
                throw new ProductException(
                        "Product not found for order item: " + orderItem.getId()
                );
            }

            int orderedQuantity = orderItem.getQuantity();
            String selectedSize = orderItem.getSize();

            if (orderedQuantity <= 0) {
                throw new ProductException(
                        "Invalid quantity for product: " + product.getTitle()
                );
            }

            System.out.println("=================================");
            System.out.println("REDUCING STOCK");
            System.out.println("Product       : " + product.getTitle());
            System.out.println("OrderItem ID  : " + orderItem.getId());
            System.out.println("Selected Size : " + selectedSize);
            System.out.println("Order Qty     : " + orderedQuantity);
            System.out.println("Before Total  : " + product.getQuantity());
            System.out.println("=================================");

            // SIZE PRODUCT
            if (selectedSize != null
                    && !selectedSize.trim().isEmpty()
                    && product.getSizes() != null
                    && !product.getSizes().isEmpty()) {

                Size selectedSizeObject = product.getSizes()
                        .stream()
                        .filter(size ->
                                size.getName().equalsIgnoreCase(
                                        selectedSize.trim()
                                ))
                        .findFirst()
                        .orElse(null);

                if (selectedSizeObject == null) {
                    throw new ProductException(
                            "Size " + selectedSize +
                                    " not found for product " +
                                    product.getTitle()
                    );
                }

                if (selectedSizeObject.getQuantity() < orderedQuantity) {
                    throw new ProductException(
                            "Insufficient stock for " +
                                    product.getTitle() +
                                    ", Size: " + selectedSize +
                                    ", Available: " +
                                    selectedSizeObject.getQuantity() +
                                    ", Requested: " +
                                    orderedQuantity
                    );
                }

                selectedSizeObject.setQuantity(
                        selectedSizeObject.getQuantity() - orderedQuantity
                );

                int totalQuantity = product.getSizes()
                        .stream()
                        .mapToInt(Size::getQuantity)
                        .sum();

                product.setQuantity(totalQuantity);

            }

            // WITHOUT SIZE
            else {

                if (product.getQuantity() < orderedQuantity) {
                    throw new ProductException(
                            "Insufficient stock for product: " +
                                    product.getTitle() +
                                    ", Available: " +
                                    product.getQuantity() +
                                    ", Requested: " +
                                    orderedQuantity
                    );
                }

                product.setQuantity(
                        product.getQuantity() - orderedQuantity
                );
            }

            productRepo.save(product);

            System.out.println("=================================");
            System.out.println("AFTER STOCK REDUCTION");
            System.out.println("Product      : " + product.getTitle());
            System.out.println("After Total  : " + product.getQuantity());
            System.out.println("=================================");
        }

        // Mark only after all items are successfully reduced
        order.setStockReduced(true);
        orderRepo.save(order);

        System.out.println(
                "✅ STOCK REDUCED SUCCESSFULLY FOR ORDER: "
                        + order.getId()
        );
    }

    public List<Product> searchProductsForNavbar(String query) throws ProductException {

        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }

        return productRepo.searchProductsForNavbar(query.trim());
    }

}
