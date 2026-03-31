// Gerenciador de notificações do badge

const MAX_HISTORY_ITEMS = 10;

export function initNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const notificationContainer = document.querySelector('.nav-notification');
    const notificationBell = document.getElementById('notification-bell');
    const panel = document.getElementById('notification-panel');
    const overlay = document.getElementById('notification-overlay');
    const closeBtn = document.getElementById('close-panel');
    
    if (!badge || !notificationContainer) return;

    // Carrega o histórico ao iniciar
    loadNotificationHistory();

    // Toggle de abertura/fechamento do painel
    notificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains('open');
        if (isOpen) {
            closeNotificationPanel();
        } else {
            openNotificationPanel();
        }
    });

    // Fecha o painel ao clicar no botão X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNotificationPanel);
    }

    // Fecha o painel ao clicar no overlay
    if (overlay) {
        overlay.addEventListener('click', closeNotificationPanel);
    }

    // Ouve eventos de atualização da lista
    document.addEventListener('listUpdated', (e) => {
        const { action, item } = e.detail;
        
        // Adiciona ao histórico
        addToHistory(action, item);
        
        // Mostra o badge com a ação
        showNotificationBadge(badge, notificationContainer, action, item);
        
        // Atualiza a lista de notificações no painel
        updateNotificationList();
        
        // Remove o badge após 3 segundos
        setTimeout(() => {
            hideBadge(badge);
        }, 3000);
    });

    function openNotificationPanel() {
        panel.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeNotificationPanel() {
        panel.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function showNotificationBadge(badge, container, action, item) {
    // Limpa classes anteriores
    badge.classList.remove('added', 'removed', 'recommended');

    let message = '';
    switch (action) {
        case 'added':
            message = '+';
            badge.classList.add('added');
            break;
        case 'removed':
            message = '−';
            badge.classList.add('removed');
            break;
        case 'recommended':
            message = '★';
            badge.classList.add('recommended');
            break;
        default:
            message = '•';
            break;
    }

    badge.textContent = message;
    badge.classList.add('active');
    badge.style.display = 'flex';

    // Adiciona classe de animação
    container.classList.add('notification-active');
}

function hideBadge(badge) {
    badge.classList.remove('active');
    badge.style.display = 'none';
    document.querySelector('.nav-notification').classList.remove('notification-active');
}

// Gerenciamento de histórico
function addToHistory(action, item) {
    const perfilAtivoNome = localStorage.getItem('perfilAtivoNome') || 'default';
    const historyKey = `notificationHistory_${perfilAtivoNome}`;
    
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    
    // Adiciona novo evento no início
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    history.unshift({
        action: action,
        title: item.title,
        time: timeString,
        timestamp: now.getTime()
    });
    
    // Mantém apenas os últimos MAX_HISTORY_ITEMS
    history = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(historyKey, JSON.stringify(history));
}

function loadNotificationHistory() {
    updateNotificationList();
}

function updateNotificationList() {
    const perfilAtivoNome = localStorage.getItem('perfilAtivoNome') || 'default';
    const historyKey = `notificationHistory_${perfilAtivoNome}`;
    const notificationList = document.getElementById('notification-list');
    
    if (!notificationList) return;
    
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    
    if (history.length === 0) {
        notificationList.innerHTML = '<p class="no-notifications">Nenhuma atividade recente</p>';
        return;
    }
    
    notificationList.innerHTML = history.map(item => {
        let icon;
        let text;
        let actionClass;

        switch (item.action) {
            case 'added':
                icon = '✓';
                text = 'adicionado à sua lista';
                actionClass = 'added';
                break;
            case 'removed':
                icon = '✕';
                text = 'removido da sua lista';
                actionClass = 'removed';
                break;
            case 'recommended':
                icon = '★';
                text = 'recomendado';
                actionClass = 'recommended';
                break;
            default:
                icon = '•';
                text = 'acao desconhecida';
                actionClass = 'unknown';
                break;
        }

        return `
            <div class="notification-item ${actionClass}">
                <div class="notification-item-icon">
                    ${icon}
                </div>
                <div class="notification-item-content">
                    <p class="notification-item-title">"${item.title}"</p>
                    <p class="notification-item-action">${text}</p>
                    <span class="notification-item-time">${item.time}</span>
                </div>
            </div>
        `;
    }).join('');
}
