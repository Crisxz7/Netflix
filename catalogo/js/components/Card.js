// Importa utilitários que ajudam a montar o card
import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

export function createCard(item) {
    // Cria o container principal do card
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-title', item.title || ''); // Adiciona o título como atributo de dados
    card.setAttribute('data-id', `${item.title}-${item.img.substring(0, 20)}`); // ID único para cada item
    card.setAttribute('data-item', JSON.stringify(item)); // Armazena item completo

    // Se houver progresso, adiciona uma classe para mostrar barra
    if (item.progress) {
        card.classList.add('has-progress');
    }

    // Cria a imagem do filme
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Movie cover`;

    // Cria o iframe que será usado para autoplay do trailer
    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";

    // Extrai o ID do vídeo do link YouTube
    const videoId = getYouTubeId(item.youtube);

    // Adiciona iframe e imagem no card (iframe por baixo da imagem)
    card.appendChild(iframe);
    card.appendChild(img);

    // Gera badge de idade aleatório
    const ageBadge = getRandomAgeBadge();

    // Cria detalhes que aparecem ao passar mouse
    const details = document.createElement('div');
    details.className = 'card-details';
    
    // Recupera o perfil ativo para verificar se o item já está na lista
    const perfilAtivoNome = localStorage.getItem('perfilAtivoNome') || 'default';
    const listKey = `myList_${perfilAtivoNome}`;
    const myList = JSON.parse(localStorage.getItem(listKey)) || [];
    const itemInList = myList.some(i => i.title === item.title);
    
    // Define o botão correto (+ ou ✓)
    const addButtonIcon = itemInList ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
    const addButtonClass = itemInList ? ' added-to-list' : '';
    
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                <button class="btn-icon${addButtonClass}">${addButtonIcon}</button>
                <button class="btn-icon btn-like"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);

    // Adiciona funcionalidade ao botão de "+" para adicionar à lista
    const addButtons = details.querySelectorAll('.left-buttons button:nth-child(2)');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToMyList(item, btn);
        });
    });

    // Adiciona funcionalidade ao botão de like para recomendar
    const likeButtons = details.querySelectorAll('.left-buttons .btn-like');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            recommendItem(item, btn);
        });
    });

    // Se houver progresso de visualização, cria barra de progresso
    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    // Configura visualização do trailer e efeitos hover
    let playTimeout;
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // Ajusta origem da animação para não cortar nas bordas
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        // Após 600ms de hover, toca a prévia no iframe
        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    // Ao sair com o cursor, para o vídeo e reseta classes
    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = "";
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    return card;
}

// Função para adicionar item à "Minha Lista"
function addToMyList(item, btn) {
    // Recupera o perfil ativo
    const perfilAtivoNome = localStorage.getItem('perfilAtivoNome') || 'default';
    
    // Usa uma chave única por perfil
    const listKey = `myList_${perfilAtivoNome}`;
    
    // Recupera lista atual do localStorage
    let myList = JSON.parse(localStorage.getItem(listKey)) || [];

    // Verifica se item já está na lista
    const itemExists = myList.some(i => i.title === item.title);

    if (!itemExists) {
        // Adiciona item à lista
        myList.push(item);
        localStorage.setItem(listKey, JSON.stringify(myList));

        // Feedback visual: muda para checkmark
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.classList.add('added-to-list');

        // Mostra notificação
        showNotification(`"${item.title}" adicionado à sua lista!`);
        
        // Dispara evento customizado
        dispatchListUpdateEvent('added', item);
    } else {
        // Remove da lista se já existe
        myList = myList.filter(i => i.title !== item.title);
        localStorage.setItem(listKey, JSON.stringify(myList));

        // Feedback visual: volta para +
        btn.innerHTML = '<i class="fas fa-plus"></i>';
        btn.classList.remove('added-to-list');

        // Mostra notificação
        showNotification(`"${item.title}" removido da sua lista!`);
        
        // Dispara evento customizado
        dispatchListUpdateEvent('removed', item);
    }
}

// Função para disparar evento customizado
function dispatchListUpdateEvent(action, item) {
    const event = new CustomEvent('listUpdated', {
        detail: {
            action: action, // 'added' ou 'removed'
            item: item
        }
    });
    document.dispatchEvent(event);
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Função para recomendar item
function recommendItem(item, btn) {
    const typeLabel = item.type === 'film' ? 'filme' : 'série';

    // Toggle visual no Like: thumbs-up <-> hand-paper
    const icon = btn.querySelector('i');
    if (icon) {
        if (icon.classList.contains('fa-thumbs-up')) {
            icon.classList.remove('fa-thumbs-up');
            icon.classList.add('fa-hand-paper');
        } else {
            icon.classList.remove('fa-hand-paper');
            icon.classList.add('fa-thumbs-up');
        }
    }

    showNotification(`Você recomendou este ${typeLabel}: "${item.title}"`);
    dispatchListUpdateEvent('recommended', item);
}
