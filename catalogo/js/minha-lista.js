// Importa função para criar cards
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

    // Usa uma chave única por perfil
    const listKey = `myList_${nomePerfil || 'default'}`;
    
    // Recupera lista do localStorage do perfil ativo
    const myList = JSON.parse(localStorage.getItem(listKey)) || [];

    // Elementos da página
    const listGrid = document.getElementById('list-grid');
    const emptyMessage = document.getElementById('empty-list-message');
    const listCount = document.getElementById('list-count');

    // Atualiza contador
    listCount.textContent = myList.length;

    if (myList.length === 0) {
        // Mostra mensagem de lista vazia
        emptyMessage.style.display = 'flex';
        listGrid.style.display = 'none';
    } else {
        // Renderiza itens da lista
        myList.forEach(item => {
            const card = createCard(item);
            card.className = 'movie-card grid-card';
            listGrid.appendChild(card);
        });
    }

    // Funcionalidade de pesquisa
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            showAllItems();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            showAllItems();
        } else {
            filterItems(query);
        }
    });

    function showAllItems() {
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }

    function filterItems(query) {
        const cards = document.querySelectorAll('.grid-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Se nenhum resultado, mostra mensagem
        if (visibleCount === 0) {
            listGrid.insertAdjacentHTML('afterend', '<p class="no-results">Nenhum resultado encontrado</p>');
        } else {
            const noResults = document.querySelector('.no-results');
            if (noResults) noResults.remove();
        }
    }
});
