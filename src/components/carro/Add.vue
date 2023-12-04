<template>
    <div class="submit-form">
    <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputPlaca">Placa:</label>
            <input type="text" v-model="carro.placa" class="form-control" id="inputPlaca">
        </div>
        <div class="form-group">
            <label for="inputAno">Ano:</label>
            <input type="number" v-model="carro.ano" class="form-control" id="inputAno">
        </div>            
        <div class="form-group">
                <label for="inputModelo">Modelo:</label>
                <input type="text" v-model="carro.modelo" class="form-control" id="inputModelo">
        </div>
            
  
        <button @click="saveCarro" class="btn btn-success">Salvar</button>
        <router-link to="/carros" class="btn btn-success">Voltar</router-link>                
    </div>

      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newCarro">Novo</button>
        <router-link to="/carros" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
</template>

<script>

    import CarroDataService from '../../services/CarroDataService'

    export default {
        name: "addCarro",
        data(){
            return {
                carro: {indice: '', 
                                    placa: '', 
                                    ano: '',
                                    modelo: '',
                        },
                        submitted: false,

                    }
        },
        methods: {

            saveCarro(){

                var car = jQuery.extend({}, this.carro);//clona o this.novo_carro e armazena na variavel carro. dessa forma alteracoes em this.novo_carro nao irao refletir em carro.
          
                if (car.placa.trim().length > 0 && car.ano.trim().length > 0 &&  car.modelo.trim().length > 0) {
                
                    CarroDataService.create(car)
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
            newCarro(){

                this.submitted = false;
                this.carros = {};
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