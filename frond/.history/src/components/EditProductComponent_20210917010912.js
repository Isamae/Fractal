import React, { Component } from "react";
import Routes from "../services/routes.service";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            currentProduct:{
                id: null,
                name: "",
                product_category: "", 
                price: 0,
                active: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getProduct(this.props.match.params.id);
    }

    getTutorial(id) {
        Routes.getProduct(id)
          .then(response => {
            this.setState({
              currentProduct: response.data
            });
            console.log(response.data);
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
        const price= e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    price: price
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
                    price: price
                }
            };
        });
    }

    updateProduct() {

        Routes.updateProduct(this.state.currentProduct.id,this.state.currentProduct)
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
        Routes.delete(this.state.currentProduct.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/products')
            })
            .catch(e => {
                console.log(e);
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