package com.example.back.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "consumer")
public class ConsumerDTO {
	
	@Id
	private String _id;
	
	private String name;
	
}
