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

    // Extrai todas as séries de todas as categorias
    const allItems = [];
    categories.forEach(category => {
        allItems.push(...category.items);
    });

    // Filtra apenas as séries
    const series = allItems.filter(item => item.type === 'series');

    // Renderiza as séries em grid
    const seriesGrid = document.getElementById('series-grid');
    const seriesCount = document.getElementById('series-count');

    seriesCount.textContent = series.length;

    series.forEach(show => {
        const card = createCard(show);
        card.className = 'movie-card grid-card'; // Adiciona classe para estilo de grid
        seriesGrid.appendChild(card);
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
            showAllSeries();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            showAllSeries();
        } else {
            filterSeries(query);
        }
    });

    function showAllSeries() {
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }

    function filterSeries(query) {
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
