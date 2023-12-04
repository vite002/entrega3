<template>
<div id="tab_aut">
    <div v-if="currentPeca" class="edit-form">       
                <h3>Peça</h3>

        <form>
       
        <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="currentPeca.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="currentPeca.nome" class="form-control" id="inputNome">
        </div>            
        <div class="form-group">
                <label for="inputCarro_cliente">Placa do carro:</label>
                <input type="text" v-model="currentPeca.carro_cliente" class="form-control" id="inputCarro_cliente">
        </div>
            
        </form>
            <button class="badge badge-success" @click="updatePeca">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deletePeca">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>
    </div>     
 <div v-else>
            <br />
            <p>Please click on a Peça...</p>
        </div>


</div>
</template>

<script>

    import PecaDataService from '../../services/PecaDataService'

    export default {
        name: "editPeca",
        data(){
            return {
                     currentPeca: null, 
                     message: ''
                        }            
        },
        methods: {

            getPeca(id){

                PecaDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentPeca = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
             updatePeca(){

                PecaDataService.update(this.currentPeca)
                .then(response => {
                    console.log('PecaDataService.update');
                    this.message = 'Peça alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
             deletePeca(){

                PecaDataService.delete(this.currentPeca.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "pecas-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "pecas-list" });
            }

        },
        mounted() {    
            this.message = '';
            this.getPeca(this.$route.params.id);
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>