import React, { Component } from "react";
import Routes from "../services/routes.service";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeConsumer = this.onChangeConsumer.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.newOrder = this.newOrder.bind(this);

        this.state = {
            id: null,
            order_number: 0,
            order_status: "", 
            order_date: Date.now(),
            total_taxes: 0.0,
            total_amount:0.0,
            consumer:{
                id:null,
                name:"",
            },

            submitted: false
        };
    }

    onChangeNumber(e) {
        this.setState({
            order_number: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            order_status: e.target.value
        });
    }

    saveProduct() {

        var data = {
            order_number: this.state.order_number,
            order_status: this.state.order_status,
            order_date: this.state.order_date,
            consumer: this.state.consumer,
        };

        Routes.createOrder(data)
            .then(response => {
                this.setState({
                    id: response.data._id,
                    order_number: response.data.order_number,
                    order_status: response.data.order_status,
                    order_date: response.data.order_date,
                    consumer: response.data.consumer,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newProduct() {
        this.setState({
            id: null,
            order_number: 0,
            order_status: "", 
            order_date: Date.now(),
            total_taxes: 0.0,
            total_amount:0.0,
            consumer:{
                id:null,
                name:"",
            },

            submitted: false
        });
    }

    render() {
        return (
            <div  className="container ">
                <div className="d-flex flex-row"><h1>New Product</h1></div>

                <div className="submit-form  d-flex justify-content-center">
                    {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newProduct}>
                            Add
                        </button>
                    </div>
                    ) : (
                    <div className="col-4 ">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                required
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                name="price"
                            />
                        </div>
                        
                        <div className="form-group">
                            <select className="form-select"
                                id="category"
                                required
                                value={this.state.product_category}
                                onChange={this.onChangeCategory}
                                name="category">
                                <option selected>Category</option>
                                <option value="Cookies">Cookies</option>
                                <option value="Candies">Candies</option>
                                <option value="Cakes">Cakes</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Drinks">Drinks</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-select"
                                id="active"
                                required
                                value={this.state.active}
                                onChange={this.onChangeStatus}
                                name="active">
                                <option selected>Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <button onClick={this.saveProduct} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                    )}
                </div>
            </div>
        );
    }
}

export default AddProduct;