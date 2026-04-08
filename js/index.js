// Lista de perfis padrão que serão usados caso não haja dados gravados no storage.
const defaultProfiles = [
    { id: '1', name: 'Vanessa', img: 'assents/perfil-1.jpg' },
    { id: '2', name: 'Thiago', img: 'assents/perfil-2.jpg' },
    { id: '3', name: 'Ana', img: 'assents/perfil-3.jpg' },
    { id: '4', name: 'Vitória', img: 'assents/perfil-4.jpg' }
];

// Tenta ler a lista de perfis do localStorage.
function getStoredProfiles() {
    const saved = localStorage.getItem('profiles');
    if (!saved) return null;

    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) return null;
        return parsed;
    } catch {
        return null;
    }
}

// Salva a lista de perfis no localStorage em formato JSON.
function saveProfiles(profiles) {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

// Garante que sempre haverá um conjunto de perfis disponível.
function ensureProfiles() {
    const stored = getStoredProfiles();
    if (stored && stored.length === defaultProfiles.length) {
        return stored;
    }

    saveProfiles(defaultProfiles);
    return defaultProfiles;
}

// Atualiza cada item de perfil na página com os dados atuais.
function applyProfilesToPage(profiles) {
    document.querySelectorAll('.profile-item').forEach(item => {
        const profileId = item.dataset.profileId; // identifica o perfil pelo atributo data-profile-id
        const profile = profiles.find(p => p.id === profileId);
        if (!profile) return;

        const img = item.querySelector('img');
        const figcaption = item.querySelector('figcaption');

        if (img) {
            img.src = profile.img; // atualiza a imagem do perfil
            img.alt = `Avatar do perfil ${profile.name}`;
        }

        if (figcaption) {
            figcaption.textContent = profile.name; // atualiza o nome exibido
        }
    });
}

// Inicia o comportamento quando a página terminar de carregar.
document.addEventListener('DOMContentLoaded', () => {
    const profiles = ensureProfiles();
    applyProfilesToPage(profiles);

    const profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault(); // evita o link padrão até salvar o perfil ativo
            const img = item.querySelector('img');
            const figcaption = item.querySelector('figcaption');
            if (img && figcaption) {
                const nomePerfil = figcaption.textContent;
                const imagemPerfil = img.src;
                localStorage.setItem('perfilAtivoNome', nomePerfil); // salva o nome do perfil ativo
                localStorage.setItem('perfilAtivoImagem', imagemPerfil); // salva a imagem do perfil ativo
                window.location.href = item.querySelector('a').href; // redireciona ao catálogo
            }
        });
    });

    const manageButton = document.getElementById('manage-profiles');
    if (manageButton) {
        // Redireciona para a página de gerenciamento de perfis.
        manageButton.addEventListener('click', () => {
            window.location.href = 'gerenciar.html';
        });
    }
});
