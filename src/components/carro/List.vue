<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Carros</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Placa</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(c, indice) in carros" :key ="c.placa" :class="{ active: indice == currentIndex }">
                            <td>{{c.placa}}</td>
                            <td>{{c.ano}}</td>
                            <td>{{c.modelo}}</td>
    
                            <td><button v-on:click="setCurrentCarro(c, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remCarro(c, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentCarro">
                    <h4>Carro</h4>
                    <div>
                    <label><strong>Placa:</strong></label> {{ currentCarro.placa }}
                    </div>
                    <div>
                    <label><strong>Ano:</strong></label> {{ currentCarro.ano }}
                    </div>
                    <div>
                    <label><strong>Modelo:</strong></label> {{ currentCarro.modelo }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/carro/' + currentCarro.placa"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Carro...</p>
                <router-link to="/addcarro" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import CarroDataService from '../../services/CarroDataService'     
 
     export default{
      name:'listCarros',
      data() {
             return {
                 carros: [],
                 currentCarro: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarCarros(){

                CarroDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateCarro", response.status);

                   this.carros = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listcarro');
                    console.log(response);
                });
            },
            setCurrentCarro(carro, index){

                this.currentCarro = carro;
                this.currentIndex = index;
            },
            remCarro(carro, index){

                CarroDataService.delete(carro.placa)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                })
            },
            refreshList() {
                this.listarCarros();
                this.currentCarro = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarCarros();
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