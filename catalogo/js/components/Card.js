// Importa utilitários que ajudam a montar o card
import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

export function createCard(item) {
    // Cria o container principal do card
    const card = document.createElement('div');
    card.className = 'movie-card';

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
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
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
