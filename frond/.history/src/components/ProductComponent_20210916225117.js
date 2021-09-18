import React,{useState} from "react";
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";
import _, { set } from "lodash";
import { Pagination } from "react-bootstrap";

class ProductComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            paginateProduct : [],
            pageCount:0,
            pages : 1,
            currentPage: 1,
            pageSize: 10
            
        }
    }

    componentDidMount(){
        this.getProducts();
        this.state.pageCount = this.state.products? Math.ceil(this.state.products.length)/this.state.pageSize: 0;
        if(this.state.pageCount!==1){
            this.state.pages = _.range(1,this.state.pageCount+1);
        }
        this.setpaginatedProduct(this.state.products, 0, 10);
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

    setpaginatedProduct(data,start, end){
        this.state.paginateProduct = data.slice(start,end);
    }

    pagination(pageNum){

    }

    
    render(){
        return (
            <div  className="container ">
                <div className="d-flex flex-row"><h1> Products</h1></div>
                <div className="d-flex flex-row-reverse ">
                <Link
                    to={"/products/product"}
                >
                    <button type="button" className="btn btn-primary">Create Product</button>
                </Link>
                    
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered text-center">
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
                                    this.state.paginateProduct.map(
                                        (product, index) =>
                                        <tr key = {product._id}>
                                            <td>{index+1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.product_category}</td>
                                            <td>{product.unit_price}</td>
                                            <td>{product.active}</td>
                                            <td>
                                                <a href="#" className="edit" title="Edit">Edit</a>
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