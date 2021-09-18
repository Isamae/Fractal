import axios from 'axios';

const PRODUCTs_REST_API_URL = "http://localhost:8080/api/products";

class ProductService {
    getProduct(){
        return axios.get(PRODUCTs_REST_API_URL)
    }
}

export default new ProductService();