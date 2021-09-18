import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.addProduct = this.addProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

        this.state = {
            products:[],
            productSelected:{},
            currentOrder:{
                _id: null,
                order_number: 0,
                order_status: "", 
                order_date: Date.now(),
                taxes_amounts: {},
                total_taxes:0,
                total_amount:0,
                consumer:{
                    _id:null,
                    name:""
                },
                items:[]
            },
            message: "",
            show: false,
            submittedProduct: false
        };
    }    

    componentDidMount() {
        this.getOrder(this.props.match.params.id);
        this.getProducts();
    }

    setShow(showModal){
        this.setState({
            show: showModal,
            submittedProduct : false
        });
    }

    handleClose = () => this.setShow(false);

    handleShow = () => this.setShow(true);

    getProducts(){
        Routes.getAllProducts()
          .then(response => {
                this.setState({
                    products: response.data,
                },() => {
                    console.log(this.state.products)
                });
          })
          .catch(e => {
            console.log(e);
          });
    }

    addProduct(){

    }

    getProduct(){

    }

    editProduct(){

    }

    deleteProduct(){

    }

    getOrder(id) {
        Routes.getOrder(id)
          .then(response => {
                this.setState({
                    currentOrder: response.data,
                },() => {
                    console.log(this.state.currentOrder)
                });
          })
          .catch(e => {
            console.log(e);
          });
    }

    onChangeAmount(e){
        this.setState({
            amount : e.target.value
        });
    }
    onChangeProduct(e) {
        this.setState({
            productSelected : e.target.value
        });
    }

    updateOrder() {
        Routes.updateOrder(this.state.currentOrder._id,this.state.currentOrder)
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

    deleteOrder() {
        Routes.deleteOrder(this.state.currentOrder._id).then(
            response=>{
                this.props.history.push('/orders');
            }
        )
    }

    render() {

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
                                <h5>{this.state.currentOrder.consumer.name}</h5>
                            </div>
                            <div className="col-4 mb-1 mt-1">
                                <h5>Status : </h5>
                            </div>
                            <div className="col-7 mb-1 mt-1">
                                <h5>{this.state.currentOrder.order_status}</h5>
                            </div>
                            <div className="col-4 mb-1 mt-1">
                                <h5>Date : </h5>
                            </div>
                            <div className="col-7 mb-1 mt-1">
                                <h5>{this.state.currentOrder.order_date}</h5>
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
                    <div className="d-flex justify-content-between mt-4">
                        <div>
                            
                            <button type="button" className="btn btn-primary">Back</button>
                            
                        </div>
                        <div className="ml-auto">
                            <button onClick={this.handleShow} type="button" className="btn btn-primary">Add Item+</button>
                        </div>

                    </div>            
                </div>
                <div className="row mt-4">
                    <div className="col-3 offset-md-9">
                        <div className="row">
                            <div className="col-6">
                                <h6>Total City Tax:</h6>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h6>{this.state.currentOrder.consumer.name}</h6>
                            </div>
                            <div className="col-6">
                                <h6>Total Country Tax:</h6>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h6>{this.state.currentOrder.order_status}</h6>
                            </div>
                            <div className="col-6">
                                <h6>Total State Tax:</h6>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h6>{this.state.currentOrder.order_status}</h6>
                            </div>
                            <div className="col-6">
                                <h6>Total Federal Tax:</h6>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h6>{this.state.currentOrder.order_date}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                {this.state.submittedProduct ?(<div><h4>You submitted successfully!</h4></div>):(<div></div>)}
                                <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                    <input
                                        type="amount"
                                        className="form-control"
                                        id="amount"
                                        required
                                        value={this.state.amount}
                                        onChange={this.onChangeAmount}
                                        name="amount"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="active">Status</label>
                                    <select className="form-select"
                                        id="active"
                                        required
                                        value={this.state.productSelected.name}
                                        onChange={this.onChangeProduct}
                                        name="active">
                                        <option selected>Product</option>
                                        {
                                            this.state.products.map(
                                                (product) =>
                                                <option value={product}>{product.name}</option>
                                            )
                                        }
                                    
                                    </select>
                                </div>
                                
                                <button onClick={this.addProduct} class="btn btn-success mt-4">Add Product</button>
                            </Modal.Body>
                
                        <Modal.Footer>
                            <button onClick={this.handleClose} class="btn btn-success mt-4">Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {/* Model Box Finsihs */}
            </div>
        );
    }
}

export default EditProduct;