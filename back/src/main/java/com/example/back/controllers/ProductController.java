package com.example.back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.models.ProductDTO;
import com.example.back.repositories.ProductDAO;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductDAO repository;

	@PostMapping("/product")
	public ProductDTO create(@Validated @RequestBody ProductDTO p) {
		return repository.insert(p);
	}

	@GetMapping("/")
	public List<ProductDTO> readAll() {
		return repository.findAll();
	}
	
	@GetMapping("/productActive")
	public List<ProductDTO> readAllActive() {
		return repository.findProductByActive("Active");
	}

	@PutMapping("/product/{id}")
	public ProductDTO update(@PathVariable String id, @Validated @RequestBody ProductDTO p) {
		return repository.save(p);
	}
	
	@GetMapping("/product/dato/{id}")
	public ProductDTO get(@PathVariable String id) {
		return repository.findById(id).get();
	}
	
	@DeleteMapping("/product/{id}")
	public void delete(@PathVariable String id) {
		ProductDTO p = repository.findById(id).get();
		p.setActive("Inactive");
		repository.save(p);
	}
	
}