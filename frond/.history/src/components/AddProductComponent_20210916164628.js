import React, { Component } from "react";
import Routes from "../services/routes.service";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);

        this.state = {
            id: null,
            name: "",
            product_category: "", 
            price: 0,
            active: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            product_category: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
                price: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
                active: e.target.value
        });
    }

    saveProduct() {
        var data = {
            name: this.state.name,
            product_category: this.state.product_category,
            price: this.state.product_category,
            active: this.state.product_category,
        };

        Routes.create(data)
            .then(response => {
                this.setState({
                    id: response.data._id,
                    name: response.data.name,
                    product_category: response.data.product_category,
                    price: response.data.product_category,
                    active: response.data.product_category,

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
            name: "",
            product_category: "", 
            price: 0,
            active: "",
        submitted: false
        });
    }

    render() {
        return (
        <div className="submit-form">
            {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newProduct}>
                Add
                </button>
            </div>
            ) : (
            <div>
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
                    <select class="form-select"
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
                    <select class="form-select"
                        id="active"
                        required
                        value={this.state.active}
                        onChange={this.onChangeStatus}
                        name="active">
                        <option selected>Status</option>
                        <option value="Cookies">Active</option>
                        <option value="Candies">Inactive</option>
                    </select>
                </div>

                <button onClick={this.saveProduct} className="btn btn-success">
                    Submit
                </button>
            </div>
            )}
        </div>
        );
    }
}

export default AddProduct;