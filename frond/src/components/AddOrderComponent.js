import { Modal } from 'react-bootstrap';
import React, { Component } from "react";
import Routes from "../services/routes.service";

const validate = values => {
    const errors = {}
    if(values.consumer._id == null){
        errors.consumer = "consumer required field" 
    }

    return errors;
}
class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.onChangeConsumer = this.onChangeConsumer.bind(this);
        this.onChangeConsumerName = this.onChangeConsumerName.bind(this);
        this.addConsumer = this.addConsumer.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.newOrder = this.newOrder.bind(this);
        this.getAllConsumer = this.getAllConsumer.bind(this);

        this.state = {
            consumers:[],
            errors : {},
            show:false,
            id: null,
            order_number: 0,
            order_status: "", 
            order_date: Date.now(),
            total_taxes: 0.0,
            total_amount:0.0,
            consumer:{
                _id:null,
                name:"",
            },

            submitted: false,
            submittedConsumer: false
        };
    }

    componentDidMount() {
        this.getAllConsumer();
    }
    getAllConsumer(){
        Routes.getAllConsumer()
        .then(response => {
            this.setState({
                consumers: response.data,
            });
        })
        .catch(e => {
        console.log(e);
        });
    }
    setShow(showModal){
        this.setState({
            show: showModal,
            submittedConsumer : false
        });
    }

    handleClose = () => this.setShow(false);

    handleShow = () => this.setShow(true);

    onChangeConsumerName(e){ 
        this.setState({
            consumer: {...this.state.consumer,name:e.target.value}
        });
    }

    onChangeConsumer(e){
        this.setState({
            consumer: {...this.state.consumer,_id:e.target.value}
        });
    }

    addConsumer(){

        var data = {
            name: this.state.consumer.name,
        };

        Routes.createConsumer(data)
            .then(response => {
                this.setState(function(prevState) {
                    return {
                        consumer: {
                            ...prevState.consumer,
                            _id: response.data._id
                        }
                    };
                });
                this.setState({
                    submittedConsumer : true
                })
                this.getAllConsumer();
            })
            .catch(e => {
                console.log(e);
        });
    }

    saveOrder() {
        const {errors, ...noErrors} = this.state
        const result = validate(noErrors);

        this.setState({errors:result});
        if(!Object.keys(result).length){

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
            })
            .catch(e => {
                console.log(e);
            });
        }
        
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
        const {errors} = this.state
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
                    <div className="col-10 col-md-4 ">
                        <div className="form-group">
                            <select className="form-select"
                                id="consumer"
                                required
                                value={this.state.consumer._id}
                                onChange={this.onChangeConsumer}
                                name="consumer">

                                <option selected>Select Consumer</option>
                                {
                                    this.state.consumers.map(consumer =>
                                        <option key={consumer._id} value={consumer._id}>{consumer.name}</option>
                                    )
                                }
                            </select>
                            {errors.consumer && <p>{errors.consumer}</p> }
                        </div>
                   
                        <button onClick={this.handleShow}className="btn btn-success m-1">Add Consumer</button>
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
                                {this.state.submittedConsumer ?(<div><h4>You submitted successfully!</h4></div>):(<div></div>)}
                                <div className="form-group mt-3">
                                    <input type="text" 
                                    className="form-control" 
                                    id="name_consumer" 
                                    placeholder="Enter Consumer"
                                    required
                                    value={this.state.consumer.name}
                                    onChange={this.onChangeConsumerName}/>
                                </div>
                                
                                <button onClick={this.addConsumer} className="btn btn-success mt-4">Add Consumer</button>
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

export default AddOrder;