<template>
    <div id="tab_aut">
     
       <div v-if="currentCarro" class="edit-form">
            <h3>Carro</h3>
            <form>
                <div class="form-group">
            <label for="inputPlaca">Placa:</label>
            <input type="text" v-model="currentCarro.placa" class="form-control" id="inputPlaca" >
        </div>
        <div class="form-group">
            <label for="inputAno">Ano:</label>
            <input type="number" v-model="currentCarro.ano" class="form-control" id="inputAno">
        </div>            
        <div class="form-group">
                <label for="inputModelo">Modelo:</label>
                <input type="text" v-model="currentCarro.modelo" class="form-control" id="inputModelo">
        </div>
            </form>
            <button class="badge badge-success" @click="updateCarro">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteCarro">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Carro...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import CarroDataService from '../../services/CarroDataService'
 
     export default{
      name:'editCarro',
      data() {
             return {                
                currentCarro: null, 
                message: ''
                }    
             },
         methods: {

            getCarro(placa){

                CarroDataService.get(placa)
                .then(response => {
                    console.log(response.data);
                    this.currentCarro = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateCarro(){

                CarroDataService.update(this.currentCarro)
                .then(response => {
                    console.log('CarroDataService.update');
                    this.message = 'Carro alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteCarro(){

                CarroDataService.delete(this.currentCarro.placa)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "carros-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "carros-list" });
            }
         },
         mounted() {
            this.getCarro(this.$route.params.placa);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>