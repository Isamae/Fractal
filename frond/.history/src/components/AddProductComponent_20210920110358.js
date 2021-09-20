import React, { Component } from "react";
import Routes from "../services/routes.service";

const validate = values => {
    const errors = {}

    if(values.name==""){
        errors.order_number = "required field" 
    }
    if(values.product_category===""){
        errors.active = "required field" 
    }

    if(values.price < 0){
        errors.consumer = "required field" 
    }

    if(values.active === ""){
        errors.consumer = "required field" 
    }

    return errors;
}

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
            errors : {},
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

        const {errors, ...noErrors} = this.state
        const result = validate(noErrors);

        this.setState({errors:result});
        if(!Object.keys(result).length){
            var data = {
                name: this.state.name,
                product_category: this.state.product_category,
                unit_price: this.state.price,
                active: this.state.active,
            };
    
            Routes.createProduct(data)
            .then(response => {
                this.setState({
                    id: response.data._id,
                    name: response.data.name,
                    product_category: response.data.product_category,
                    unit_price: response.data.unit_price,
                    active: response.data.active,
    
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
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
        const {errors} = this.state
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
                        {errors.name && <p>{errors.name}</p> }

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
                        {errors.price && <p>{errors.price}</p>}
                        
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
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
                        {errors.product_category && <p>{errors.product_category}</p>}

                        <div className="form-group">
                            <label htmlFor="active">Status</label>
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
                        {errors.active && <p>{errors.active}</p>}

                        <button onClick={this.saveProduct} className="btn btn-success m-2">
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