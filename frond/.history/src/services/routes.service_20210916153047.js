import http from '../http';

class Routes{
    getAllProducts(){
        return http.get("/products");
    }

    getAllOrders(){
        return http.get("/orders");
    }
}

export default new Routes;