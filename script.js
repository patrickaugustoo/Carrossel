// # Variáveis para capturar Elementos:

    // Botões para movimentar o Slider
    const prevButton = document.querySelector('[data-slide="prevButton"]');
    const nextButton = document.querySelector('[data-slide="nextButton"]');

    // Array com todas Categorias
    const listagemGeralCategorias = [...document.querySelectorAll('.categoria')];

    // Array com as Categorias Visíveis
    let listagemCategoriasAtiva = [...document.querySelectorAll('[data-slide="ativo"]')];

    // Arrays para distinguir e estilizar as Categorias
    let listagemCategoriasGrande = [...document.querySelectorAll('.grande')];
    let listagemCategoriasMedio = [...document.querySelectorAll('.medio')];

    // Pegar o tamanho do Container de Corte
    const containerCorte = document.querySelector(".box-corte");
    const containerCorteWidth = containerCorte.offsetWidth;

    // Container que tem todas Categorias
    const containerCategorias = document.querySelector('[data-slide="containerCategorias"]');

    // Capturar os Clones anteriores
    let prevClones = [...document.querySelectorAll('[data-slide="prevClone"]')]


// # Variáveis Importantes:

    // Definir o indíce onde começa as Categorias Ativas
    // O carrossel começa a partir do index 10 por conta dos clones anteriores para dar o efeito de loop
    const currentIndex = 10; 

    // Precisamos definir uma variável que vai armazenar o deslocamento do carrossel
    let currentTranslateX;

    // Calcular tamanho de deslocamento inicial do Container
    let prevClonesWidth = prevClones.reduce((contador, item, index) => {

        let gapValue = 8; // Define o gap entre os elementos
        const itemWidth = item.getBoundingClientRect().width; // Pega a largura de cada item

        // Realiza a soma de todos items do prevClone colocando 8px de gap
        return contador + itemWidth + gapValue;
    }, 0);

    // Atualiza o deslocamento do tranlateX inicialmente após calcular o tamanho dos Clones
    currentTranslateX = prevClonesWidth; 

    // $ Importante
    // Variáveis que definem o index do Carrossel
    let indiceInicial = 9;
    let indiceFinal = 19;


// # Métodos & Funções

    // Centralizar o carrossel nas Categorias ativas
    containerCategorias.style.transform = `translateX(${-currentTranslateX}px)`;

    // Função para passar para próxima Categoria
    function nextCategoria(){

        // Como o carrossel tem que ir para frente, o valor deve ser negativo
        deslocamentoCarrossel('direita');
        
        // Atualiza os índices de categorias visíveis (atualiza para a próxima parte)
        indiceInicial++;
        indiceFinal++;

        // Atualiza listagemCategoriasAtiva
        listagemCategoriasAtiva = listagemGeralCategorias.slice(indiceInicial, indiceFinal);

        // Atualiza as listas de categorias de acordo com as novas categorias visíveis
        let listagemCategoriasNormal = [listagemCategoriasAtiva[0], listagemCategoriasAtiva[9]];
        let listagemCategoriasMedio = [listagemCategoriasAtiva[1], listagemCategoriasAtiva[8]];
        let listagemCategoriasGrande = listagemCategoriasAtiva.slice(2, 8);

        // Aplica estilos às categorias
        estilizarCategorias(listagemCategoriasAtiva, listagemCategoriasGrande, listagemCategoriasMedio);

    }

    // Função para passar para voltar Categoria
    function prevCategoria(){

        // Como o carrossel tem que ir para frente, o valor deve ser negativo
        deslocamentoCarrossel('esquerda');
        
        // Atualiza os índices de categorias visíveis (atualiza para a próxima parte)
        indiceInicial--;
        indiceFinal--;

        // Atualiza listagemCategoriasAtiva
        listagemCategoriasAtiva = listagemGeralCategorias.slice(indiceInicial, indiceFinal);

        // Atualiza as listas de categorias de acordo com as novas categorias visíveis
        let listagemCategoriasNormal = [listagemCategoriasAtiva[0], listagemCategoriasAtiva[9]];
        let listagemCategoriasMedio = [listagemCategoriasAtiva[1], listagemCategoriasAtiva[8]];
        let listagemCategoriasGrande = listagemCategoriasAtiva.slice(2, 8);

        // Aplica estilos às categorias
        estilizarCategorias(listagemCategoriasAtiva, listagemCategoriasGrande, listagemCategoriasMedio);
        
    }

    // $ Função responsável pelo deslocamento do Carrossel
    function deslocamentoCarrossel(sentido) {

        // # Calcular valor de deslocamento
            // Define o gap entre os elementos
            let gapValue = 8; 

            // Pega a largura do primeiro item da lista de Categoria Ativa para ter referência
            let itemReferenceWidth = listagemCategoriasAtiva[0].getBoundingClientRect().width; 

        // Calcular deslocamento total
        let deslocamentoAtual;
        if (sentido === 'direita') {
            deslocamentoAtual = currentTranslateX + itemReferenceWidth + gapValue; // Deslocar para a direita
        } else {
            deslocamentoAtual = currentTranslateX - (itemReferenceWidth + gapValue); // Deslocar para a esquerda
        }

        // Aplica o deslocamento ao container
        containerCategorias.style.transform = `translateX(${ -deslocamentoAtual }px)`; 

        // Atualiza o deslocamento do translateX conforme o valor calculado
        currentTranslateX = deslocamentoAtual;

    }

    // $ Função responsável por aplicar estilos CSS nas categorias
    function estilizarCategorias(listagemCategoriasAtiva, listagemCategoriasGrande, listagemCategoriasMedio) {

        // Remove as classes anteriores
        listagemCategoriasAtiva.forEach( cat => {
            cat.className = 'categoria'; // Remove qualquer classe anterior
        });

        // Adiciona as novas classes
        listagemCategoriasGrande.forEach( cat => {
            cat.classList.add('grande'); // Adiciona a classe 'grande'
        });

        listagemCategoriasMedio.forEach( cat => {
            cat.classList.add('medio'); // Adiciona a classe 'medio'
        });

    }

    // Evento para avançar
    nextButton.addEventListener('click', nextCategoria);
    prevButton.addEventListener('click', prevCategoria);
