<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputId">Id:</label>
            <input type="text" v-model="cliente.id" class="form-control" id="inputId" disabled>
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="cliente.nome" class="form-control" id="inputNome">
        </div>            
        <div class="form-group">
                <label for="inputCpf">CPF:</label>
                <input type="text" v-model="cliente.cpf" class="form-control" id="inputCpf">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="cliente.senha" class="form-control" id="inputSenha">
        </div>
        <div class="form-group">
            <label for="inputEndereo">Endereço:</label>
            <input type="text" v-model="cliente.endereco" class="form-control" id="inputEndereco">
        </div>
        <div class="form-group">
            <label for="inputObservacao">Observação:</label>
            <input type="text" v-model="cliente.observacao" class="form-control" id="inputObservacao">
        </div>
         <div class="form-group">
            <label for="inputData_ultimo_servico">Data do último serviço:</label>
            <input type="date" v-model="cliente.data_ultimo_servico" class="form-control" id="inputData_ultimo_servico">
        </div>
        <div class="form-group">
            <label for="selectCarro">Carros:</label>
            <select v-model="cliente.carros" class="form-control" id="selectCarro" multiple>                                
                <option v-for="c in carros" :key ="c.codigo" v-bind:value="c">
                    {{ c.placa }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="saveCliente" class="btn btn-success">Salvar</button>
        <router-link to="/clientes" class="btn btn-success">Voltar</router-link>                

    </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newCliente">Novo</button>
        <router-link to="/clientes" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import ClienteDataService from '../../services/ClienteDataService'
    import CarroDataService from '../../services/CarroDataService'

    export default {
        name: "addCliente",
        data(){
            return {
                cliente: {indice: '', 
                                    id: '', 
                                    nome: '',
                                    cpf: '',
                                    senha: '',
                                    endereco: '',
                                    observacao: '',
                                    data_ultimo_servico: '',
                                    carros: []
                        },
                        submitted: false,

            }

        },
        methods: {

            saveCliente(){

                var cli = jQuery.extend({}, this.cliente);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
                                                         

                if ( cli.senha.trim().length > 0 &&  cli.nome.trim().length > 0 &&
                        cli.cpf.trim().length > 0 && cli.observacao.trim().length > 0 &&  cli.data_ultimo_servico.trim().length > 0 &&
                        cli.endereco.trim().length > 0) {
                
                    ClienteDataService.create(cli)
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
            newCliente(){

                this.submitted = false;
                this.cliente = {};
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
            }

        },
        mounted() {                        
            this.listCarros();

            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>