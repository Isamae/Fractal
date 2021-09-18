import http from '../http';

class Routes{
    getAllProducts(){
        return http.get("/products");
    }
    createProduct(data) {
        return http.post("/products/product", data);
    }
    getAllOrders(){
        return http.get("/orders");
    }
}

export default new Routes;