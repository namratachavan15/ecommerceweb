package com.ecommerceshop.ecommerceshop.response;

import java.time.LocalDateTime;

public class RatingResponse {

    private Long id;
    private Long userId;
    private double rating;
    private LocalDateTime createdAt;

    public RatingResponse() {
    }

    public RatingResponse(Long id, Long userId, double rating, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.rating = rating;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}