let mensagens = [];


const nomeDaPessoa = prompt('Qual seu nome?');


recepcao();



    





function pergarDados(){ 
    

    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then( dadosChegaram ); 
    
}

   
function dadosChegaram(resposta){ 

    console.log(resposta);
    console.log(resposta.data);
    mensagens = resposta.data;
   // console.log(mensagens[indice]);
   


    renderizarMensagens(mensagens);
    
}

function renderizarMensagens(mensagemm){

    const ul = document.querySelector('ul')
        for (let indice = 0; indice < 100; indice++) {
       if(mensagemm[indice].type === 'status'){
         ul.innerHTML += 
         `<li>
            <div class="mensagem cinza" >
            ${mensagemm[indice].time} <strong>${mensagemm[indice].from}</strong> ${mensagemm[indice].text}
            </div>
         </li>`;
       } 
        if(mensagemm[indice].type === 'message'){
            ul.innerHTML += 
         `<li>
            <div class="mensagem branco" >
            ${mensagemm[indice].time} <strong>${mensagemm[indice].from}</strong> para <strong>${mensagemm[indice].to}</strong>: ${mensagemm[indice].text}
            </div>
         </li>`;
         
       }
       if(mensagemm[indice].type === 'private-message'){
        ul.innerHTML += 
     `<li>
        <div class="mensagem rosa" >
        ${mensagemm[indice].time} <strong>${mensagemm[indice].from}</strong> para <strong>${mensagemm[indice].to}</strong>: ${mensagemm[indice].text}
        </div>
     </li>`;
   }
  }
    
    ul.lastChild.scrollIntoView();
    
}


   function recepcao(){
    let dados = [ 
        {
        name: nomeDaPessoa
    }        
    ]
    
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dados[0]);
    requisicao.then(pergarDados);
    requisicao.catch(tratarError);

    //attStatus();



    function attStatus(){
        console.log(dados[0]);
        const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dados[0]);
        setInterval(attStatus, 5000);
    
    }



   
    function tratarError(erro){
        console.log(erro.response.status);
        alert('Digite outro nome, esse já está em uso!')
        if(erro.response.status == '400'){
        const nomeDaPessoa = prompt('Qual seu nome?');
        dados = [ 
    {
    name: nomeDaPessoa
}        
]
        }
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dados[0]);
        requisicao.then(pergarDados);
        requisicao.catch(tratarError);
        
    }
} 


function enviarMensagem(){
    let texto = document.querySelector('input')
    
    const textoo  = {
            from: nomeDaPessoa,
            to: "Todos",
            text: texto.value,
            type: "message" 
        }
    console.log(textoo);
    texto.innerHTML = "";
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', textoo); 
    console.log(promessa.data)
    
    promessa.then(pergarDados); 
    promessa.catch(mensagemNaoEnviada); 




}

function mensagemNaoEnviada(){
    console.log('nao consegui enviar a mensagem')
}

setInterval(resetando,30000);

function resetando(){
    
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
   
    pergarDados();
    
}














/*


let receitas = []; 

function pergarDados(){ 

    const promessa = axios.get('https://mock-api.driven.com.br/api/v2/tastecamp/receitas');
    promessa.then( dadosChegaram ); 
    
}
pergarDados();
   
function dadosChegaram(resposta){ 

    console.log(resposta);
    console.log(resposta.data);
    receitas = resposta.data;

    renderizarReceitas();
}


/* [
    {titulo:'Bolo de Chocolate', ingredientes:'ingredientes do bolo de chocolate', preparo:'preparo do bolo'},
    {titulo:'Pudim de leite condensado', ingredientes:'ingredientes do pudim', preparo:'preparo do púdim'},
    {titulo:'Brigadieiro', ingredientes:'ingredientes do brigadeiro', preparo:'preparo do brigadeiro'},    
];
 */

/*function renderizarReceitas(){
    // popular a lista de receitas no sidebar
    const ul = document.querySelector('.receitas');

    ul.innerHTML = '';

    for(let i = 0; i < receitas.length; i++){

        ul.innerHTML = ul.innerHTML + `
            <li>
                <ion-icon name="fast-food-outline"></ion-icon>
                ${receitas[i].titulo}
            </li>
        `;
    }
}

renderizarReceitas();

function adicionarReceita(){

    // pegar os dados preenchidos nos inputs
    const elementoTitulo = document.querySelector('.nome-receita');
    const elementIngredientes = document.querySelector('.ingredientes-receita');
    const elementoModoPreparo = document.querySelector('.modo-preparo-receita');

    // criar uma nova receita
    const novaReceita = {
        titulo: elementoTitulo.value,
        ingredientes: elementIngredientes.value,
        preparo: elementoModoPreparo.value
    }; 

    // enviar a receita (cartinha) para ser salva no servidor
    const promessa = axios.post('https://mock-api.driven.com.br/api/v2/tastecamp/receitas', novaReceita); 
    promessa.then( pergarDados ); // se der certo
    promessa.catch( deuErro ); // se der erro

    // adicionar essa receita na minha lista
    //receitas.push(novaReceita);

    // exibir ( renderizar ) a nova receita na tela ( html )
    renderizarReceitas();
}

function deuErro(erro){
    console.log(erro);
    alert('Algo deu errado, a receita não foi salva!');
}
*/




/*const dados = {
    name: "Pedrol"
};
const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', dados);

requisicao.then(tratarSucesso);
requisicao.catch(tratarError);

function tratarSucesso(abc){
    alert('oi');
}
function tratarError(abc){
    alert('erro');
}


const requisicao2 = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dados);

requisicao2.then(tratarSucesso2);
requisicao2.catch(tratarError2);

function tratarSucesso2(abc){
    alert('oi');
}
function tratarError2(abc){
    alert('erro');
}





const buscarMensagens = [
	{
		from: "Joao",
		to: "Todos",
		text: "entra na sala...",
		type: "status",
		time: "08:01:17"
	},
	{
		from: "Joao",
		to: "Todos",
		text: "Bom dia",
		type: "message",
		time: "08:02:50"
	},
]
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promessa.then(processarResposta);

function processarResposta(resposta) {
	console.log(resposta.data);
}*/