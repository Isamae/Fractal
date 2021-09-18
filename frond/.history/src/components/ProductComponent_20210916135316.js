import React from "react";
import {useState} from 'react';
import ProductService from "../services/ProductService";

class ProductComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            products:[]
        }
    }
    
    componentDidMount(){
        ProductService.getProduct().then((response) =>{
            this.setState({products: response.data}) 
        });
    }

    render(){
        return (
            <div  class="container ">
                <div class="row ">
           
                   
                        
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4">
                            <button type="button" class="btn btn-primary">Create Product</button>
                        </div>
                </div>
                <div class="row">
                    <div class="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>

                                <tr>
                                    <td>No</td>
                                    <td>Name</td>
                                    <td>Category</td>
                                    <td>Preci</td>
                                    <td>Status</td>
                                    <td>Actions</td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product =>
                                        <tr key = {product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.product_category}</td>
                                            <td>{product.unit_price}</td>
                                            <td>{product.active}</td>
                                            <td>
                                                <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                                    
                                            </td>

                                        </tr>
                                            
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductComponent