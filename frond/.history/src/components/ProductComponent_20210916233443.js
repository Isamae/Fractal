import React from "react";
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";
import _ from "lodash";

class ProductComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            paginateProduct : [],
            pageCount:0,
            pages : [1],
            currentPage: 1,
            pageSize: 2
            
        }
    }

    componentDidMount(){
        this.setProducts();
        
    }
    
    setProducts(){
        Routes.getAllProducts().then(
            response => {
                this.setState({products: response.data}) ;
                this.state.pageCount = this.state.products? Math.ceil(this.state.products.length)/this.state.pageSize: 0;
                if(this.state.pageCount!==1){
                    this.state.pages = _.range(1,this.state.pageCount+1);
                }
                this.setpaginatedProduct(this.state.products, 0);
                this.setCurrentPage(1);
            }
        ).catch(e => {
            console.log(e);
        });
    }

    setpaginatedProduct(data,start){
        this.setState({paginateProduct: _(data).slice(start).take(this.state.pageSize).value() });

    }

    pagination(pageNum){
        this.setCurrentPage(pageNum);
        const startIndex =(pageNum-1)*this.state.pageSize;
        this.setpaginatedProduct(this.state.products,startIndex);
        
    }
    
    setCurrentPage(pageNum){
        this.setState({currentPage: pageNum});
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
                <nav className="d-flex justify-content-right">
                            <ul className="pagination">
                                {
                                    this.state.pages.map((page) => (
                                        <li 
                                            className={
                                                page===this.state.currentPage? "page-item active":"page-item"
                                            }
                                            onClick={()=>this.pagination(page)}

                                        >
                                            <p className="page-link"
                                            >{page} </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
            </div>
        )
    }
}

export default ProductComponent