let nome = "";
let mensagemEnviar;
let res;
let mensagensEnviadas = [];
let enderecoAPI = "https://mock-api.driven.com.br/api/v6/uol/";
let mensagensStatus;
let mensagensChat;


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
    const promiseStatus = axios.get(`${enderecoAPI}messages`);
    promiseStatus.then(res => {
        mensagensStatus = document.querySelector(".box");
        mensagensStatus.innerHTML = "";
        for (let i=0; i < res.data.length; i++) {
            mensagensStatus.innerHTML += `
                <div class="box">
                    <div class="mensagem-status>
                        <p class="horario">
                            <span>(${res.data[i].time})</span>            
                        </p>
                        <p class="mensagem-usuario">
                            <span>${res.data[i].from}</span>
                        </p>
                        <p class="status-usuario">
                            <span>entra na sala...</span>
                        </p>
                </div>
                </div>`
        }
    })

    let ultimaMensagem = mensagensStatus.lastChild;
    ultimaMensagem.scrollIntoView();
}


mensagemStatus();

function manterConexao () {
    const promiseConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);

}

function procurarParticipantes () {
    const promiseParticipantes = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promiseParticipantes.then(res => {console.log(res.data)})
}

procurarParticipantes();

function carregarMensagens () {
    const promiseMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promiseMensagens.then (res => {
        mensagensChat = document.querySelector(".mensagem-normais");
        mensagensChat.innerHTML = "";
        for (let i=0; i < res.data.length; i++) {
            mensagensChat.innerHTML += `
            <div class="mensagem-normais">
                <p class="horario">
                    <span>${resposta.data[i].time}                
                    </span>
                </p>
                <p class="mensagem-usuario">
                    <span>${resposta.data[i].name}</span>
                </p>
                <p class="status-usuario">
                    <span>para</span>
                </p>
                <p class="mensagem-usuario">
                    <span>${resposta.data[i].for}</span>
                </p>
                <p class="status-usuario">
                    <span>${resposta.data[i].text}</span>
                </p>
            </div>`
        }
    })
}

carregarMensagens();

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
