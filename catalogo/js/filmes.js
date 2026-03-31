// Importa os dados das categorias
import { categories } from './data.js';
import { createCard } from './components/Card.js';
import { initNotificationBadge } from './notification-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o badge de notificações
    initNotificationBadge();
    
    // Lê nome e imagem do perfil armazenados no localStorage
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    // Se os dados existirem, atualiza os elementos da navbar
    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    // Extrai todos os filmes de todas as categorias
    const allItems = [];
    categories.forEach(category => {
        allItems.push(...category.items);
    });

    // Filtra apenas os filmes
    const films = allItems.filter(item => item.type === 'film');

    // Renderiza os filmes em grid
    const filmsGrid = document.getElementById('films-grid');
    const filmCount = document.getElementById('film-count');

    filmCount.textContent = films.length;

    films.forEach(film => {
        const card = createCard(film);
        card.className = 'movie-card grid-card'; // Adiciona classe para estilo de grid
        filmsGrid.appendChild(card);
    });

    // Funcionalidade de pesquisa
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            showAllFilms();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            showAllFilms();
        } else {
            filterFilms(query);
        }
    });

    function showAllFilms() {
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }

    function filterFilms(query) {
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
