// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os itens de perfil
    const profileItems = document.querySelectorAll('.profile-item');
    
    // Para cada perfil, adiciona evento de clique
    profileItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Impede comportamento padrão do link temporariamente
            event.preventDefault();
            
            // Obtém a imagem e o nome do perfil clicado
            const img = item.querySelector('img'); // elemento img
            const figcaption = item.querySelector('figcaption'); // elemento figcaption
            
            // Se os elementos existem, armazena no localStorage
            if (img && figcaption) {
                const nomePerfil = figcaption.textContent; // texto do nome
                const imagemPerfil = img.src; // URL da imagem
                
                // Armazena nome do perfil ativo no localStorage
                localStorage.setItem('perfilAtivoNome', nomePerfil);
                // Armazena imagem do perfil ativo no localStorage
                localStorage.setItem('perfilAtivoImagem', imagemPerfil);
                
                // Redireciona para catálogo após armarzen no localStorage
                window.location.href = item.querySelector('a').href;
            }
        });
    });
});
