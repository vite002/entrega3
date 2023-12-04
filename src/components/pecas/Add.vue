<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="peca.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="peca.nome" class="form-control" id="inputNome">
        </div>            
        <div class="form-group">
                <label for="inputCarro_cliente">Carro do cliente:</label>
                <input type="text" v-model="peca.carro_cliente" class="form-control" id="inputCarro_cliente">
        </div>
            
            
  
        <button @click="savePeca" class="btn btn-success">Salvar</button>
        <router-link to="/pecas" class="btn btn-success">Voltar</router-link>                
 </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newPeca">Novo</button>
        <router-link to="/pecas" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import PecaDataService from '../../services/PecaDataService'

    export default {
        name: "addPeca",
        data(){
            return {
                peca: {indice: '', 
                                    id: '', 
                                    nome: '',
                                    carro_cliente: '',
                        },
                        submitted: false,
                    }
        },
        methods: {

            savePeca(){

                var pec = jQuery.extend({}, this.peca);//clona o this.novo_peca e armazena na variavel peca. dessa forma alteracoes em this.novo_peca nao irao refletir em peca.                                            

                if (pec.nome.trim().length > 0 &&  pec.carro_cliente.trim().length > 0) {
                
                    PecaDataService.create(pec)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newPeca(){

                this.submitted = false;
                this.peca = {};
            }

        },
        mounted() {                        
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>