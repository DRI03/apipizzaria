import fs from 'node:fs/promises';


  async function lerCardapio(){
  console.log(`PIZZARIA DO OSAMU DAZAI`)
}

 try {
   const lista=await fs.readFile (`pizza.txt`,`utf-8`)

    console.log(`Lista de pizzas: ${lista}`)

 } catch (error) {
    console.error(` ${error}`)
    
 }
 lerCardapio() 
    

