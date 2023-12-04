<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Clientes</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Cpf</th>
                    <th scope="col">Senha</th>
                    <th scope="col">Endereço</th>   
                    <th scope="col">Observação</th>   
                    <th scope="col">Data do último serviço</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(c, indice) in clientes" :key ="c.id" :class="{ active: indice == currentIndex }">
                            <td>{{c.id}}</td>
                            <td>{{c.nome}}</td>
                            <td>{{c.cpf}}</td>
                            <td>{{c.senha}}</td> 
                            <td>{{c.endereco}}</td>
                            <td>{{c.observacao}}</td>
                            <td>{{c.data_ultimo_servico}}</td>
                            <td><button v-on:click="setCurrentCliente(c, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remCliente(c, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentCliente">
                    <h4>Cliente</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentCliente.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentCliente.nome }}
                    </div>
                    <div>
                    <label><strong>Cpf:</strong></label> {{ currentCliente.cpf }}
                    </div>
                    <div>
                    <label><strong>Senha:</strong></label> {{ currentCliente.senha }}
                    </div>
                    <div>
                    <label><strong>Endereço:</strong></label> {{ currentCliente.endereco }}
                    </div>
                    <div>
                    <label><strong>Observação:</strong></label> {{ currentCliente.observacao }}
                    </div>
                    <div>
                    <label><strong>Data do último serviço:</strong></label> {{ currentCliente.data_ultimo_servico }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/cliente/' + currentCliente.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Cliente...</p>
                <router-link to="/addcliente" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ClienteDataService from '../../services/ClienteDataService'     
 
     export default{
      name:'listClientes',
      data() {
             return {
                 clientes: [],
                 currentCliente: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarClientes(){

                ClienteDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateCliente", response.status);

                   this.clientes = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listcliente');
                    console.log(response);
                });
            },
            setCurrentCliente(cliente, index){

                this.currentCliente = cliente;
                this.currentIndex = index;
            },
            remCliente(cliente, index){

                ClienteDataService.delete(cliente.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarClientes();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarClientes();
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