// # Variáveis para capturar Elementos:

    // Botões para movimentar o Slider
    const prevButton = document.querySelector('[data-slide="prevButton"]');
    const nextButton = document.querySelector('[data-slide="nextButton"]');

    // Array com todas Categorias
    const listagemGeralCategorias = [...document.querySelectorAll('.categoria')];

    // Array com as Categorias Visíveis
    let listagemCategoriasAtivas = [...document.querySelectorAll('[data-slide="ativo"]')];

    // Arrays para distinguir e estilizar as Categorias
    let listagemCategoriasTam01;
    let listagemCategoriasTam02;
    let listagemCategoriasTam03;
    let listagemCategoriasTam04;
    let listagemCategoriasTam05;
    let listagemCategoriasTam06;

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
    let indiceFinal = 21;

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
        listagemCategoriasTam01 = [listagemCategoriasAtivas[5]];
        listagemCategoriasTam02 = [listagemCategoriasAtivas[4], listagemCategoriasAtivas[6]];
        listagemCategoriasTam03 = [listagemCategoriasAtivas[3], listagemCategoriasAtivas[7]];
        listagemCategoriasTam04 = [listagemCategoriasAtivas[2], listagemCategoriasAtivas[8]];
        listagemCategoriasTam05 = [listagemCategoriasAtivas[1], listagemCategoriasAtivas[9]];
        listagemCategoriasTam06 = [listagemCategoriasAtivas[0], listagemCategoriasAtivas[10]];

    }
    
    // $ Função responsável por aplicar estilos CSS nas categorias
    function estilizarCategorias(animacao) {

        // Remove as classes anteriores
        listagemGeralCategorias.forEach( cat => {
            cat.className = 'categoria'; // Remove qualquer classe anterior
            cat.style.transition = animacao === true ? 'all 0.3s' : 'none';
        });

        // Adiciona as novas classes
        listagemCategoriasTam01[0].classList.add('tam-01');
        listagemCategoriasTam02[0].classList.add('tam-02');
        listagemCategoriasTam02[1].classList.add('tam-02');
        listagemCategoriasTam03[0].classList.add('tam-03');
        listagemCategoriasTam03[1].classList.add('tam-03');
        listagemCategoriasTam04[0].classList.add('tam-04');
        listagemCategoriasTam04[1].classList.add('tam-04');
        listagemCategoriasTam05[0].classList.add('tam-05');
        listagemCategoriasTam05[1].classList.add('tam-05');
        listagemCategoriasTam06[0].classList.add('tam-06');
        listagemCategoriasTam06[1].classList.add('tam-06');


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
            deslocamentoAtual = currentTranslateX - (calcularDeslocamento(1)); // Deslocar para a esquerda
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

        console.log('indice', indiceInicial);

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
            indiceFinal = 21;
    
            // Atualiza as Categorias Ativas e Arrays relacionados
            atualizarListagemCategoriasAtivas(indiceInicial, indiceFinal);
    
            // Aplica estilos às categorias
            estilizarCategorias(false);
    
    
            // Atualiza o deslocamento do translateX conforme o valor calculado
            currentTranslateX = initialTranslateX;

        }

        if(indiceInicial == 0){

            console.log('ativado loop');
            // Aplica o deslocamento ao container
            containerCategorias.style.transition = `none`;
            containerCategorias.style.transform = `translateX(${ -532 }px)`; 
            indiceInicial = 14;
            indiceFinal = 25;
    
            // Atualiza as Categorias Ativas e Arrays relacionados
            atualizarListagemCategoriasAtivas(indiceInicial, indiceFinal);
    
            // Aplica estilos às categorias
            estilizarCategorias(false);
    
    
            // Atualiza o deslocamento do translateX conforme o valor calculado
            currentTranslateX = 532;

            console.log(calcularDeslocamento(14));

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
