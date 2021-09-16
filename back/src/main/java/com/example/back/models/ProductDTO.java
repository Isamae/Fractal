package com.example.back.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "product")
public class ProductDTO {
	
	@Id
	private String _id;
	
	private String name;
	
	private category product_category;
	
	private double unit_price;
	
	private boolean active;
	
	public void set_id(String _id) {
		this._id = _id;
	}
	
	public String get_id() {
		return _id;
	}
	
	public void setActive(boolean active) {
		this.active = active;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setProduct_category(category product_category) {
		this.product_category = product_category;
	}
	
	public category getProduct_category() {
		return product_category;
	}
	
	public void setUnit_price(double unit_price) {
		this.unit_price = unit_price;
	}
	
	public double getUnit_price() {
		return unit_price;
	}
}
