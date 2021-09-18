import React,{useState} from "react";
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";
import _ from "lodash";
import { Pagination } from "react-bootstrap";

class ProductComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            products:[],
            currentTutorial: null,
            currentIndex: -1,
            /*paginateProduct : [],
            pageCount:0,
            pages : 1,
            currentPage:1*/
            
        }
    }
    
    componentDidMount(){
        this.getProducts();
        const pageSize = 10;
        /*this.state.pageCount = this.state.products? Math.ceil(this.state.products.length)/pageSize: 0;
        if(this.state.pageCount!==1){
            this.state.pages = _.range(1,this.state.pageCount+1);
        }*/
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

    pagination(pageNum){
    }

    
    render(){
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
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
                                    this.state.products.map(
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
                        <nav className="d-flex justify-content-left">
                            <ul className="pagination">
                                {
                                    this.state.pages.map((page) => (
                                        <li 
                                            className={
                                                this.state.page== this.state.currentPage? "page-item active":"page-item"
                                            }
                                        >
                                            <p className="page-link"
                                            onClick={()=>this.pagination(this.state.page)}
                                            >{page} </p>
                                        </li>
                                    ))
                                }
                            </ul>
                            <ul className="list-group">
                                {tutorials &&
                                tutorials.map((tutorial, index) => (
                                    <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                    >
                                    {tutorial.title}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductComponent