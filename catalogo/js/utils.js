// Extrai o ID do vídeo do YouTube a partir da URL fornecida
export function getYouTubeId(url) {
    // URL padrão se valor ausente
    if (!url) return "7RUA0IOfar8";
    
    // Para URLs do tipo https://www.youtube.com/watch?v=ID
    if (url.includes('v=')) {
        return url.split('v=')[1].split('&')[0];
    }

    // Para URLs do tipo https://youtu.be/ID
    return url.split('/').pop();
}

// Gera score de relevância entre 80 e 99
export function getRandomMatchScore() {
    return Math.floor(Math.random() * 20 + 80);
}

// Gera duracao de exibição do conteúdo
export function getRandomDuration(hasProgress) {
    // Se já há progresso, assume série longa (temporal)
    return hasProgress ? '10 temporadas' : '2h ' + Math.floor(Math.random() * 59) + 'm';
}

// Gera badge de idade aleatório
export function getRandomAgeBadge() {
    return Math.random() > 0.5 ? { text: 'A16', class: 'red-accent' } : { text: '16', class: '' };
}
