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
            <div  className="container ">
                <div className="d-flex flex-row"><h1> Orders</h1></div>
                <div className="d-flex flex-row-reverse ">
                    <button type="button" className="btn btn-primary">Create Order</button>
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
                                                <a href="#" className="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                                <a href="#" className="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                                <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
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