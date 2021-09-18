import React from "react";
import Routes from "../services/routes.service";

class ProductComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            orders:[]
        }
    }
    
    componentDidMount(){
        this.getOrders();
    }

    getOrders(){
        Routes.getAllOrders().then(
            response => {
                this.setState({orders: response.data}) 
            }
        ).catch(e => {
            console.log(e);
        });
    }

    render(){
        return (
            <div  class="container ">
                <div class="d-flex flex-row"><h1> Orders</h1></div>
                <div class="d-flex flex-row-reverse ">
                    <button type="button" class="btn btn-primary">Create Order</button>
                </div>
                <div class="row">
                    <div class="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>

                                <tr>
                                    <td>No</td>
                                    <td>Costumer</td>
                                    <td>Status</td>
                                    <td>Preci</td>
                                    <td>Status</td>
                                    <td>Actions</td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map(
                                        order =>
                                        <tr key = {order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.order_category}</td>
                                            <td>{order.unit_price}</td>
                                            <td>{order.active}</td>
                                            <td>
                                                <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                                    
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductComponent