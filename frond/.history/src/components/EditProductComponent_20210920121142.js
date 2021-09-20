import React, { Component } from "react";
import Routes from "../services/routes.service";

const validate = values => {
    const errors = {}

    if(values.name === ""){
        errors.name = "required field" 
    }
    if(values.product_category===""){
        errors.product_category = "required field" 
    }

    if(values.unit_price < 0){
        errors.price = "required field" 
    }

    if(values.active === ""){
        errors.active = "required field" 
    }

    return errors;
}

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.getProductItem = this.getProductItem.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            errors:{},
            currentProduct:{
                _id: null,
                name: "",
                product_category: "", 
                unit_price: 0,
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

        const {errors, ...noErrors} = this.state
        const result = validate(noErrors);

        this.setState({errors:result});
        if(!Object.keys(result).length){
            Routes.updateProduct(this.state.currentProduct._id,this.state.currentProduct)
            .then(response => {
                console.log(response.data);
                this.setState({
                message: "The product was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
        }

        
    }

    deleteProduct() {
        //this.props.history.push('/products');
    
        Routes.deleteProduct(this.state.currentProduct._id).then(
            response=>{
                this.props.history.push('/products');
                console.log(response);
            }
        ).catch(e => {
            console.log(e);
        })
    }

    render() {
        const { currentProduct,errors } = this.state;
        return (
            <div className="container ">
                
                <div className="d-flex flex-row"><h1>Edit Product</h1></div>

                {currentProduct ? (

                    <div className="edit-form ">
                        <form className="d-flex justify-content-center">
                            <div className="col-4 ">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        required
                                        value={this.state.currentProduct.name}
                                        onChange={this.onChangeName}
                                        name="name"
                                    />
                                </div>
                                {errors.name && <p>{errors.name}</p> }

                                <div className="form-group">
                                    <label htmlFor="unit_price">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="unit_price"
                                        required
                                        value={this.state.currentProduct.unit_price}
                                        onChange={this.onChangePrice}
                                        name="unit_price"
                                    />
                                </div>
                                {errors.unit_price && <p>{errors.unit_price}</p> }

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select className="form-select"
                                        id="category"
                                        required
                                        value={this.state.currentProduct.product_category}
                                        onChange={this.onChangeCategory}
                                        name="category">
                                        <option selected>Category</option>
                                        <option value="Cookies">Cookies</option>
                                        <option value="Candies">Candies</option>
                                        <option value="Cakes">Cakes</option>
                                        <option value="Desserts">Desserts</option>
                                        <option value="Drinks">Drinks</option>
                                    </select>
                                    {errors.product_category && <p>{errors.product_category}</p> }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="active">Status</label>
                                    <select className="form-select"
                                        id="active"
                                        required
                                        value={this.state.currentProduct.active}
                                        onChange={this.onChangeStatus}
                                        name="active">
                                        <option selected>Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {errors.active && <p>{errors.active}</p> }
                                </div>
                                <button
                                    className="btn btn-success m-2 "
                                    onClick={this.deleteProduct}
                                    >
                                    Delete
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-success m-2"
                                    onClick={this.updateProduct}
                                    >
                                    Update
                                </button>
                            </div>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                    ) : (
                    <div>
                        <br />
                        <p>Please click on a Product...</p>
                    </div>
                    )}
            </div>
        );
    }
}

export default EditProduct;