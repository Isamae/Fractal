import Button from "@restart/ui/esm/Button";
import { Modal } from 'react-bootstrap';
import React, { Component } from "react";
import Routes from "../services/routes.service";

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeConsumer = this.onChangeConsumer.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.newOrder = this.newOrder.bind(this);

        this.state = {
            show:false,
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

    setShow(showModal){
        this.setState({
            show: showModal
        });
    }

    handleClose = () => this.setShow(false);

    handleShow = () => this.setShow(true);

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

    onChangeConsumer(e){
        const name = e.target.value
        this.setState(function(prevState) {
            return {
                consumer: {
                    ...prevState.consumer,
                    name: name
                }
            };
        });
    }

    addConsumerOrder(){
        
    }

    saveOrder() {

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
                    total_taxes: response.data.total_taxes,
                    total_amount:response.data.total_amount,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newOrder() {
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
                <div className="d-flex flex-row"><h1>New Order</h1></div>

                <div className="submit-form  d-flex justify-content-center">
                    {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newOrder}>
                            Add
                        </button>
                    </div>
                    ) : (
                    <div className="col-4 ">
                        <div className="form-group">
                            <label htmlFor="name">Number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="order_number"
                                required
                                value={this.state.order_number}
                                onChange={this.onChangeStatus}
                                name="order_number"
                            />
                        </div>
                  
                        <div className="form-group">
                            <select className="form-select"
                                id="active"
                                required
                                value={this.state.active}
                                onChange={this.onChangeStatus}
                                name="active">
                                <option selected>Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                   
                        <button onClick={this.handleShow}class="btn btn-success m-1">Add Consumer</button>
                        <button onClick={this.saveOrder} className="btn btn-success  m-1">
                            Submit
                        </button>
                    </div>
                    )}
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
                        <Modal.Title>Add Consumer</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <div class="form-group mt-3">
                                    <input type="text" class="form-control" id="name_consumer" placeholder="Enter Consumer"
                                    required
                                    value={this.state.consumer.name}
                                    onChange={this.onChangeConsumer}/>
                                </div>
                                
                                <button  class="btn btn-success mt-4">AddConsumer</button>
                            </Modal.Body>
                
                        <Modal.Footer>

                            <button onClick={this.addConsumerOrder} class="btn btn-success mt-4">Close</button>
                        
                        </Modal.Footer>
                    </Modal>
                </div>
                {/* Model Box Finsihs */}
                
            </div>
        );
    }
}

export default AddOrder;