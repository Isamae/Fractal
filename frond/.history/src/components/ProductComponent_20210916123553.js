import React from "react";
import ProductService from "../services/ProductService";

class ProductComponent extends React.Component{
    constructor(){
        this.state ={
            product:[]
        }
    }
    componentDidMount(){
        ProductService.getProduct().then((response) =>{
            this.setState({product: response.data}) 
        });
    }
    render(){
        return (
            <div>
                <h1> Product List </h1>
                <table>
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
                            this.state.product.map(
                                user
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductComponent