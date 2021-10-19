package com.example.back.controllers;


import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Random;

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

import com.example.back.models.ConsumerDTO;
import com.example.back.models.OrderDTO;
import com.example.back.models.ProductDTO;
import com.example.back.models.status;
import com.example.back.repositories.ConsumerDAO;
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
	@Autowired
	private ProductDAO repositoryProductDAO;
	
	@Autowired
	private ConsumerDAO consumerDAO;

	@PostMapping("/order")
	public OrderDTO create(@Validated @RequestBody String json) {
	
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
			
			JsonNode jsonNode = objectMapper.readTree(json);
			OrderDTO orderDTO = new OrderDTO();
			ConsumerDTO consumerDTO = consumerDAO.findById(jsonNode.get("consumer").get("_id").asText()).get();
			
			orderDTO.setConsumer(consumerDTO);
			orderDTO.setOrder_number(Integer.parseInt(generateRandomNum(9)));
			orderDTO.setOrder_status(status.Pending);
			
			return repository.insert(orderDTO);
			
		} catch (JsonProcessingException e) {
			return null;
		}
	}

	@GetMapping("/")
	public List<OrderDTO> readAll() {
		
		return repository.findAll();
		
	}
	
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/order/dato/{id}")
	public OrderDTO get(@PathVariable String id) {
		return repository.findById(id).get();
	}

	@PutMapping("/order/{id}")
	public OrderDTO update(@PathVariable String id, @Validated @RequestBody OrderDTO o) {
		o.setOrder_status(status.Completed);
		return repository.save(o);
	}
	
	@PostMapping("/order/{id}/item")
	public OrderDTO create(@PathVariable String id,@RequestBody Map<String, String> item) {
		
		OrderDTO orderDTO = repository.findById(id).get();
		
		ProductDTO productDTO = repositoryProductDAO.findById(item.get("_id")).get();
		orderDTO.getItemsProduct().put(item.get("_id"), productDTO);
		
		if(orderDTO.getItemsAmount().containsKey(item.get("_id")) ) {
			
			int prev_amount = orderDTO.getItemsAmount().get(item.get("_id")) ;
			orderDTO.getItemsAmount().put(item.get("_id"),prev_amount + Integer.parseInt(item.get("amount")));
		}
		else {
			orderDTO.getItemsAmount().put(item.get("_id"), Integer.parseInt(item.get("amount")));
		}
		
		return repository.save(this.setTaxes(orderDTO));

	}
	
	@PostMapping("/order/{id}/deleteItem")
	public OrderDTO deleteItemOrder(@PathVariable String id,@Validated @RequestBody Map<String, String> item) {
		
		OrderDTO orderDTO = repository.findById(id).get();
		orderDTO.getItemsProduct().remove(item.get("id"));
		orderDTO.getItemsAmount().remove(item.get("id"));
		OrderDTO updateOrder = this.setTaxes(orderDTO);
		
		return repository.save(updateOrder);
	
	}
	
	@DeleteMapping("/order/{id}")
	public void delete(@PathVariable String id) {
		OrderDTO orderDTO = repository.findById(id).get();
		orderDTO.setOrder_status(status.Completed);
		repository.save(orderDTO);
	}
	
	@PostMapping("/order/{id}/editItem")
	public OrderDTO editItem(@PathVariable String id,@RequestBody Map<String, String> item) {
		OrderDTO orderDTO = repository.findById(id).get();
		orderDTO.getItemsAmount().put(item.get("_id"), Integer.parseInt(item.get("amount")));
		OrderDTO updateOrder = this.setTaxes(orderDTO);
		
		return repository.save(updateOrder);

	}
	
	public OrderDTO setTaxes(OrderDTO orderDTO) {
		
		double total_taxes = 0;
		double sub_total = 0;
	
		Hashtable<String, Integer> products = orderDTO.getItemsAmount();
		for(String product:products.keySet()) {
			ProductDTO productDTO = repositoryProductDAO.findById(product).get();
			sub_total = sub_total + productDTO.getUnit_price()*products.get(product);
		}
		
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
		
		orderDTO.setTotal_amount(roundAvoid(sub_total, 2));
		orderDTO.setTotal_taxes(roundAvoid(total_taxes, 2));
		
		return orderDTO;
	}
	
	public static double roundAvoid(double value, int places) {
		
	    double scale = Math.pow(10, places);
	    return Math.round(value * scale) / scale;
	    
	}
	
	public static String generateRandomNum(int len) {
		String chars = "0123456789";
		Random rnd = new Random();
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++)
			sb.append(chars.charAt(rnd.nextInt(chars.length())));
		return sb.toString();
	}	
	
}
