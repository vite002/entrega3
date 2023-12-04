import http from "../http-common";

class CarroDataService {

    async get(id){

        console.log('CarroDataService.get: ', placa);
        return await http.get('/carro/'+placa);
    }

    async list(){

        console.log('CarroDataService.list: ');
        return await http.get(`/carro/list`);
    }

    async delete(id){

        console.log('CarroDataService.delete: ', placa);
        return await http.get(`/carro/delete/`+placa);
    }

    async update(data){

        console.log('CarroDataService.update: ', data);
        return await http.post(`/updatecarro`, data);
    }
    
    async create(data){

        console.log('CarroDataService.create: ', data);
        return await http.post(`/insertcarro`, data);
    }  
}
export default new CarroDataService();