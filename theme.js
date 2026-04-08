// ==========================
// INTRO COM VÍDEO
// ==========================
const intro = document.getElementById("intro"); // Seleciona o elemento de introdução pelo ID
const video = document.getElementById("videoIntro"); // Seleciona o elemento de vídeo pelo ID

// se existir vídeo na página
if (video && intro) { // Verifica se os elementos existem
    // Usa sessionStorage para lembrar apenas na sessão atual do navegador.
    const introShown = sessionStorage.getItem('introShown') === 'true'; // Verifica se o intro já foi mostrado nesta sessão

    if (introShown) { // Se já foi mostrado
        intro.style.display = 'none'; // oculta o vídeo se ele já foi exibido nesta sessão
        video.pause(); // pausa o vídeo
    } else { // Se não foi mostrado
        // quando o vídeo terminar, oculta o elemento e marca como visto
        video.onended = function () { // Evento quando o vídeo termina
            intro.style.display = 'none'; // oculta o container do vídeo
            sessionStorage.setItem('introShown', 'true'); // marca como visto no sessionStorage
        };

        // marca como visto quando a página deixar de ser visível ao usuário
        window.addEventListener('pagehide', () => { // Evento quando a página deixa de ser visível
            sessionStorage.setItem('introShown', 'true'); // marca como visto
        });

        // permite ativar o som ao clicar no próprio vídeo
        video.addEventListener('click', () => { // Evento de clique no vídeo
            video.muted = false; // desmuta o vídeo
            video.play(); // reproduz o vídeo
        });
    }
}

// ==========================
// TEMA (CLARO/ESCURO)
// ==========================

// Função para alternar o tema
function toggleTheme() { // Define a função para alternar tema
    const htmlElement = document.documentElement; // Seleciona o elemento HTML raiz
    const currentTheme = htmlElement.getAttribute('data-theme'); // Obtém o tema atual
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Alterna entre dark e light
    
    // Altera o atributo de tema
    htmlElement.setAttribute('data-theme', newTheme); // Define o novo tema
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', newTheme); // Salva no localStorage
    
    // Atualiza o botão
    updateThemeButton(newTheme); // Chama função para atualizar botão
}

// Função para atualizar o botão
function updateThemeButton(theme) { // Define função para atualizar o botão de tema
    const themeToggle = document.getElementById('theme-toggle'); // Seleciona o botão
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'; // Define emoji baseado no tema
    themeToggle.title = theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'; // Define tooltip
}

// Detecta tema do sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Verifica preferência do sistema
const savedTheme = localStorage.getItem('theme'); // Obtém tema salvo
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light'); // Define tema atual

// Define o tema inicial
document.documentElement.setAttribute('data-theme', currentTheme); // Aplica tema inicial
updateThemeButton(currentTheme); // Atualiza botão inicial

// Evento do botão
const themeToggle = document.getElementById('theme-toggle'); // Seleciona botão
themeToggle.addEventListener('click', toggleTheme); // Adiciona evento de clique