// Importa os dados das categorias (objetos com filmes/séries)
import { categories } from './data.js';

// Importa função para criar o carrossel HTML de cada categoria
import { createCarousel } from './components/Carousel.js';

// Importa o gerenciador de notificações
import { initNotificationBadge } from './notification-manager.js';

// Aguarda o DOM ser completamente carregado antes de manipular elementos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o badge de notificações
    initNotificationBadge();
    
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

    // Funcionalidade de pesquisa
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');

    // Toggle do campo de pesquisa ao clicar no ícone
    searchIcon.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            showAllMovies();
        }
    });

    // Pesquisa em tempo real
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            showAllMovies();
        } else {
            filterMovies(query);
        }
    });

    // Função para mostrar todos os filmes
    function showAllMovies() {
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            card.style.display = 'block';
        });
    }

    // Função para filtrar filmes
    function filterMovies(query) {
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
