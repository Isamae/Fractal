import React,{ Component } from "react";
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";
import _ from "lodash";

class ProductComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            products:[],
            paginateProduct : [],
            pageCount:0,
            pages : [1],
            paginatePages:[],
            currentPage: 1,
            pageSize: 2
        }
    }
    
    componentDidMount(){
        this.getProducts();
    }

    prev(){
        if(this.state.currentPage > 1 && this.state.currentPage <= this.state.pageCount){
            this.setCurrentPage(this.state.currentPage-1);
            const startIndex =(this.state.currentPage-2)*this.state.pageSize;
            this.setpaginatedProduct(this.state.products,startIndex);
            this.setState({
                paginatePages:_(this.state.pages).slice(this.state.currentPage-2).take(4).value()
            });
        }
    }

    next(){
        if(this.state.currentPage>0 && this.state.currentPage+1<=this.state.pageCount){
            this.setCurrentPage(this.state.currentPage+1);
            const startIndex =(this.state.currentPage)*this.state.pageSize;
            this.setpaginatedProduct(this.state.products,startIndex);
            this.setState({
                paginatePages:_(this.state.pages).slice(this.state.currentPage).take(4).value()
            })
        }
    }

    pagination(pageNum){
        this.setCurrentPage(pageNum);
        const startIndex =(pageNum-1)*this.state.pageSize;
        this.setpaginatedProduct(this.state.products,startIndex);
        this.setState({
            paginatePages:_(this.state.pages).slice(pageNum-1).take(4).value()
        })
    }
    
    setCurrentPage(pageNum){
        this.setState({currentPage: pageNum});
    }

    setpaginatedProduct(data,start){
        this.setState({paginateProduct: _(data).slice(start).take(this.state.pageSize).value() });
    }

    getProducts(){
        Routes.getAllProducts().then(
            response => {
                this.setState({
                    products: response.data
                });

                this.setState({
                    pageCount: this.state.products? Math.ceil(this.state.products.length/this.state.pageSize): 0
                })

                if(this.state.pageCount!==1){
                    this.setState({
                        pages:_.range(1,this.state.pageCount+1)
                    })
                    this.setState({
                        paginatePages:_(this.state.pages).slice(this.currentPage).take(4).value()
                    })
                }

                this.setpaginatedProduct(this.state.products, 0);
                this.setCurrentPage(1);
            }
            
        ).catch(e => {
            console.log(e);
        });
    }

    render(){
        const {paginateProduct,currentPage,paginatePages} = this.state;
        return (
            <div  className="container ">
                <div className="d-flex flex-row"><h1> Products</h1></div>
                <div className="d-flex flex-row-reverse mb-4">
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
                                    <td><strong>No</strong></td>
                                    <td><strong>Name</strong></td>
                                    <td><strong>Category</strong></td>
                                    <td><strong>Price </strong></td>
                                    <td><strong>Status</strong></td>
                                    <td><strong>Actions</strong></td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    paginateProduct.map(
                                        (product, index) =>
                                        <tr key = {product._id}>
                                            <td>{index+1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.product_category}</td>
                                            <td>{product.unit_price}</td>
                                            <td>{product.active}</td>
                                            <td>
                                                <Link
                                                    to={"/products/product/"+product._id}
                                                >
                                                    Edit
                                                </Link>
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
                             <li  onClick={()=>this.prev()} id="prev">
                                <p className="page-link">Prev </p>
                            </li>
                        }
                        {
                            paginatePages.map((page) => (
                                <li 
                                    className={
                                        page===currentPage? "page-item active":"page-item"
                                    }
                                    id={page}
                                    onClick={()=>this.pagination(page)}
                                >
                                    <p className="page-link"
                                    >{page} </p>
                                </li>
                            ))
                        }
                        {
                            <li  onClick={()=>this.next()} id="next">
                                <p className="page-link">Next </p>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ProductComponent