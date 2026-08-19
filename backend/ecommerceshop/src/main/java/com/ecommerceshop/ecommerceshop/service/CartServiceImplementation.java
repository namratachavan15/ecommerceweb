package com.ecommerceshop.ecommerceshop.service;


import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.CartRepository;
import com.ecommerceshop.ecommerceshop.request.AddItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private  ProductService productService;

    @Autowired
    private  UserService userService;

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public void clearCart(Long userId) {
        Cart cart = findUserCart(userId);
        if (cart != null) {
            cart.getCartItems().clear();
            cart.setTotalItem(0);
            cart.setTotalPrice(0);
            cart.setDiscount(0);
            cart.setTotalDiscountedPrice(0);
            cart.setAmount(0);
            cartRepository.save(cart);
        }
    }
    @Override
    public String addCartItem(
            Long userId,
            AddItemRequest req
    ) throws ProductException {

        Cart cart = cartRepository.findByUserId(userId);

        // Create cart if not exists
        if (cart == null) {

            User user;

            try {
                user = userService.findUserById(userId);
            } catch (UserException e) {
                throw new RuntimeException(e);
            }

            cart = new Cart();
            cart.setUser(user);

            cart = cartRepository.save(cart);
        }

        Product product =
                productService.findProductById(req.getProductId());

        // Empty size -> null
        String size = req.getSize();

        if (size != null && size.trim().isEmpty()) {
            size = null;
        }

        int requestedQuantity =
                req.getQuantity() > 0
                        ? req.getQuantity()
                        : 1;

        // ------------------------------------------------
        // CHECK EXISTING CART ITEM
        // ------------------------------------------------

        CartItem existingItem =
                cartItemService.isCartItemExist(
                        cart,
                        product,
                        size,
                        userId
                );

        // ------------------------------------------------
        // EXISTING ITEM
        // ------------------------------------------------

        if (existingItem != null) {

            int newQuantity =
                    existingItem.getQuantity()
                            + requestedQuantity;

            existingItem.setQuantity(newQuantity);

            existingItem.setPrice(
                    newQuantity * product.getPrice()
            );

            existingItem.setDiscountedPrice(
                    newQuantity * product.getDiscountedPrice()
            );

            cartItemService.createCartItem(existingItem);

            System.out.println(
                    "Existing cart item updated. " +
                            "Product: " + product.getTitle() +
                            ", Size: " + size +
                            ", Quantity: " + newQuantity
            );

            return "Item quantity updated";
        }

        // ------------------------------------------------
        // NEW ITEM
        // ------------------------------------------------

        CartItem cartItem = new CartItem();

        cartItem.setProduct(product);
        cartItem.setCart(cartItem == null ? null : cart);
        cartItem.setUserId(userId);
        cartItem.setSize(size);
        cartItem.setQuantity(requestedQuantity);

        cartItem.setPrice(
                requestedQuantity * product.getPrice()
        );

        cartItem.setDiscountedPrice(
                requestedQuantity * product.getDiscountedPrice()
        );

        CartItem createdCartItem =
                cartItemService.createCartItem(cartItem);

        cart.getCartItems().add(createdCartItem);

        cartRepository.save(cart);

        System.out.println(
                "NEW cart item created. " +
                        "Product: " + product.getTitle() +
                        ", Size: " + size +
                        ", Quantity: " + requestedQuantity
        );

        return "Item Add To Cart";
    }

    @Override
    public Cart findUserCart(Long userId) {

        System.out.println("user id in user cart: " + userId);

        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            return null;
        }

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {

            totalPrice += cartItem.getPrice();

            totalDiscountedPrice += cartItem.getDiscountedPrice();

            totalItem += cartItem.getQuantity();
        }

        // Actual discount amount
        int discount = totalPrice - totalDiscountedPrice;

        // Final payable amount
        int amount = totalDiscountedPrice;

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setDiscount(discount);
        cart.setAmount(amount);
        cart.setTotalItem(totalItem);

        System.out.println("Total Price: " + totalPrice);
        System.out.println("Total Discounted Price: " + totalDiscountedPrice);
        System.out.println("Discount: " + discount);
        System.out.println("Amount: " + amount);

        return cartRepository.save(cart);
    }
}
