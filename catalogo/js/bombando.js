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

    // Função para selecionar itens aleatórios
    function getRandomItems(count) {
        // Extrai todos os itens de todas as categorias
        const allItems = [];
        categories.forEach(category => {
            allItems.push(...category.items);
        });

        // Embaralha o array usando Fisher-Yates shuffle
        for (let i = allItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
        }

        // Retorna os primeiros 'count' itens
        return allItems.slice(0, count);
    }

    // Extrai 5 itens aleatórios
    const trendingItems = getRandomItems(5);

    // Renderiza os conteúdos em grid
    const trendingGrid = document.getElementById('trending-grid');
    const trendingCount = document.getElementById('trending-count');

    trendingCount.textContent = trendingItems.length;

    trendingItems.forEach(item => {
        const card = createCard(item);
        card.className = 'movie-card grid-card';
        trendingGrid.appendChild(card);
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
            showAllContent();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            showAllContent();
        } else {
            filterContent(query);
        }
    });

    function showAllContent() {
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }

    function filterContent(query) {
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
