import http from "../http-common";

class ClienteDataService {

    async get(id){

        console.log('ClienteDataService.get: ', id);
        return await http.get('/cliente/'+id);
    }

    async list(){

        console.log('ClienteDataService.list: ');
        return await http.get(`/cliente/list`);
    }

    async delete(id){

        console.log('ClienteDataService.delete: ', id);
        return await http.get(`/cliente/delete/`+id);
    }

    async update(data){

        console.log('ClienteDataService.update: ', data);
        return await http.post(`/updatecliente`, data);
    }
    
    async create(data){

        console.log('ClienteDataService.create: ', data);
        return await http.post(`/insertcliente`, data);
    }  
}
export default new ClienteDataService();