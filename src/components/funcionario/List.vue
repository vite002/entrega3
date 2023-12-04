<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Cpf</th>
                    <th scope="col">Senha</th>
                    <th scope="col">Endereço</th>   
                    <th scope="col">Crago</th>   
                    <th scope="col">Data de Contratação</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(f, indice) in funcionarios" :key ="f.id" :class="{ active: indice == currentIndex }">
                            <td>{{f.id}}</td>
                            <td>{{f.nome}}</td>
                            <td>{{f.cpf}}</td>
                            <td>{{f.senha}}</td> 
                            <td>{{f.endereco}}</td>
                            <td>{{f.cargo}}</td>
                            <td>{{f.data_contratacao | formataData}}</td>
                            <td><button v-on:click="setCurrentFuncionario(f, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remFuncionario(f, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentFuncionario">
                    <h4>Funcionario</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentFuncionario.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentFuncionario.nome }}
                    </div>
                    <div>
                    <label><strong>Cpf:</strong></label> {{ currentFuncionario.cpf }}
                    </div>
                    <div>
                    <label><strong>Senha:</strong></label> {{ currentFuncionario.senha }}
                    </div>
                    <div>
                    <label><strong>Endereço:</strong></label> {{ currentFuncionario.endereco }}
                    </div>
                    <div>
                    <label><strong>Cargo:</strong></label> {{ currentFuncionario.cargo }}
                    </div>
                    <div>
                    <label><strong>Data de contratação:</strong></label> {{ currentFuncionario.data_contratacao }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/funcionario/' + currentFuncionario.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Funcionario...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import FuncionarioDataService from '../../services/FuncionarioDataService'     
 
     export default{
      name:'listFuncionarios',
      data() {
             return {
                 funcionarios: [],
                 currentFuncionario: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarFuncionarios(){

                FuncionarioDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateFuncionario", response.status);

                   this.funcionarios = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listfuncionario');
                    console.log(response);
                });
            },
            setCurrentFuncionario(funcionario, index){

                this.currentFuncionario = funcionario;
                this.currentIndex = index;
            },
            remFuncionario(funcionario, index){

                FuncionarioDataService.delete(funcionario.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            
            refreshList() {
                this.listarFuncionarios();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarFuncionarios();
         }
     }
     
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>