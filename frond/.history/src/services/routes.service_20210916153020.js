import http from '../http';

class Routes{
    getAllProducts(){
        return http.get("/products");
    }

    getAllProducts(){
        return http.get("/orders");
    }
}

export default new Routes;