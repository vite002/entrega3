import http from "../http-common";

class FuncionarioDataService {

    async authenticate(data){

        console.log('FuncionarioDataService.authenticate: ', data);
        const response = await http.post(`/loginfuncionario`, data);
        return response;
    }

    async get(id){

        console.log('FuncionarioDataService.get: ', id);
        return await http.get('/funcionario/'+id);
    }

    async list(){

        console.log('FuncionarioDataService.list: ');
        return await http.get(`/funcionario/list`);
    }

    async delete(id){

        console.log('FuncionarioDataService.delete: ', id);
        return await http.get(`/funcionario/delete/`+id);
    }

    async update(data){

        console.log('FuncionarioDataService.update: ', data);
        return await http.post(`/updatefuncionario`, data);
    }
    
    async create(data){

        console.log('FuncionarioDataService.create: ', data);
        return await http.post(`/insertfuncionario`, data);
    }  
}
export default new FuncionarioDataService();