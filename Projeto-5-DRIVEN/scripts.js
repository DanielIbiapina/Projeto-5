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
            <b>(${mensagemm[indice].time})</b> <strong>${mensagemm[indice].from}</strong> ${mensagemm[indice].text}
            </div>
         </li>`;
       } 
        if(mensagemm[indice].type === 'message'){
            ul.innerHTML += 
         `<li>
            <div class="mensagem branco" >
            <b>(${mensagemm[indice].time})</b> <strong>${mensagemm[indice].from}</strong> para <strong>${mensagemm[indice].to}</strong>: ${mensagemm[indice].text}
            </div>
         </li>`;
         
       }
       if(mensagemm[indice].type === 'private-message'){
        ul.innerHTML += 
     `<li>
        <div class="mensagem rosa" >
        <b>(${mensagemm[indice].time})</b> <strong>${mensagemm[indice].from}</strong> para <strong>${mensagemm[indice].to}</strong>: ${mensagemm[indice].text}
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

setInterval(resetando,3000);

function resetando(){
    
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
   
    pergarDados();
    
}

attStatus();
function attStatus(){
    let dados = [ 
        {
        name: nomeDaPessoa
    }        
    ]
    const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dados[0]);
    setInterval(attStatus, 5000);

    status.catch(saiuDaSala);

}

function saiuDaSala(){
    
}









