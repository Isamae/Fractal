package com.example.back.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.back.models.ProductDTO;

@Repository
public interface ProductDAO extends MongoRepository<ProductDTO, String> {
	
	@Query("{active : ?0}")
    List<ProductDTO> findProductByActive(String active);
	
}
