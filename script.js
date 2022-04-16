let nome = "";
let mensagemEnviar;
let res;
let mensagensEnviadas = [];



function pedirNome () {
    nome = prompt('Qual é seu nome?');
    nomeUsuario = {
        name: nome
    }
    const promiseNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario);
    promiseNome.then(mensagemStatus);
    promiseNome.catch(ErroNome);
}

function ErroNome (error) {
    if (error.response.status === 400) {
        pedirNome();
    }
}

pedirNome();

function mensagemStatus () {
    const mensagensStatus = document.querySelector(".mensagem-status");
    mensagensStatus.innerHTML = "";
    for (let i=0; i < mensagensStatus.length; i++) {
        mensagensStatus.innerHTML += `
            <p class="horario">
                <span>${resposta.data.time[i]}</span>            
            </p>
            <p class="mensagem-usuario">
                <span>${resposta.data.name[i]}</span>
            </p>
            <p class="status-usuario">
                <span>entra na sala...</span>
            </p>`
    }
}

mensagemStatus();

function manterConexao () {
    const promiseConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);

}

function procurarParticipantes () {
    const promiseParticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promiseParticipantes.then(res => {console.log(res.data)})
}


function carregarMensagens () {
    const promiseMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promiseMensagens.then(processarResposta);
}


function processarResposta (resposta) {
    mensagensEnviadas = resposta.data;
    const time = resposta.data.time[i];
    const from = resposta.data.from[i];
    const to = resposta.data.to[i];
    const text = resposta.data.text[i];
    const type = resposta.data.type[i];

    console.log(mensagensEnviadas);
}

function carregarChat () {
    const mensagensGerais = document.querySelector(".mensagem-normais");
    mensagensGerais.innerHTML = "";
    for (let i =0; i < mensagensEnviadas.length; i++) {
        mensagensGerais.innerHTML +=     `      
            <p class="horario">
                <span>${resposta.data.time[i]}                
                </span>
            </p>
            <p class="mensagem-usuario">
                <span>${resposta.data.name[i]}</span>
            </p>
            <p class="status-usuario">
                <span>para</span>
            </p>
            <p class="mensagem-usuario">
                <span>${resposta.data.for[i]}</span>
            </p>
            <p class="status-usuario">
                <span>${resposta.data.text[i]}</span>
            </p>`
    }
}

function enviarMensagem () {
    mensagemEnviar = {
        from: nomeUsuario.name,
        to: "Todos",
        text: document.querySelector(".texto-mensagem").value,
        type: "message",
    }
    const promiseEnvio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEnviar);
    promiseEnvio.then(carregarChat);
}

enviarMensagem();


function iniciarChat () {
    pedirNome();
    manterConexao();
    procurarParticipantes();
    carregarMensagens();
    enviarMensagem();
    setTimeout(iniciarChat, 5000);
}
