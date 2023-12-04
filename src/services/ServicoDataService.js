import http from "../http-common";

class ServicoDataService {

    async get(id){

        console.log('ServicoDataService.get: ', id);
        return await http.get('/servico/'+id);
    }

    async list(){

        console.log('ServicoDataService.list: ');
        return await http.get(`/servico/list`);
    }

    async delete(id){

        console.log('ServicoDataService.delete: ', id);
        return await http.get(`/servico/delete/`+id);
    }

    async update(data){

        console.log('ServicoDataService.update: ', data);
        return await http.post(`/updateservico`, data);
    }
    
    async create(data){

        console.log('ServicoDataService.create: ', data);
        return await http.post(`/insertservico`, data);
    }  

}

export default new ServicoDataService();