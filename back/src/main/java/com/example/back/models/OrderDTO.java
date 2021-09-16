package com.example.back.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.Hashtable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "order")
public class OrderDTO {
	
	@Id
	private String _id;
	
	private int order_numer;
	
	private status order_status;
	
	private LocalDate order_date;
	
	Dictionary<String, Integer> taxes_amounts = new Hashtable<String, Integer>();
	
	private double total_taxes;
	
	private double total_amount;
	
	private ConsumerDTO consumer;
	
	public OrderDTO() {
		taxes_amounts.put("City_Tax",10);
		taxes_amounts.put("Country_Tax",5);
		taxes_amounts.put("State_Tax",8);
		taxes_amounts.put("Federal_Tax",2);
		order_date = LocalDate.now();
		order_status = order_status.Pending;
	}
	
	Hashtable<ProductDTO, Integer> items = new Hashtable<ProductDTO, Integer>();
	
	public String get_id() {
		return _id;
	}
	
	public void set_id(String _id) {
		this._id = _id;
	}
	
	public Hashtable<ProductDTO, Integer> getItems() {
		return items;
	}
	
	public void setItems(Hashtable<ProductDTO, Integer> items) {
		this.items = items;
	}
	
	public void setOrder_date(LocalDate order_date) {
		this.order_date = order_date;
	}
	
	public LocalDate getOrder_date() {
		return order_date;
	}
	
	public void setOrder_numer(int order_numer) {
		this.order_numer = order_numer;
	}
	
	public int getOrder_numer() {
		return order_numer;
	}
	
	public void setOrder_status(status order_status) {
		this.order_status = order_status;
	}
	
	public status getOrder_status() {
		return order_status;
	}
	
	public void setTotal_amount(double total_amount) {
		this.total_amount = total_amount;
	}
	
	public double getTotal_amount() {
		return total_amount;
	}
	
	public void setTotal_taxes(double total_taxes) {
		this.total_taxes = total_taxes;
	}
	
	public double getTotal_taxes() {
		return total_taxes;
	}
	
	public void setConsumer(ConsumerDTO consumer) {
		this.consumer = consumer;
	}
	
	public ConsumerDTO getConsumer() {
		return consumer;
	}
	
	public void setTaxes_amounts(Dictionary<String, Integer> taxes_amounts) {
		this.taxes_amounts = taxes_amounts;
	}
	
	public Dictionary<String, Integer> getTaxes_amounts() {
		return taxes_amounts;
	}
	
	public boolean addItem(ProductDTO product,int amount) {
		try {
			this.items.put(product, amount);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean deleteItem(ProductDTO product) {
		try {
			this.items.remove(product);
			return true;
		} catch (Exception e) {
			return false;
		}	
	}
	
	
}
