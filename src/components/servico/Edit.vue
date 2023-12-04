<template>
    <div id="tab_aut">
     
    <div v-if="currentServico" class="edit-form">
            <h3>Servico</h3>
            <form>
         <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="currentServico.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputData_pedido">Data do pedido:</label>
            <input type="date" v-model="currentServico.data_pedido" class="form-control" id="inputData_pedido">
        </div>            
        <div class="form-group">
                <label for="inputData_previsao_entrega">Data de previsão de entrega:</label>
                <input type="date" v-model="currentServico.data_previsao_entrega" class="form-control" id="inputData_previsao_entrega">
        </div>
        
        <div class="form-group">
            <label for="selectCarro">Carros:</label>
            <select v-model="currentServico.carros" class="form-control" id="selectCarro" multiple>                                
                <option v-for="c in carros" :key ="c.codigo" v-bind:value="c">
                    {{ c.placa }}
                    </option>
            </select> 
        </div>
        <div class="form-group">
            <label for="selectPeca">Pecas:</label>
            <select v-model="currentServico.pecas" class="form-control" id="selectPeca" multiple>                                
                <option v-for="p in pecas" :key ="p.codigo" v-bind:value="p">
                    {{ p.id }}
                    </option>
            </select> 
        </div>
            </form>
            <button class="badge badge-success" @click="updateServico">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteServico">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
        
    </div>

        <div v-else>
                <br />
                <p>Please click on a Servico...</p>
        </div>

    </div>

                                          
 </template>
 <script>
 
     import ServicoDataService from '../../services/ServicoDataService'
     import CarroDataService from '../../services/CarroDataService'
     import PecaDataService from '../../services/PecaDataService'
 
     export default{
      name:'editServico',
      data() {
             return {
                    currentServico: null, 
                    message: '',
                    carros: [],
                    pecas: []
                } 
             },
         methods: {

            getServico(id){

                ServicoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentServico = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            
            listPecas(){

                PecaDataService.list().then(response =>{

                console.log("Retorno do seviço PecaDataService.list", response.status);

                for(let p of response.data){

                    this.pecas.push(p);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PecaDataService.list');
                console.log(response);
                });               
            },
             listCarros(){

                CarroDataService.list().then(response =>{

                    console.log("Retorno do seviço CarroDataService.list", response.status);

                    this.carros = response.data;                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço CarroDataService.list');
                console.log(response);
                });               
            },
            updateServico(){

                ServicoDataService.update(this.currentServico)
                .then(response => {
                    console.log('ServicoDataService.update');
                    this.message = 'Servico alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteServico(){

                ServicoDataService.delete(this.currentTutorial.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "servicos-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "servicos-list" });
            }
         },
         mounted() {
            
            this.listPecas();
            this.listCarros();
            this.getServico(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>