<template>
    <div id="tab_aut">
     
        <div class="col-md-6">
            <h4>Listagem de Servicos</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Data do pedido</th>
                    <th scope="col">Data de previsão de entrega</th>   
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(s, indice) in servicos" :key ="s.id" :class="{ active: indice == currentIndex }">
                            <td>{{s.id}}</td>
                            <td>{{s.data_previsao_entrega }}</td>
                            <td>{{s.data_pedido }}</td>
                            <td><button v-on:click="setCurrentServico(s, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remServico(s, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentServico">
                    <h4>Servico</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentServico.id }}
                    </div>
                    <div>
                    <label><strong>Data do pedido:</strong></label> {{ currentServico.data_pedido }}
                    </div>
                    <div>
                    <label><strong>Data de previsão de entrega:</strong></label> {{ currentServico.data_previsao_entrega }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/servico/' + currentServico.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Servico...</p>
                <router-link to="/servicos" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ServicoDataService from '../../services/ServicoDataService'  
     export default{
      name:'listServicos',
      data() {
             return {
                 servicos: [],
                 currentServico: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarServicos(){

                ServicoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateServico", response.status);

                   this.servicos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listservico');
                    console.log(response);
                });
            },
            setCurrentServico(servico, index){

                this.currentServico = servico;
                this.currentIndex = index;
            },
            remServico(servico, index){

                ServicoDataService.delete(servico.id).then(response => {

                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

          
            },
            refreshList() {
                this.listarServicos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarServicos();
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