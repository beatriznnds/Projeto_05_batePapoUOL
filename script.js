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
    promiseNome.then(res => {
        mensagemStatus();
        setInterval(manterConexao, 5000);
        setInterval(mensagemStatus, 3000);
    });
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
        mensagens= document.querySelector(".box");
        mensagens.innerHTML = "";
        for (let i=0; i < res.data.length; i++) {
            if (res.data[i].type === "status") {
                mensagens.innerHTML += `
                <div class="mensagens-status">
                    <p>
                        <span class="horario">(${res.data[i].time})</span>            
                        <span class="mensagem-usuario">${res.data[i].from}</span>
                        <span class="status-usuario">entra na sala...</span>
                    </p>
                </div>`
            } if (res.data[i].type === "message") {
                mensagens.innerHTML += `
                <div class="mensagem-normais">
                    <p class="horario">
                        <span>(${res.data[i].time})              
                        </span>
                    </p>
                    <p class="mensagem-usuario">
                        <span>${res.data[i].from}</span>
                    </p>
                    <p class="status-usuario">
                        <span>para</span>
                    </p>
                    <p class="mensagem-usuario">
                        <span>${res.data[i].to}:</span>
                    </p>
                    <p class="status-usuario">
                        <span>${res.data[i].text}</span>
                    </p>
                </div>`
            }
        }
        let ultimaMensagem = mensagens.lastChild;
        ultimaMensagem.scrollIntoView();
    })
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


function enviarMensagem () {
    mensagemEnviar = {
        from: nomeUsuario.name,
        to: "Todos",
        text: document.querySelector(".texto-mensagem").value,
        type: "message",
    }
    const promiseEnvio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEnviar);
    document.querySelector(".texto-mensagem").value = "";
    promiseEnvio.then(mensagemStatus);
}


