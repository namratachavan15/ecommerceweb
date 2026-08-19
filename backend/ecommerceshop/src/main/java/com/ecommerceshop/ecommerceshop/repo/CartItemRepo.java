package com.ecommerceshop.ecommerceshop.repo;

import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

    @Query("""
        SELECT ci
        FROM CartItem ci
        WHERE ci.cart.id = :cartId
        AND ci.product.id = :productId
        AND ci.userId = :userId
        AND (
            (:size IS NULL AND ci.size IS NULL)
            OR
            (:size IS NOT NULL AND ci.size = :size)
        )
    """)
    CartItem isCartItemExist(
            @Param("cartId") Long cartId,
            @Param("productId") Long productId,
            @Param("size") String size,
            @Param("userId") Long userId
    );

    @Transactional
    void deleteByProduct(Product product);
}
