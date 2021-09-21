package com.example.back.models;

import java.time.LocalDate;
import java.util.Hashtable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "order")
public class OrderDTO {
	
	@Id
	private String _id;
	
	private int order_number;
	
	private status order_status;
	
	private LocalDate order_date;
	
	Hashtable<String, Double> taxes_amounts = new Hashtable<String, Double>();
	
	private double total_taxes = 0;
	
	private double total_amount = 0;
	
	private double sub_total = 0;
	
	private ConsumerDTO consumer = new ConsumerDTO();
	
	public OrderDTO() {
		taxes_amounts.put("City_Tax",0.0);
		taxes_amounts.put("Country_Tax",0.0);
		taxes_amounts.put("State_Tax",0.0);
		taxes_amounts.put("Federal_Tax",0.0);
		order_date = LocalDate.now();
		order_status = order_status.Pending;
	}
	
	Hashtable<String, Integer> itemsAmount = new Hashtable<String, Integer>();
	Hashtable<String, ProductDTO> itemsProduct = new Hashtable<String, ProductDTO>();
	
	public Hashtable<String, ProductDTO> getItemsProduct() {
		return itemsProduct;
	}
	
	public void setItemsProduct(Hashtable<String, ProductDTO> itemsProduct) {
		this.itemsProduct = itemsProduct;
	}
	
	public String get_id() {
		return _id;
	}
	
	public double getSub_total() {
		return sub_total;
	}
	
	public void setSub_total(double sub_total) {
		this.sub_total = sub_total;
	}
	
	public void set_id(String _id) {
		this._id = _id;
	}
	
	public void setItemsAmount(Hashtable<String, Integer> itemsAmount) {
		this.itemsAmount = itemsAmount;
	}
	
	public Hashtable<String, Integer> getItemsAmount() {
		return itemsAmount;
	}
	
	public void setOrder_date(LocalDate order_date) {
		this.order_date = order_date;
	}
	
	public LocalDate getOrder_date() {
		return order_date;
	}
	
	public void setOrder_number(int order_numer) {
		this.order_number = order_numer;
	}
	
	public int getOrder_number() {
		return order_number;
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
	
	public ConsumerDTO getConsumer() {
		return consumer;
	}
	
	public void setConsumer(ConsumerDTO consumer) {
		this.consumer = consumer;
	}
	
	public void setTaxes_amounts(Hashtable<String, Double> taxes_amounts) {
		this.taxes_amounts = taxes_amounts;
	}
	
	public Hashtable<String, Double> getTaxes_amounts() {
		return taxes_amounts;
	}
	
	public boolean addItem(String product,int amount) {
		try {
			this.itemsAmount.put(product, amount);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean deleteItem(String product) {
		try {
			this.itemsAmount.remove(product);
			return true;
		} catch (Exception e) {
			return false;
		}	
	}
	
	
}
