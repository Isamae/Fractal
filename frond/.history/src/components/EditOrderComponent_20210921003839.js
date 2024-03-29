import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Routes from "../services/routes.service";

class EditOrder extends Component {
    constructor(props) {
        super(props);
        this.addProduct = this.addProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.showModalAdd = this.showModalAdd.bind(this);

        this.state = {
            amount:0,
            products:[],
            nameProduct:"",
            productSelected:null,
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
                itemsProduct:{},
                itemsAmount:{}
            },
            message: "",
            show: false,
            submittedProduct: false,
            editItem: false
        };
    }    

    componentDidMount() {
        this.getOrder(this.props.match.params.id);
        this.getProducts();
    }

    setShow(showModal){
        this.setState({
            show: showModal,
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
        var data = {
            _id: this.state.productSelected,
            amount: this.state.amount,
        };

        Routes.addItemOrder(this.state.currentOrder._id,data)
        .then(response => {
            this.setState({
                submittedProduct: true,
                currentOrder:response.data
            });
        })
        .catch(e => {
            console.log(e);
        });

    }

    setProduct(){
        var data = {
            _id: this.state.productSelected,
            amount: this.state.amount,
        };

        Routes.setItemOrder(this.state.currentOrder._id,data)
        .then(response => {
  
            this.setState({
                editItem:false,
                currentOrder:response.data
            });
            this.handleClose();
        })
        .catch(e => {
            console.log(e);
        });
    }

    editProduct(id_product,amountEdit){
        this.setState({
            amount : amountEdit
        });

        this.state.products.forEach(product => {
            if(product._id === id_product ){
                this.setState({
                    productSelected : product._id,
                    editItem : true,
                    nameProduct: product.name
        
                });
            }
        })
        this.handleShow();
    }

    showModalAdd(){
        this.setState({
            editItem : false,
            submittedProduct: false
        });
        this.handleShow();
    }

    deleteProduct(id_product){
        console.log(id_product);
        var data = {
            id : id_product,
        };
        console.log(data);
        Routes.deleteItemOrder(this.state.currentOrder._id, data)
        .then(response => {
            this.setState({
                submittedProduct: true,
                currentOrder:response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
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
                message: "The order was updated successfully!"
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
                console.log(response);
            }
        ).catch(e => {
            console.log(e)
        })
    }

    render() {
        const {message, currentOrder, show, editItem, productSelected, products, nameProduct,submittedProduct,amount} = this.state
        return (
            <div className="container ">
                <p>{message}</p>
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
                    <div className="col-2">
                        <div className="mb-3 mt-2">
                            <h5>Customer:</h5>
                        </div>
                        <div className="mb-3 mt-2">
                            <h5>Status : </h5>
                        </div>
                        <div className="mb-3 mt-2">
                            <h5>Date : </h5>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="mb-3 mt-2">
                            <h5>{currentOrder.consumer.name}</h5>
                        </div>
                        <div className="mb-3 mt-2">
                            <h5>{currentOrder.order_status}</h5>
                        </div>
                        <div className="mb-3 mt-2">
                            <h5>{currentOrder.order_date}</h5>
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
                                    Object.keys(currentOrder.items).map(
                                        (item, index) =>
                                        <tr key = {item}>
                                            <td>{index+1}</td>
                                            <td>{currentOrder.itemsProduct[item].name }</td>
                                            <td>{Object.values(currentOrder.items)[index]}</td>
                                            <td>{currentOrder.itemsProduct[item].unit_price }</td>
                                            <td>{currentOrder.itemsProduct[item].unit_price*Object.values(currentOrder.items)[index]}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <div>
                                                        <button onClick={() => this.editProduct(item,Object.values(currentOrder.items)[index])} type="button" className="btn btn-link">Edit</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => this.deleteProduct(item)} type="button" className="btn btn-link">Delete</button>
                                                    </div>

                                                </div> 
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <div>
                            
                        </div>
                        <div className="ml-auto">
                            <button onClick={this.showModalAdd} type="button" className="btn btn-primary">Add Item+</button>
                        </div>
                    </div>            
                </div>
                <div className="row mt-4">
                    <div className="col-3 offset-md-9">
                        <div className="row">
                            <div className="col-6">
                                <h5>Subtotal</h5>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h5>&#36;{currentOrder.sub_total}</h5>
                            </div>
                            <div className="col-6">
                                <h5>Taxes</h5>
                            </div>
                        </div>
                        <div className="row ms-1">
                            <div className="col-7">
                                <h6>Total City Tax:</h6>
                            </div>
                            <div className="col-5 d-flex justify-content-end">
                                <h6>&#36;{currentOrder.taxes_amounts.City_Tax}</h6>
                            </div>
                            <div className="col-7">
                                <h6>Total Country Tax:</h6>
                            </div>
                            <div className="col-5 d-flex justify-content-end">
                                <h6>&#36;{currentOrder.taxes_amounts.Country_Tax}</h6>
                            </div>
                            <div className="col-7">
                                <h6>Total State Tax:</h6>
                            </div>
                            <div className="col-5 d-flex justify-content-end">
                                <h6>&#36;{currentOrder.taxes_amounts.Federal_Tax}</h6>
                            </div>
                            <div className="col-7">
                                <h6>Total Federal Tax:</h6>
                            </div>
                            <div className="col-5 d-flex justify-content-end">
                                <h6>&#36;{currentOrder.taxes_amounts.State_Tax}</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h5>Total Taxes</h5>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h5>&#36;{currentOrder.total_taxes}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h5>Total</h5>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <h5>&#36;{currentOrder.total_amount}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 m-0 p-0">
                                <button onClick={this.updateOrder} type="button" className="btn btn-success">Complete Order</button>
                            </div>
                            <div className="col-6 d-flex justify-content-end m-0 p-0">
                                <button onClick={this.deleteOrder} type="button" className="btn btn-danger">Reject Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        {editItem ? (<Modal.Title>Edit Product</Modal.Title>):(<Modal.Title>Add Product</Modal.Title>)}
                        </Modal.Header>
                            <Modal.Body>
                                {submittedProduct ?(<div><h4>You submitted successfully!</h4></div>):(<div></div>)}
                                <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        required
                                        value={amount}
                                        onChange={this.onChangeAmount}
                                        name="amount"
                                    />
                                </div>
                                {!editItem? (
                                    <div className="form-group">
                                        <label htmlFor="product">Product</label>
                                        <select className="form-select"
                                            id="product"
                                            required
                                            value={productSelected}
                                            onChange={this.onChangeProduct}
                                            name="product">
                                            <option selected>Product</option>
                                            {
                                                products.map(
                                                    (product) =>
                                                    <option value={product._id}>{product.name}</option>
                                                )
                                            }
                                        
                                        </select>
                                    </div>
                                    ):( <h4>Name: {nameProduct}</h4>)
                                }
                                
                                {
                                    editItem ? (<button onClick={this.setProduct} className="btn btn-success mt-4">Edit Product</button>):(<button onClick={this.addProduct} className="btn btn-success mt-4">Add Product</button>)

                                }
                                
                            </Modal.Body>
                
                        <Modal.Footer>
                            <button onClick={this.handleClose} className="btn btn-success mt-4">Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {/* Model Box Finsihs */}
            </div>
        );
    }
}

export default EditOrder;