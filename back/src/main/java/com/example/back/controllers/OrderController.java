package com.example.back.controllers;

import java.io.Console;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.MongoSimpleTypes;
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

import com.example.back.models.ConsumerDTO;
import com.example.back.models.OrderDTO;
import com.example.back.models.ProductDTO;
import com.example.back.models.status;
import com.example.back.repositories.OrderDAO;
import com.example.back.repositories.ProductDAO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderDAO repository;
	@Resource
	private ProductDAO repositoryProductDAO;

	@PostMapping("/order")
	public OrderDTO create(@Validated @RequestBody String json) {
	
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
			
			JsonNode jsonNode = objectMapper.readTree(json);
			OrderDTO orderDTO = new OrderDTO();
			ConsumerDTO consumerDTO = new ConsumerDTO();
			
			consumerDTO.set_id(jsonNode.get("consumer").get("_id").asText());
			consumerDTO.setName(jsonNode.get("consumer").get("name").asText());
			
			orderDTO.setConsumer(consumerDTO);
			orderDTO.setOrder_number(jsonNode.get("order_number").asInt());
			orderDTO.setOrder_status(status.valueOf(jsonNode.get("order_status").asText()));
			
			return repository.insert(orderDTO);
			
		} catch (JsonProcessingException e) {
			return null;
		}
	}

	@GetMapping("/")
	public List<OrderDTO> readAll() {
		System.out.println(repository.findAll());
		return repository.findAll();
		
	}
	
	@GetMapping("/order/dato/{id}")
	public OrderDTO get(@PathVariable String id) {
		return repository.findById(id).get();
	}

	@PutMapping("/order/{id}")
	public OrderDTO update(@PathVariable String id, @Validated @RequestBody OrderDTO o) {
		return repository.save(o);
	}
	
	@PostMapping("/order/{id}/item")
	public OrderDTO create(@PathVariable String id,@RequestBody Map<String, String> item) {
		
		System.out.println(item);
		OrderDTO orderDTO = repository.findById(id).get();
		
		ProductDTO productDTO = repositoryProductDAO.findById(item.get("_id")).get();
		orderDTO.getItemsProduct().put(item.get("_id"), productDTO);
		
		if(orderDTO.getItems().contains(item.get("_id"))) {
			orderDTO.getItems().put(item.get("_id"),orderDTO.getItems().get("_id") + Integer.parseInt(item.get("amount")));
		}
		else {
			orderDTO.getItems().put(item.get("_id"), Integer.parseInt(item.get("amount")));
		}
		
		OrderDTO updateOrder = this.setTaxes(orderDTO);
		return repository.save(updateOrder);

	}
	
	@PostMapping("/order/{id}/deleteItem")
	public OrderDTO deleteItemOrder(@PathVariable String id,@Validated @RequestBody Map<String, String> item) {
		
		System.out.println(item);
		OrderDTO orderDTO = repository.findById(id).get();
		orderDTO.getItemsProduct().remove(item.get("id"));
		orderDTO.getItems().remove(item.get("id"));
		OrderDTO updateOrder = this.setTaxes(orderDTO);
		
		return repository.save(updateOrder);
	}
	
	@DeleteMapping("/order/{id}")
	public void delete(@PathVariable String id) {
		repository.deleteById(id);
	}
	
	
	public OrderDTO setTaxes(OrderDTO orderDTO) {
		
		double total_taxes = 0;
		double sub_total = 0;
		
		System.out.println("Si entra a la conversión");
		Hashtable<String, Integer> products = orderDTO.getItems();
		for(String product:products.keySet()) {
			ProductDTO productDTO = repositoryProductDAO.findById(product).get();
			sub_total = sub_total + productDTO.getUnit_price()*products.get(product);
		}
		
		System.out.println("Si entra a la conversión2"+sub_total);
		
		orderDTO.setSub_total( roundAvoid(sub_total, 2));
		
		orderDTO.getTaxes_amounts().put("City_Tax", roundAvoid(sub_total*10/100, 2));
		sub_total = sub_total + orderDTO.getTaxes_amounts().get("City_Tax");
		
		orderDTO.getTaxes_amounts().put("Country_Tax", roundAvoid(sub_total*5/100, 2));
		sub_total = sub_total+ orderDTO.getTaxes_amounts().get("Country_Tax");
		
		orderDTO.getTaxes_amounts().put("State_Tax", roundAvoid(sub_total*8/100, 2));
		sub_total = sub_total+ orderDTO.getTaxes_amounts().get("State_Tax");
		
		orderDTO.getTaxes_amounts().put("Federal_Tax", roundAvoid(sub_total*2/100, 2));
		sub_total = sub_total + orderDTO.getTaxes_amounts().get("Federal_Tax");
		

		total_taxes = orderDTO.getTaxes_amounts().get("City_Tax")+
				 orderDTO.getTaxes_amounts().get("Country_Tax") +
				 orderDTO.getTaxes_amounts().get("State_Tax") +
				 orderDTO.getTaxes_amounts().get("Federal_Tax");
		
		System.out.println("Si entra a la conversión 3");
		orderDTO.setTotal_amount(roundAvoid(sub_total, 2));
		orderDTO.setTotal_taxes(roundAvoid(total_taxes, 2));
		System.out.println("Si entra a la conversión 4");
		
		return orderDTO;
	}
	
	public static double roundAvoid(double value, int places) {
		
	    double scale = Math.pow(10, places);
	    return Math.round(value * scale) / scale;
	    
	}
	
		
	
}
