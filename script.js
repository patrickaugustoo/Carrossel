// # Variáveis para capturar Elementos:

    // Botões para movimentar o Slider
    const prevButton = document.querySelector('[data-slide="prevButton"]');
    const nextButton = document.querySelector('[data-slide="nextButton"]');

    // Array com todas Categorias
    const listagemGeralCategorias = [...document.querySelectorAll('.categoria')];

    // Array com as Categorias Visíveis
    let listagemCategoriasAtivas = [...document.querySelectorAll('[data-slide="ativo"]')];

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

    // Quantidade de Clones
    let listagemClones = listagemGeralCategorias.length - listagemCategoriasAtivas.length;


// # Variáveis Importantes:

    // $ Definir o indíce onde começa as Categorias Ativas
    // O carrossel começa a partir do index 09 por conta dos clones anteriores para dar o efeito de loop
    let indiceInicial = 10;
    let indiceFinal = 20;

    // Variável que armazena a quantidade de Categorias Visíveis
    const visibleCategoriesQntd = indiceFinal - indiceInicial;

    // Define o gap entre os elementos
    const gapValue = 8;

    // Definir posição inicial do Carrossel em Pixels
    initialTranslateX = calcularDeslocamento(10);

    // Precisamos definir uma variável que vai armazenar o deslocamento do carrossel
    let currentTranslateX = initialTranslateX;


    // Captura a largura do primeiro item do Carrossel para usar como Cálculo
    // Necessário duas váriaveis para evitar erro de cálculo
    let itemReferenceWidthInitial = listagemCategoriasAtivas[0].getBoundingClientRect().width;
    const itemReferenceWidth = itemReferenceWidthInitial;

// # Métodos & Funções

    // Centralizar o carrossel nas Categorias ativas
    containerCategorias.style.transform = `translateX(${-currentTranslateX}px)`;


    // $ Função para passar para próxima Categoria
    function nextCategoria(){

        setTimeout(() => {
            verificarIndice('direita');
        }, 150);

    }

    // $ Função para passar para voltar Categoria
    function prevCategoria(){

        setTimeout(() => {
            verificarIndice('esquerda');
        }, 150);

    }

    // $ Função para Calcular o Deslocamento em Pixels
    function calcularDeslocamento(indiceReferencia){

        return listagemGeralCategorias
        .slice(0, indiceReferencia)
        .reduce((contador, item) => {
            const itemWidth = item.getBoundingClientRect().width;
            return contador + itemWidth + gapValue;
        }, 0);

    }

    function atualizarListagemCategoriasAtivas(indiceInicial, indiceFinal){

        // Atualiza listagemCategoriasAtiva
        listagemCategoriasAtivas = listagemGeralCategorias.slice(indiceInicial, indiceFinal);

        // Atualiza as listas de categorias de acordo com as novas categorias visíveis
        listagemCategoriasMedio = [listagemCategoriasAtivas[1], listagemCategoriasAtivas[8]];
        listagemCategoriasGrande = listagemCategoriasAtivas.slice(2, 8);

    }
    
    // $ Função responsável por aplicar estilos CSS nas categorias
    function estilizarCategorias(animacao) {

        // Remove as classes anteriores
        listagemGeralCategorias.forEach( cat => {
            cat.className = 'categoria'; // Remove qualquer classe anterior
            cat.style.transition = animacao === true ? 'all 0.3s' : 'none';
        });

        // Adiciona as novas classes
        listagemCategoriasGrande.forEach( cat => {
            cat.classList.add('grande'); // Adiciona a classe 'grande'
        });

        listagemCategoriasMedio.forEach( cat => {
            cat.classList.add('medio'); // Adiciona a classe 'medio'
        });

    }

    // $ Função responsável pelo deslocamento do Carrossel
    function deslocarCarrosselNormal(sentido) {
         
        // Calcular deslocamento total
        let deslocamentoAtual;
        if (sentido === 'direita' && indiceFinal <= listagemGeralCategorias.length) {
            deslocamentoAtual = currentTranslateX + calcularDeslocamento(1);
            // Atualiza os índices de categorias visíveis (atualiza para a próxima parte)
            indiceInicial++;
            indiceFinal++;
        } else if (sentido === 'esquerda') {
            deslocamentoAtual = currentTranslateX - (itemReferenceWidth + gapValue); // Deslocar para a esquerda
            // Atualiza os índices de categorias visíveis (atualiza para a próxima parte)
            indiceInicial--;
            indiceFinal--;
        }

        // Atualiza as Categorias Ativas e Arrays relacionados
        atualizarListagemCategoriasAtivas(indiceInicial, indiceFinal);

        // Aplica estilos às categorias
        estilizarCategorias(true);

        // Aplica o deslocamento ao container
        containerCategorias.style.transform = `translateX(${ -deslocamentoAtual }px)`; 

        // Atualiza o deslocamento do translateX conforme o valor calculado
        currentTranslateX = deslocamentoAtual;

        containerCategorias.style.transition = `transform 0.3s`;

        if (indiceFinal == listagemGeralCategorias.length || indiceInicial == 0){
            containerCategorias.addEventListener('transitionend', manipulartransicao);
        }


    }

    function manipulartransicao(){

        if(indiceFinal == listagemGeralCategorias.length){

            // Aplica o deslocamento ao container
            containerCategorias.style.transition = `none`;
            containerCategorias.style.transform = `translateX(${ -initialTranslateX }px)`; 
            indiceInicial = 10;
            indiceFinal = 20;
    
            // Atualiza as Categorias Ativas e Arrays relacionados
            atualizarListagemCategoriasAtivas(indiceInicial, indiceFinal);
    
            // Aplica estilos às categorias
            estilizarCategorias(false);
    
    
            // Atualiza o deslocamento do translateX conforme o valor calculado
            currentTranslateX = initialTranslateX;

        }

        if(indiceInicial == 0){

            // Aplica o deslocamento ao container
            containerCategorias.style.transition = `none`;
            containerCategorias.style.transform = `translateX(${ -784 }px)`; 
            indiceInicial = 14;
            indiceFinal = 24;
    
            // Atualiza as Categorias Ativas e Arrays relacionados
            atualizarListagemCategoriasAtivas(indiceInicial, indiceFinal);
    
            // Aplica estilos às categorias
            estilizarCategorias(false);
    
    
            // Atualiza o deslocamento do translateX conforme o valor calculado
            currentTranslateX = 784;

        }
    
            containerCategorias.removeEventListener('transitionend', manipulartransicao);

    }

    function verificarIndice(sentido){

        if(indiceInicial == 0) {
            return deslocarCarrosselNormal(sentido);
        }

        if(indiceFinal == listagemGeralCategorias.length - 1) {
            return  deslocarCarrosselNormal(sentido);           
        }

        deslocarCarrosselNormal(sentido);

    }



    // Evento para avançar
    nextButton.addEventListener('click', nextCategoria);
    prevButton.addEventListener('click', prevCategoria);