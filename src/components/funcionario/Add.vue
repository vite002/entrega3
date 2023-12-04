<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="funcionario.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="funcionario.nome" class="form-control" id="inputNome">
        </div>            
        <div class="form-group">
                <label for="inputCpf">CPF:</label>
                <input type="text" v-model="funcionario.cpf" class="form-control" id="inputCpf">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="funcionario.senha" class="form-control" id="inputSenha">
        </div>
        <div class="form-group">
            <label for="inputEndereo">Endereço:</label>
            <input type="text" v-model="funcionario.endereco" class="form-control" id="inputEndereco">
        </div>
        <div class="form-group">
            <label for="inputCargo">Cargo:</label>
            <input type="text" v-model="funcionario.cargo" class="form-control" id="inputCargo">
        </div>
         <div class="form-group">
            <label for="inputData_contratacao">Data dde contratação:</label>
            <input type="text" v-model="funcionario.data_contratacao" class="form-control" id="inputData_contratacao">
        </div>
            
            
  
        <button @click="saveFuncionario" class="btn btn-success">Salvar</button>
        <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>                

     </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newFuncionario">Novo</button>
        <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>
      </div>

    </div>
  </template>

<script>

    import FuncionarioDataService from '../../services/FuncionarioDataService'
    import CarroDataService from '../../services/CarroDataService'

    export default {
        name: "addFuncionario",
        data(){
            return {
                funcionario: {indice: '', 
                                    id: '', 
                                    nome: '',
                                    cpf: '',
                                    senha: '',
                                    endereco: '',
                                    cargo: '',
                                    data_contratacao: '',               
                                    

                                    },
                                    
                                    submitted: false,
            }            
        },
        methods: {

            saveFuncionario(){

                var fun = jQuery.extend({}, this.funcionario);//clona o this.novo_funcionario e armazena na variavel funcionario. dessa forma alteracoes em this.novo_funcionario nao irao refletir em funcionario.
                
                if ( fun.senha.trim().length > 0 &&  fun.nome.trim().length > 0 &&
                        fun.cpf.trim().length > 0 && fun.observacao.trim().length > 0 &&  fun.data_ultimo_servico.trim().length > 0 &&
                        fun.endereco.trim().length > 0) {
                
                    FuncionarioDataService.create(fun)
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
            newFuncionario(){

                this.submitted = false;
                this.funcionario = {};
            },

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