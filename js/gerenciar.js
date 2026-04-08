// Perfis padrão que ficam disponíveis antes de qualquer edição.
const defaultProfiles = [
    { id: '1', name: 'Vanessa', img: 'assents/perfil-1.jpg' },
    { id: '2', name: 'Thiago', img: 'assents/perfil-2.jpg' },
    { id: '3', name: 'Ana', img: 'assents/perfil-3.jpg' },
    { id: '4', name: 'Vitória', img: 'assents/perfil-4.jpg' }
];

// Lista de opções de avatar que o usuário pode selecionar.
const avatarImages = [
    'assents/perfil-1.jpg',
    'assents/perfil-2.jpg',
    'assents/perfil-3.jpg',
    'assents/perfil-4.jpg',
    'assents/perfil-5.png',
    'assents/perfil-6.png'
];

// Lê os perfis gravados no localStorage, ou retorna o padrão.
function getStoredProfiles() {
    const saved = localStorage.getItem('profiles');
    if (!saved) return defaultProfiles;

    try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed) || parsed.length !== defaultProfiles.length) {
            return defaultProfiles;
        }
        return parsed;
    } catch {
        return defaultProfiles;
    }
}

// Grava a lista de perfis atual no localStorage.
function saveProfiles(profiles) {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

// Exibe uma mensagem de status temporária ao usuário.
function showStatus(message) {
    const statusElement = document.getElementById('status-message');
    if (!statusElement) return;
    statusElement.textContent = message;
    if (message) {
        setTimeout(() => {
            statusElement.textContent = '';
        }, 1800); // limpa a mensagem após 1.8 segundos
    }
}

// Cria o HTML de um card de perfil editável.
function createProfileCard(profile) {
    const avatarButtons = avatarImages.map(src => {
        const selectedClass = src === profile.img ? 'selected' : '';
        return `
            <button type="button" class="avatar-choice ${selectedClass}" data-img="${src}" style="background-image:url('${src}')" aria-label="Selecionar avatar"></button>`;
    }).join('');

    return `
        <article class="profile-card" data-profile-id="${profile.id}">
            <img class="profile-avatar" src="${profile.img}" alt="Avatar do perfil ${profile.name}">
            <label for="name-${profile.id}">Nome do perfil</label>
            <input id="name-${profile.id}" class="profile-name-input" type="text" value="${profile.name}" maxlength="20" />
            <div class="avatar-options" aria-label="Escolher foto do perfil">
                ${avatarButtons}
            </div>
        </article>`;
}

// Renderiza todos os cards de perfil dentro da página de gerenciamento.
function renderProfiles(profiles) {
    const manageList = document.getElementById('manage-list');
    if (!manageList) return;
    manageList.innerHTML = profiles.map(createProfileCard).join('');
}

// Inicializa o gerenciamento de perfis assim que a página carregar.
document.addEventListener('DOMContentLoaded', () => {
    let profiles = getStoredProfiles();
    renderProfiles(profiles);

    const manageList = document.getElementById('manage-list');
    if (manageList) {
        manageList.addEventListener('input', event => {
            if (!event.target.matches('.profile-name-input')) return;
            const card = event.target.closest('.profile-card');
            if (!card) return;
            const profileId = card.dataset.profileId;
            const profile = profiles.find(item => item.id === profileId);
            if (!profile) return;

            profile.name = event.target.value.trim() || 'Perfil sem nome';
            const img = card.querySelector('.profile-avatar');
            if (img) img.alt = `Avatar do perfil ${profile.name}`;
            saveProfiles(profiles); // salva o novo nome
            showStatus('Nome do perfil atualizado!');
        });

        manageList.addEventListener('click', event => {
            const target = event.target.closest('.avatar-choice');
            if (!target) return;
            const card = target.closest('.profile-card');
            if (!card) return;
            const profileId = card.dataset.profileId;
            const selectedImage = target.dataset.img;
            const profile = profiles.find(item => item.id === profileId);
            if (!profile) return;

            profile.img = selectedImage;
            saveProfiles(profiles); // salva a nova imagem

            const avatar = card.querySelector('.profile-avatar');
            if (avatar) avatar.src = selectedImage;

            card.querySelectorAll('.avatar-choice').forEach(button => {
                button.classList.toggle('selected', button.dataset.img === selectedImage);
            });

            showStatus('Foto do perfil atualizada!');
        });
    }

    const backButton = document.getElementById('back-home');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // volta para a página inicial de seleção
        });
    }
});
