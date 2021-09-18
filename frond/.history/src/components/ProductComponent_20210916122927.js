import React from "react";
import ProductService from "../services/ProductService";

class ProductComponent extends React.Component{
    constructor(){
        this.state ={
            users:[]
        }
    }
    componentDidMount(){
        ProductService.getProduct().then((response) =>{
            this.setState({users: response.data}) 
        });
    }
    render(){
        return (
            <div>
                <h1>  </h1>
            </div>
        )
    }
}

export default ProductComponent