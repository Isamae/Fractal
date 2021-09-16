package com.example.back.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.back.models.OrderDTO;


@Repository
public interface OrderDAO extends MongoRepository<OrderDTO, String> {
	
	
}

