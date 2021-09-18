import React, { Component } from "react";
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.addProduct = this.addProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.rejectOrder = this.rejectOrder.bind(this);

        this.state = {
            currentProduct:{
                _id: null,
                order_number: 0,
                order_status: "", 
                order_date: Date.now(),
                active: "",
            },
            message: "",
            redirect:false
        };
    }    
    componentDidMount() {
        this.getProductItem(this.props.match.params.id);
    }

    getProductItem(id) {
        Routes.getProduct(id)
          .then(response => {
                this.setState({
                    currentProduct: response.data,
                },() => {
                    console.log(this.state.currentProduct)
                });
                
            
          })
          .catch(e => {
            console.log(e);
          });
      }

    onChangeName(e) {
        const name = e.target.value
        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    name: name
                }
            };
        });
    }

    onChangeCategory(e) {
        const product_category= e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    product_category: product_category
                }
            };
        });
    }

    onChangePrice(e) {
        const unit_price= e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    unit_price: unit_price
                }
            };
        });
    }

    onChangeStatus(e) {
        const active= e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    active: active
                }
            };
        });
    }

    updateProduct() {
        Routes.updateProduct(this.state.currentProduct._id,this.state.currentProduct)
        .then(response => {
            console.log(response.data);
            this.setState({
            message: "The tutorial was updated successfully!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteProduct() {
        Routes.deleteProduct(this.state.currentProduct._id).then(
            response=>{
                this.props.history.push('/products');
            }
        )
    }

    render() {
        const { currentProduct } = this.state;
        return (
            <div className="container ">
                <div className="d-flex justify-content-between m-4">
                    <div>
                        <h2>Order N&deg;</h2>
                    </div>
                    <div className="ml-auto">
                        <Link
                            to={"/orders"}
                        >
                            <button type="button" className="btn btn-dark">Back</button>
                        </Link>
                    </div>

                </div>
                <div className="row m-4">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-4 mb-1 mt-1">
                                <h5>Customer:</h5>
                            </div>
                            <div className="col-7 mb-1 mt-1">
                                <h5>dasdasd</h5>
                            </div>
                            <div className="col-4 mb-1 mt-1">
                                <h5>Status : </h5>
                            </div>
                            <div className="col-7 mb-1 mt-1">
                                <h5>Status</h5>
                            </div>
                            <div className="col-4 mb-1 mt-1">
                                <h5>Date : </h5>
                            </div>
                            <div className="col-7 mb-1 mt-1">
                            <   h5>Date</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><strong>No</strong></td>
                                    <td><strong>Name</strong></td>
                                    <td><strong>Quantify</strong></td>
                                    <td><strong>Unit Price</strong></td>
                                    <td><strong>Cost</strong></td>
                                    <td><strong>Actions</strong></td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default EditProduct;