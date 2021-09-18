import React from "react";
import { Link } from "react-router-dom";
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
            <div  className="container ">
                <div className="d-flex flex-row"><h1> Orders</h1></div>
                <div className="d-flex flex-row-reverse ">
                    <Link
                        to={"/orders/order"}
                    >
                        <button type="button" className="btn btn-primary">Create Order</button>
                    </Link>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>

                                <tr>
                                    <td>No</td>
                                    <td>Costumer</td>
                                    <td>Status</td>
                                    <td>Date</td>
                                    <td>Total</td>
                                    <td>Actions</td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map(
                                        order =>
                                        <tr key = {order._id}>
                                            <td>{order.consumer.name}</td>
                                            <td>{order.order_status}</td>
                                            <td>{order.order_date}</td>
                                            <td>{order.total_amount}</td>
                                            <td>
                                                <a href="#" className="edit" title="Edit" ><i class="material-icons">Edit</i></a>
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