import React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";
import AddProductComponent from "./AddProductComponent";

class ProductComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            products:[]
        }
    }
    
    componentDidMount(){
        this.getProducts();
    }

    getProducts(){
        Routes.getAllProducts().then(
            response => {
                this.setState({products: response.data}) 
            }
        ).catch(e => {
            console.log(e);
        });
    }

    render(){
        return (
            <div  class="container ">
                <div class="d-flex flex-row"><h1> Products</h1></div>
                <div class="d-flex flex-row-reverse ">
                    <Link to={"/products/product"} className="nav-link">
                          Orders
                    </Link>
                    <button type="button" class="btn btn-primary">Create Product</button>
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
                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/products/product" component={AddProductComponent} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ProductComponent