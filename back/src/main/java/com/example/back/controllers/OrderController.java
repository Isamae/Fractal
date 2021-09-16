package com.example.back.controllers;

import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

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

import com.example.back.models.OrderDTO;
import com.example.back.models.ProductDTO;
import com.example.back.repositories.OrderDAO;
import com.example.back.repositories.ProductDAO;


@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderDAO repository;
	private ProductDAO repositoryProductDAO;

	@PostMapping("/order")
	public OrderDTO create(@Validated @RequestBody OrderDTO o) {
		return repository.insert(o);
	}

	@GetMapping("/")
	public List<OrderDTO> readAll() {
		return repository.findAll();
	}

	@PutMapping("/order/{id}")
	public OrderDTO update(@PathVariable String id, @Validated @RequestBody OrderDTO o) {
		return repository.save(o);
	}
	
	@PostMapping("/order/{id}/item")
	public OrderDTO create(@PathVariable String id,@RequestBody Map<String, String> item) {
		
		OrderDTO orderDTO = repository.findById(id).get();
		ProductDTO productDTO = repositoryProductDAO.findById(item.get("id")).get();
		orderDTO.addItem(productDTO, Integer.parseInt(item.get("amount") ));
		
		double total_taxes=0;
		double total_amount=0;
		double sub_total=0;
		
		Dictionary<String, Integer> taxes = orderDTO.getTaxes_amounts();
		Hashtable<ProductDTO, Integer> products = orderDTO.getItems();
		
		for(ProductDTO product:products.keySet()) {
			sub_total = sub_total +product.getUnit_price()*products.get(product);
		}
		total_taxes = total_taxes + sub_total*taxes.get("City_Tax")/100;
		sub_total = sub_total*taxes.get("City_Tax")/100 +sub_total;
		total_taxes = total_taxes + sub_total*taxes.get("Country_Tax")/100;
		sub_total = sub_total*taxes.get("Country_Tax")/100 +sub_total;
		total_taxes = total_taxes + sub_total*taxes.get("State_Tax")/100;
		sub_total = sub_total*taxes.get("State_Tax")/100 +sub_total;
		total_taxes = total_taxes + sub_total*taxes.get("Federal_Tax")/100;
		sub_total = sub_total*taxes.get("Federal_Tax")/100 +sub_total;
		total_amount = sub_total; 
		orderDTO.setTotal_amount(total_amount);
		orderDTO.setTotal_taxes(total_taxes);
		
		return repository.save(orderDTO);
	}
	
	@DeleteMapping("/order/{id}/item")
	public OrderDTO delete(@PathVariable String id,@RequestBody Map<String, String> item) {
		
		OrderDTO orderDTO = repository.findById(id).get();
		ProductDTO productDTO = repositoryProductDAO.findById(item.get("id")).get();
		orderDTO.deleteItem(productDTO);
		
		double total_taxes=0;
		double total_amount=0;
		double sub_total=0;
		
		Dictionary<String, Integer> taxes = orderDTO.getTaxes_amounts();
		Hashtable<ProductDTO, Integer> products = orderDTO.getItems();
		
		for(ProductDTO product:products.keySet()) {
			sub_total = sub_total +product.getUnit_price()*products.get(product);
		}
		total_taxes = total_taxes + sub_total*taxes.get("City_Tax")/100;
		sub_total = sub_total*taxes.get("City_Tax")/100 +sub_total;
		total_taxes = total_taxes + sub_total*taxes.get("Country_Tax")/100;
		sub_total = sub_total*taxes.get("Country_Tax")/100 +sub_total;
		total_taxes = total_taxes + sub_total*taxes.get("State_Tax")/100;
		sub_total = sub_total*taxes.get("State_Tax")/100 +sub_total;
		total_taxes = total_taxes + sub_total*taxes.get("Federal_Tax")/100;
		sub_total = sub_total*taxes.get("Federal_Tax")/100 +sub_total;
		total_amount = sub_total; 
		orderDTO.setTotal_amount(total_amount);
		orderDTO.setTotal_taxes(total_taxes);
		
		return repository.save(orderDTO);
	}
	
	@DeleteMapping("/order/{id}")
	public void delete(@PathVariable String id) {
		repository.deleteById(id);
	}
		
	
}
