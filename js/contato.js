var formContato = document.querySelector("#form-contato");
var mensagemSucesso = document.querySelector("#mensagem-sucesso");

formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    var formularioValido = true;

    var campoNome = formContato.nome;
    var campoEmail = formContato.email;
    var campoAssunto = formContato.assunto;
    var campoMensagem = formContato.mensagem;

    formularioValido = validarTexto(campoNome) && formularioValido;
    formularioValido = validarEmail(campoEmail) && formularioValido;
    formularioValido = validarSelect(campoAssunto) && formularioValido;
    formularioValido = validarTexto(campoMensagem) && formularioValido;

    if (!formularioValido) {
        mensagemSucesso.classList.remove("ativo");
        return;
    }

    salvarContato({
        nome: campoNome.value,
        email: campoEmail.value,
        assunto: campoAssunto.value,
        mensagem: campoMensagem.value
    });
});

// Valida campos de texto simples (não pode estar vazio)
function validarTexto(campo) {
    var divCampo = campo.closest(".campo");

    if (campo.value.trim() === "") {
        divCampo.classList.add("campo-invalido");
        return false;
    }

    divCampo.classList.remove("campo-invalido");
    return true;
}

// Valida o campo de e-mail com uma expressão regular simples
function validarEmail(campo) {
    var divCampo = campo.closest(".campo");
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(campo.value.trim())) {
        divCampo.classList.add("campo-invalido");
        return false;
    }

    divCampo.classList.remove("campo-invalido");
    return true;
}

// Valida se uma opção foi escolhida no select
function validarSelect(campo) {
    var divCampo = campo.closest(".campo");

    if (campo.value === "" || campo.value === "selecione") {
        divCampo.classList.add("campo-invalido");
        return false;
    }

    divCampo.classList.remove("campo-invalido");
    return true;
}

// Simula o envio dos dados para um banco de dados (usando localStorage)
function salvarContato(contato) {
    var listaContatos = JSON.parse(localStorage.getItem("contatos")) || [];
    listaContatos.push(contato);
    localStorage.setItem("contatos", JSON.stringify(listaContatos));

    console.log("Contato salvo (simulação de banco de dados):", contato);

    formContato.reset();
    mensagemSucesso.classList.add("ativo");

    // Some sozinha depois de alguns segundos
    setTimeout(function () {
        mensagemSucesso.classList.remove("ativo");
    }, 5000);
}
