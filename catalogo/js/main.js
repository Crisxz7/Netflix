// Importa os dados das categorias (objetos com filmes/séries)
import { categories } from './data.js';

// Importa função para criar o carrossel HTML de cada categoria
import { createCarousel } from './components/Carousel.js';

// Aguarda o DOM ser completamente carregado antes de manipular elementos
document.addEventListener('DOMContentLoaded', () => {
    // Lê nome e imagem do perfil armazenados no localStorage
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    // Se os dados existirem, atualiza os elementos da navbar
    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link'); // item de perfil na navbar
        const profileIcon = document.querySelector('.profile-icon'); // ícone do perfil
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    // Seleciona o container onde os carrosséis serão injetados
    const container = document.getElementById('main-content');
    
    // Se o container existir, cria e anexa cada carrossel de categoria
    if (container) {
        categories.forEach(category => {
            // Cria estrutura DOM do carrossel baseado na categoria atual
            const carousel = createCarousel(category);
            // Adiciona o carrossel na página
            container.appendChild(carousel);
        });
    }
});
