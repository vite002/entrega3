<template>
    <div id="tab_aut">
     
       <div v-if="currentCliente" class="edit-form">
            <h3>Cliente</h3>
            <form>
        
         <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="currentCliente.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="currentCliente.nome" class="form-control" id="inputNome">
        </div>            
        <div class="form-group">
                <label for="inputCpf">CPF:</label>
                <input type="text" v-model="currentCliente.cpf" class="form-control" id="inputCpf">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="currentCliente.senha" class="form-control" id="inputSenha">
        </div>
        <div class="form-group">
            <label for="inputEndereo">Endereço:</label>
            <input type="text" v-model="currentCliente.endereco" class="form-control" id="inputEndereco">
        </div>
        <div class="form-group">
            <label for="inputObservacao">Observação:</label>
            <input type="text" v-model="currentCliente.observacao" class="form-control" id="inputObservacao">
        </div>
         <div class="form-group">
            <label for="inputData_ultimo_servico">Data do último serviço:</label>
            <input type="text" v-model="currentCliente.data_ultimo_servico" class="form-control" id="inputData_ultimo_servico">
        </div>
         <div class="form-group">
            <label for="selectCarro">Carros:</label>
            <select v-model="currentCliente.carros" class="form-control" id="selectCarro" multiple>                                
                <option v-for="c in carros" :key ="c.codigo" v-bind:value="c">
                    {{ c.placa }}
                    </option>
            </select> 
        </div>
             
            </form>
            <button class="badge badge-success" @click="updateCliente">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteCliente">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ massage }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Cliente...</p>
        </div>
    </div>
                                          
 </template>
 <script>
 
     import ClienteDataService from '../../services/ClienteDataService'
     import CarroDataService from '../../services/CarroDataService'
 
     export default{
      name:'editCliente',
      data() {
             return {                
                    currentCliente: null, 
                    massage: '',
                    carros: []
             }
         },
         methods: {

            getCliente(id){

                ClienteDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentCliente = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
           
            updateCliente(){

                ClienteDataService.update(this.currentCliente)
                .then(response => {
                    console.log('ClienteDataService.update');
                    this.message = 'Cliente alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteCliente(){

                ClienteDataService.delete(this.currentCliente.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "clientes-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "clientes-list" });
            }
         },
         mounted() {
            this.massage= '';
            this.getCliente(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>