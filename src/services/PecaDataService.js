import http from "../http-common";

class PecasDataService {

    async get(id){

        console.log('PecasDataService.get: ', id);
        return await http.get('/pecas/'+id);
    }

    async list(){

        console.log('PecasDataService.list: ');
        return await http.get(`/pecas/list`);
    }

    async delete(id){

        console.log('PecasDataService.delete: ', id);
        return await http.get(`/pecas/delete/`+id);
    }

    async update(data){

        console.log('PecasDataService.update: ', data);
        return await http.post(`/updatepecas`, data);
    }
    
    async create(data){

        console.log('PecasDataService.create: ', data);
        return await http.post(`/insertpecas`, data);
    }  
}
export default new PecasDataService();