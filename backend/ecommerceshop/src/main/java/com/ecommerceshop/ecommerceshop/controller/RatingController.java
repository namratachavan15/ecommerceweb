package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Rating;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.request.RatingRequest;
import com.ecommerceshop.ecommerceshop.response.RatingResponse;
import com.ecommerceshop.ecommerceshop.service.RatingService;
import com.ecommerceshop.ecommerceshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(
            @RequestBody RatingRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProductException {

        User user = userService.findUserProfileByJwt(jwt);

        Rating rating = ratingService.createRating(req, user);

        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<RatingResponse>> getProductRating(
            @PathVariable Long productId
    ) {

        List<Rating> ratings =
                ratingService.getProductsRating(productId);

        List<RatingResponse> response = ratings.stream()
                .map(rating -> new RatingResponse(
                        rating.getId(),
                        rating.getUser().getId(),
                        rating.getRating(),
                        rating.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}