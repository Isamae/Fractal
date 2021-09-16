package com.example.back.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.back.models.ProductDTO;

@Repository
public interface ProductDAO extends MongoRepository<ProductDTO, String> {

}
