<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Pecas</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Placa do peca</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(p, indice) in pecas" :key ="p.id" :class="{ active: indice == currentIndex }">
                            <td>{{p.id}}</td>
                            <td>{{p.nome}}</td>
                            <td>{{p.carro_cliente}}</td>
    
                            <td><button v-on:click="setCurrentPeca(p, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remPeca(p, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentPeca">
                    <h4>Peca</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentPeca.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentPeca.nome }}
                    </div>
                    <div>
                    <label><strong>Placa do carro:</strong></label> {{ currentPeca.carro_cliente }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updatepecas/' + currentPeca.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Peca...</p>
                <router-link to="/addpeca" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import PecaDataService from '../../services/PecaDataService'     
 
     export default{
      name:'listPecas',
      data() {
             return {
                 pecas: [],
                 currentPeca: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarPecas(){

                PecaDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticatePeca", response.status);

                   this.pecas = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listpeca');
                    console.log(response);
                });
            },
            setCurrentPeca(peca, index){

                this.currentPeca = peca;
                this.currentIndex = index;
            },
            remPeca(peca, index){

                PecaDataService.delete(peca.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

           
            },
            refreshList() {
                this.listarPecas();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarPecas();
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