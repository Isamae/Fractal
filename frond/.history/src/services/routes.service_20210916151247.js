import http from '../http';

class Routes{
    getAllProducts(){
        return http.get("/products");
    }
}

export default new Routes;