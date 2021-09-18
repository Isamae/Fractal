import React from "react";
import ProductService from "../services/ProductService";

class ProductComponent extends React.Component{
    constructor(){
        this.state ={
            users:[]
        }
    }
    componentDidMount(){
        ProductService.getProduct();
    }
    render(){
        return (
            <div>

            </div>
        )
    }
}

export default ProductComponent