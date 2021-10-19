package com.example.back.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.models.ConsumerDTO;
import com.example.back.repositories.ConsumerDAO;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/api/consumers")
public class ConsumerController {

	@Autowired
	private ConsumerDAO repository;

	@PostMapping("/consumer")
	public ConsumerDTO create(@Validated @RequestBody ConsumerDTO p) {
		return repository.insert(p);
	}

	@GetMapping("/consumer/dato/{id}")
	public ConsumerDTO get(@PathVariable String id) {
		return repository.findById(id).get();
	}
	
	@GetMapping("/")
	public List<ConsumerDTO> getAll() {
		return repository.findAll();
	}

}