import { createCard } from './Card.js';

// Cria um carrossel completo de uma categoria (sessão)
export function createCarousel(category) {
    // Container geral do carrossel
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Header contendo título e indicadores
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title; // Exibe o título da categoria

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Linha de filmes (cards)
    const row = document.createElement('div');
    row.className = 'movie-row';

    // Para cada item, cria o card e anexa na linha
    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    section.appendChild(row);
    return section; // Retorna árvore DOM do carrossel
}
