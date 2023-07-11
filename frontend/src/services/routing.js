import http from "./http-common";

class Stocks {
  async saveProductData(data) {

    // POST request
    return await http.post("api/productData", data);
  }

    // GET request
    async getAllProduct(){
        return await http.get("api/product-list");
    }

    // PUT request (Update)
    async updateProductData(id, data) {
        return await http.put(`/api/productData/${id}`, data);
    }

    // DELETE request
    async deleteProductData(id) {
        return await http.delete(`/api/productData/${id}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Stocks();