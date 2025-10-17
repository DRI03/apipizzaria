// atualizar o index.jx

//1.importa a ferramenta Express

import express from 'express'

// 2. Cria a nossa explicação (nosso servidor)

const app = express();

//habilita o Express para entender o formato JSON no corpo das requisições
app.use(express.json());


// 3. Define a porta em que o servidor vai "executar" os pedidos

 const PORTA = 3333;

 // 4. Manda o servidor ficar "executando" na porta  definida
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
 { id: 3, nome: "Pedro Almeida",email: " pedro.almeida@example.com" }
 ]

 // Rota para listar TODOS os clientes ( seu código original)

 app.get('/clientes',(req,resp) => {
 resp.json(listaDeClientes);
 })


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

console.log(" Recebemos um novo cliente", novoCliente );

resp.json({message: `Cliente ${novoCLiente} cadastrado com sucesso!!`,
data: novoCliente });

})


 