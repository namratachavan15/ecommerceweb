package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.Order;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    public Product createProduct(CreateProductRequest req) throws Exception;
    public String deleteProduct(Long productId)throws ProductException;
    public Product updateProduct(Long productId,Product product)throws ProductException;

    public Product findProductById(Long productId)throws ProductException;

    public List<Product> searchProduct(String query)throws ProductException;
    public List<Product> findProductByCategory(String category)throws ProductException;

    public Page<Product> getAllProduct(String category,List<String> colors,List<String> sizes,Integer minPrice,Integer maxPrice,Integer minDiscount,String sort,String stock,Integer pageNumber,Integer pageSize)throws ProductException;

    public List<Product> findAllProduct()throws ProductException;
    void reduceStock(Order order) throws ProductException;
    List<Product> searchProductsForNavbar(String query) throws ProductException;
}
