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
                <h1> Product List </h1>
                <table>
                    <tr>
                        <td>No</td>
                        <td>Name</td>
                        <td>Category</td>
                        <td>Preci</td>
                        <td>Status</td>

                    </tr>
                </table>
            </div>
        )
    }
}

export default ProductComponent