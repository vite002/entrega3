<template>
    <div class="submit-form">
      <div v-if="!submitted">       


         <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="servico.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputData_pedido">Data do pedido:</label>
            <input type="date" v-model="servico.data_pedido" class="form-control" id="inputData_pedido">
        </div>            
        <div class="form-group">
                <label for="inputData_previsao_entrega">Data de previsão de entrega:</label>
                <input type="date" v-model="servico.data_previsao_entrega" class="form-control" id="inputData_previsao_entrega">
        </div>
         <div class="form-group">
            <label for="selectPeca">Peças:</label>
            <select v-model="servico.pecas" class="form-control" id="selectPeca" multiple>                                
                <option v-for="p in pecas" :key ="p.codigo" v-bind:value="p">
                    {{ p.id }}
                    </option>
            </select>  
        </div> 
         <div class="form-group">
            <label for="selectCarro">Carros:</label>
            <select v-model="servico.carros" class="form-control" id="selectCarro" multiple>                                
                <option v-for="c in carros" :key ="c.codigo" v-bind:value="c">
                    {{ c.placa }}
                    </option>
            </select>
            
        </div>         
             
  
        <button @click="saveServico" class="btn btn-success">Salvar</button>
        <router-link to="/servicos" class="btn btn-success">Voltar</router-link>                
        </div>         

  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newServico">Novo</button>
        <router-link to="/servicos" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import ServicoDataService from '../../services/ServicoDataService';
    import CarroDataService from '../../services/CarroDataService';
    import PecaDataService from '../../services/PecaDataService';

    


    export default {
        name: "addServico",
        data(){
            return {
                servico: {indice: '', 
                                    id: '', 
                                    data_pedido: '',
                                    data_previsao_entrega: '',
                                    pecas : [],
                                    carros: [],
                                    submitted: false
                        }        
                    }
        },
        methods: {

            saveServico(){

                var ser = jQuery.extend({}, this.servico);//clona o this.novo_servico e armazena na variavel servico. dessa forma alteracoes em this.novo_servico nao irao refletir em servico.
                                                        

                if (ser.id.trim().length > 0 && ser.data_pedido.trim().length > 0 &&  ser.data_previsao_entrega.trim().length > 0) {
                
                    ServicoDataService.create(ser)
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
            newServico(){

                this.submitted = false;
                this.servico = {};
            },
            listCarros(){

                CarroDataService.list().then(response =>{

                console.log("Retorno do seviço CarroDataService.list", response.status);

                for(let c of response.data){

                    this.carros.push(c);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço CarroDataService.list');
                console.log(response);
                });               
            },
            listPecas(){

                PecaDataService.list().then(response =>{

                console.log("Retorno do seviço PecaDataService.list", response.status);

                for(let p of response.data){

                    this.pecas.push(p);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PecaDataService.list');
                console.log(response);
                });               
            }
           

        },
        mounted() {                        
            this.listCarros();
            this.listPecas();
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>