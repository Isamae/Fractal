package com.example.back.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.back.models.ConsumerDTO;

@Repository
public interface ConsumerDAO  extends MongoRepository<ConsumerDTO, String> {

}
