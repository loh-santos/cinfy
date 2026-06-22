// Lista de filmes do catálogo (dados fixos, sem banco de dados real)
var filmes = [
    {
        titulo: "10 Coisas que Eu Odeio em Você",
        genero: "Romance, Comédia",
        ano: 1999,
        nota: 7.3,
        imagem: "img/10-coisas-que-eu-odeio-em-voce.jpg",
        sinopse: "Uma estudante independente se envolve em um plano de namoro que acaba se transformando em um verdadeiro romance."
    },
    {
        titulo: "Conta Comigo",
        genero: "Drama, Aventura",
        ano: 1986,
        nota: 8.1,
        imagem: "img/conta-comigo.jpg",
        sinopse: "Quatro amigos embarcam em uma jornada para encontrar um garoto desaparecido e acabam descobrindo mais sobre si mesmos."
    },
    {
        titulo: "E.T. – O Extraterrestre",
        genero: "Ficção Científica, Família",
        ano: 1982,
        nota: 7.9,
        imagem: "img/et-o-extraterrestre.jpg",
        sinopse: "Um garoto faz amizade com um alienígena perdido na Terra e tenta ajudá-lo a voltar para casa."
    },
    {
        titulo: "Esqueceram de Mim",
        genero: "Comédia, Família",
        ano: 1990,
        nota: 7.7,
        imagem: "img/esqueceram-de-mim.jpg",
        sinopse: "Após ser esquecido em casa durante as férias, um menino precisa proteger sua casa de dois ladrões atrapalhados."
    },
    {
        titulo: "História de um Casamento",
        genero: "Drama, Romance",
        ano: 2019,
        nota: 7.9,
        imagem: "img/historia-de-um-casamento.jpg",
        sinopse: "Um casal enfrenta um doloroso processo de divórcio enquanto tenta preservar a relação familiar."
    },
    {
        titulo: "Loucademia de Polícia",
        genero: "Comédia",
        ano: 1984,
        nota: 6.7,
        imagem: "img/loucademia-de-policia.jpg",
        sinopse: "Um grupo de recrutas desajeitados entra para a academia de polícia, causando muita confusão e situações engraçadas."
    },
    {
        titulo: "Não Fale o Mal",
        genero: "Terror, Suspense",
        ano: 2022,
        nota: 6.6,
        imagem: "img/nao-fale-o-mal.webp",
        sinopse: "Um casal aceita um convite para visitar novos amigos, mas a viagem se transforma em um pesadelo perturbador."
    },
    {
        titulo: "Star Wars: Episódio III – A Vingança dos Sith",
        genero: "Ficção Científica, Ação",
        ano: 2005,
        nota: 7.6,
        imagem: "img/star-wars-iii.webp",
        sinopse: "Anakin Skywalker sucumbe ao lado sombrio da Força enquanto a República se transforma no Império Galáctico."
    },
    {
        titulo: "Tubarão",
        genero: "Suspense, Aventura",
        ano: 1975,
        nota: 8.1,
        imagem: "img/tubarao.jpg",
        sinopse: "Um enorme tubarão aterroriza uma cidade litorânea, levando um grupo improvável a enfrentá-lo."
    },
    {
        titulo: "WALL·E",
        genero: "Animação, Ficção Científica",
        ano: 2008,
        nota: 8.4,
        imagem: "img/wall-e.webp",
        sinopse: "Um pequeno robô solitário encontra uma nova missão ao conhecer uma robô enviada para investigar a Terra abandonada."
    }
];

var grade = document.querySelector("#grade-filmes");
var campoBusca = document.querySelector("#busca-filme");
var campoGenero = document.querySelector("#filtro-genero");
var modalFundo = document.querySelector("#modal-filme");
var modalConteudo = document.querySelector("#modal-conteudo");
var botaoFecharModal = document.querySelector("#modal-fechar");

// Monta a lista de gêneros únicos para o select de filtro
function montarGeneros() {
    var generosUnicos = [];

    for (var i = 0; i < filmes.length; i++) {
        var genero = filmes[i].genero;
        if (generosUnicos.indexOf(genero) === -1) {
            generosUnicos.push(genero);
        }
    }

    for (var j = 0; j < generosUnicos.length; j++) {
        var option = document.createElement("option");
        option.value = generosUnicos[j];
        option.textContent = generosUnicos[j];
        campoGenero.appendChild(option);
    }
}

// Cria o card HTML de um filme e devolve o elemento pronto
function criarCardFilme(filme) {
    var card = document.createElement("div");
    card.classList.add("filme-card");

    var img = document.createElement("img");
    img.src = filme.imagem;
    img.alt = "Pôster do filme " + filme.titulo;

    var info = document.createElement("div");
    info.classList.add("filme-info");

    var genero = document.createElement("span");
    genero.classList.add("filme-genero");
    genero.textContent = filme.genero;

    var titulo = document.createElement("h3");
    titulo.textContent = filme.titulo + " (" + filme.ano + ")";

    var nota = document.createElement("p");
    nota.classList.add("filme-nota");
    nota.textContent = "★ " + filme.nota.toFixed(1);

    info.appendChild(genero);
    info.appendChild(titulo);
    info.appendChild(nota);

    card.appendChild(img);
    card.appendChild(info);

    card.addEventListener("click", function () {
        abrirModal(filme);
    });

    return card;
}

// Renderiza a lista de filmes na tela, de acordo com a busca e o filtro
function renderizarFilmes() {
    grade.innerHTML = "";

    var termoBusca = campoBusca.value.toLowerCase();
    var generoEscolhido = campoGenero.value;

    var filmesFiltrados = filmes.filter(function (filme) {
        var nomeCombina = filme.titulo.toLowerCase().indexOf(termoBusca) !== -1;
        var generoCombina = generoEscolhido === "todos" || filme.genero === generoEscolhido;
        return nomeCombina && generoCombina;
    });

    if (filmesFiltrados.length === 0) {
        var aviso = document.createElement("p");
        aviso.classList.add("sem-resultado");
        aviso.textContent = "Nenhum filme encontrado com esses filtros.";
        grade.appendChild(aviso);
        return;
    }

    for (var i = 0; i < filmesFiltrados.length; i++) {
        var card = criarCardFilme(filmesFiltrados[i]);
        grade.appendChild(card);
    }
}

// Abre o modal com os detalhes do filme clicado
function abrirModal(filme) {
    modalConteudo.innerHTML = "";

    var img = document.createElement("img");
    img.src = filme.imagem;
    img.alt = "Pôster do filme " + filme.titulo;

    var titulo = document.createElement("h3");
    titulo.textContent = filme.titulo + " (" + filme.ano + ")";

    var genero = document.createElement("p");
    genero.innerHTML = "<strong>Gênero:</strong> " + filme.genero;

    var nota = document.createElement("p");
    nota.innerHTML = "<strong>Nota:</strong> ★ " + filme.nota.toFixed(1);

    var sinopse = document.createElement("p");
    sinopse.style.marginTop = "1em";
    sinopse.textContent = filme.sinopse;

    modalConteudo.appendChild(img);
    modalConteudo.appendChild(titulo);
    modalConteudo.appendChild(genero);
    modalConteudo.appendChild(nota);
    modalConteudo.appendChild(sinopse);

    modalFundo.classList.add("ativo");
}

function fecharModal() {
    modalFundo.classList.remove("ativo");
}

// Eventos
campoBusca.addEventListener("keyup", renderizarFilmes);
campoGenero.addEventListener("change", renderizarFilmes);
botaoFecharModal.addEventListener("click", fecharModal);

// Fecha o modal se clicar fora da caixa
modalFundo.addEventListener("click", function (event) {
    if (event.target === modalFundo) {
        fecharModal();
    }
});

// Inicialização da página
montarGeneros();
renderizarFilmes();
