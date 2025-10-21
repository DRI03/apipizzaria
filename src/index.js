// atualizar o index.jx

//1.Primeira linha do seu projeto. Carrega as váriaveis de ambiente antes de qualquer outro código

import 'dotenv/config';

// Sintaxe de importação para todas as depêndencias

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url'; //necessário para recriar o '_dirname'.
import db from './db/db.js'; // excluir depois

// --- CONFIGURAÇÕES ---

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const corsOptions={ 
origin: ['http://locahost:3333','https://meudominio.com'],
methods: 'GET,POST,PUT,PATCH,DELETE',
credentials: true,

};
// -- INICIALIZAÇÃO DO APP -- 

const app = express();

// --  MODDLEWARES -- 

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json()); 

// servindo pasta 'public' para arquivos (css, jv, imagens)

app.use(express.static(path.join(_dirname, "..", 'public')));

// -- ROTAS -- 
//ROTA PRINCIPAL
 app.get('/',(req,resp)=>
  resp.sendFile(path.join(_dirname, '..','pages', 'html'))
 
 );
// -- TRATAMENDO DE ERRO -- 
// Um middleware de erro centralizado
app.use(( err,req,resp, next)=>{
 console.error(err.stack);

 resp.status(500).send('Algo deu errado no servidor!');

});

 // -- INICIALIZAÇÃO DO SERVIDOR --

 const PORTA = process.env.PORT || 3333;
 app.listen(PORTA,() => {

console.log(`O servidor rodando na porta ${PORTA}. Acesse http:///localhost:
${ PORTA}`)

 })


 // rota principal de aplicação
 app.get('/',(request,response)=> {
 // req = Requisição  (Dados do pedido do cliente)
 // res = Resposta ( o que vamos evitar de volta)

 // Estamos evitando uma resposta no formato 350N

 response.json({ message: " Bem vindo á API  da Pizzaria Senac"})


 })

 //Seus dados moldados (simulando o banco de dados)
 const listaDeClientes= [
 { id: 1, nome: "João Silva", email: "joao.silva@example.com"},
 { id: 2, nome: "Maria Santos", email: "maria.santos@example.com" },

 ]




 app.get('/cliente/:id',(req,resp) =>{

 
// 1. captura o Id de URL e converte para número

const idCliente = parseInt(req.params.id);

// 2. Procura o cliente no array usado o metodo find()
const cliente = listaDeClientes.find(c=> c.id === idCliente );

// 3. verifica se o cliente foi encontrado

if (cliente) {
    // se encontrou retorna o cliente com status 200 (OK)
    resp.json(cliente);

}else{
    // se não encontrou, retorna um erro 404 (NOT FOUND )

    resp.status(404).json({ mensagem: " CLiente não encontrado"});
}
 
 });

// Rota para criar um novo cliente

app.post('/cliente',(req,resp)=> {

// O midLeware express.json() pega o corpo da requisição e o coloca em req.body

const novoCliente = req.body;

console.log(" Criamos um novo cliente", novoCliente );

resp.json({message: `Cliente ${novoCLiente} cadastrado com sucesso!!`,
data: novoCliente });

})


