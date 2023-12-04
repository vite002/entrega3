<template>
    <div id="tab_aut">
     
       <div v-if="currentFuncionario" class="edit-form">
            <h3>Funcionario</h3>
            <form>
         <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="currentFuncionario.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="currentFuncionario.nome" class="form-control" id="inputNome">
        </div>            
        <div class="form-group">
                <label for="inputCpf">CPF:</label>
                <input type="text" v-model="currentFuncionario.cpf" class="form-control" id="inputCpf">
        </div>
        <div class="form-group">
            <label for="inputASenha">Senha:</label>
            <input type="password" v-model="currentFuncionario.senha" class="form-control" id="inputASenha">
        </div>
        <div class="form-group">
            <label for="inputEndereo">Endereço:</label>
            <input type="text" v-model="currentFuncionario.endereco" class="form-control" id="inputEndereco">
        </div>
        <div class="form-group">
            <label for="inputCargo">Cargo:</label>
            <input type="text" v-model="currentFuncionario.cargo" class="form-control" id="inputCargo">
        </div>
         <div class="form-group">
            <label for="inputData_contratacao">Data contratação:</label>
            <input type="text" v-model="currentFuncionario.data_contratacao" class="form-control" id="inputData_contratacao">
        </div>
        
            </form>
            <button class="badge badge-success" @click="updateFuncionario">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFuncionario">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Funcionario...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import FuncionarioDataService from '../../services/FuncionarioDataService'
 
     export default{
      name:'editFuncionario',
      data() {
             return {                
                 currentFuncionario: null,
                 message: ''
             }
         },
         methods: {

            getFuncionario(id){

                FuncionarioDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
          
            updateFuncionario(){

                FuncionarioDataService.update(this.currentFuncionario)
                .then(response => {
                    console.log('FuncionarioDataService.update');
                    this.message = 'Funcionario alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteFuncionario(){

                FuncionarioDataService.delete(this.currentTutorial.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "funcionarios-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "funcionarios-list" });
            }
         },
         mounted() {
           
            this.getFuncionario(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>