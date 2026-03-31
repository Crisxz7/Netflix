// ==========================
// INTRO COM VÍDEO
// ==========================
const intro = document.getElementById("intro");
const video = document.getElementById("videoIntro");

// se existir vídeo na página
if (video && intro) {

    // quando o vídeo terminar
    video.onended = function () {
        intro.style.display = "none";
    };

    // 🔊 ativa som ao clicar
    video.addEventListener("click", () => {
        video.muted = false;
        video.play();
    });
}

// ==========================
// TEMA (CLARO/ESCURO)
// ==========================

// Função para alternar o tema
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Altera o atributo de tema
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', newTheme);
    
    // Atualiza o botão
    updateThemeButton(newTheme);
}

// Função para atualizar o botão
function updateThemeButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.title = theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro';
}

// Detecta tema do sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

// Define o tema inicial
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

// Evento do botão
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleTheme);