import React from "react";
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
            <div>
                <h1> Product List </h1>
                <table className="table">
                    <thead>

                        <tr>
                            <td>No</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Preci</td>
                            <td>Status</td>
                            <td>
                                <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                            
                            </td>
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
                                    <td>{product._id}</td>

                                </tr>
                                    
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductComponent