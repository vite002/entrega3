<template>
   <div id="tab_aut">
            <h3>Autenticacação</h3>
            <form>
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputId">Id:</label>
                    <input class="form-control" type="text" v-model="funcionario.id" id="inputId">
                    </div>
                
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputASenha">Senha:</label>
                    <input class="form-control" type="password" v-model="funcionario.senha" id="inputASenha">
                </div>
                
                <button class="btn btn-primary" @click='createFuncionarioForm()' type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </form>                                      
        </div>
</template>
<script>

    import FuncionarioDataService from '../services/FuncionarioDataService'

    export default{
     name:'login',
     data() {
            return {
                funcionario: {id: '', senha: ''}
            }
        },
        methods: {
            createFuncionarioForm(){

                console.log('chamou o createFuncionarioForm');

                const f = {id: this.funcionario.id,
                           senha: this.funcionario.senha
                        }                                    

                FuncionarioDataService.authenticate(f).then(response =>{

                    console.log("Retorno do seviço authenticateFuncionario", response.status);
                    if(response.status == 201 || response.status == 200){

                        alert('Funcionario '+ response.data.id + ' authenticate com sucesso');       
                        
                        this.setAuthenticated({id: response.data.id})
                        
                        this.$router.push({name: "home"});

                    }else if(response.status == 204){

                        alert('id ou senha inválidos ! ');
                    }

                    this.clearForm();
                }
                ).catch(response => {

                    // error callback
                    alert('Não conectou no serviço authenticateFuncionario '+ response);
                   // console.log(response);
                });


            },
            clearForm(){
                this.funcionario.id = "";
                this.funcionario.senha = "";
            },
            setAuthenticated(funcionario){

                localStorage.setItem('authUser', JSON.stringify(funcionario));
                
            }

        }

    }
</script>
   
<style scoped>
    
</style>