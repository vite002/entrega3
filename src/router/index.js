import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/login'
import home from  '@/components/home'
import listFuncionarios from  '@/components/funcionario/List'
import editFuncionario   from  '@/components/funcionario/Edit'
import novoFuncionario   from  '@/components/funcionario/Add'

import listClientes from  '@/components/cliente/List'
import editCliente   from  '@/components/cliente/Edit'
import novoCliente   from  '@/components/cliente/Add'

import listServicos from  '@/components/servico/List'
import editServico   from  '@/components/servico/Edit'
import novoServico   from  '@/components/servico/Add'

import listPecas from  '@/components/pecas/List'
import editPeca   from  '@/components/pecas/Edit'
import novoPeca   from  '@/components/pecas/Add'

import listCarros from  '@/components/carro/List'
import editCarro   from  '@/components/carro/Edit'
import novoCarro   from  '@/components/carro/Add'


Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/clientes',
      name: 'clientes-list',
      component: listClientes    
    },
    {
      path: '/cliente/:id',
      name: "cliente-edit",
      component: editCliente
    },
    {
      path: '/addcliente',
      name: "cliente-add",
      component: novoCliente
    },
    {
      path: '/funcionarios',
      name: 'funcionarios-list',
      component: listFuncionarios   
    },
    {
      path: '/funcionario/:id',
      name: "funcionario-edit",
      component: editFuncionario
    },
    {
      path: '/addfuncionario',
      name: "funcionario-add",
      component: novoFuncionario
    },
    {
      path: '/pecas',
      name: 'pecas-list',
      component: listPecas    
    },
    {
      path: '/peca/:id',
      name: "peca-edit",
      component: editPeca
    },
    {
      path: '/addpeca',
      name: "peca-add",
      component: novoPeca
    },
    {
      path: '/servicos',
      name: 'servicos-list',
      component: listServicos   
    },
    {
      path: '/servico/:id',
      name: "servico-edit",
      component: editServico
    },
    {
      path: '/addservico',
      name: "servico-add",
      component: novoServico
    },
    {
      path: '/carros',
      name: 'carros-list',
      component: listCarros   
    },
    {
      path: '/carro/:id',
      name: "carro-edit",
      component: editCarro
    },
    {
      path: '/addcarro',
      name: "carro-add",
      component: novoCarro
    },
    
    
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;