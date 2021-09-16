package com.example.back.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.back.models.ConsumerDTO;

public interface ConsumerDAO  extends MongoRepository<ConsumerDTO, String> {

}
