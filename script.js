// Seleciona os elementos do carrossel, main e botão Saiba Mais
const carouselElement = document.getElementById('carouselExample');
const mainElement = document.querySelector('main');
const saibaMaisBtn = document.getElementById('saibaMais');
const carouselTitle = document.getElementById('carouselTitle');
const carouselDescription = document.getElementById('carouselDescription');

// Garante que o main tenha posição relativa para alinhar corretamente o overlay
mainElement.style.position = "relative";
mainElement.style.overflow = "hidden";

// Garante que o carrossel tenha um z-index maior para aparecer sobre o fundo
carouselElement.style.position = "relative";
carouselElement.style.zIndex = "1";

// Cria um overlay para a transição suave
const backgroundOverlay = document.createElement('div');
backgroundOverlay.style.position = "absolute";
backgroundOverlay.style.top = "0";
backgroundOverlay.style.left = "0";
backgroundOverlay.style.width = "100%";
backgroundOverlay.style.height = "100%";
backgroundOverlay.style.transition = "opacity 0.8s ease-in-out";
backgroundOverlay.style.zIndex = "-1"; // Garante que o fundo fique atrás dos slides
backgroundOverlay.style.backgroundSize = "cover";
backgroundOverlay.style.backgroundPosition = "center";
backgroundOverlay.style.backgroundRepeat = "no-repeat";
backgroundOverlay.style.pointerEvents = "none"; // Evita interferências
mainElement.appendChild(backgroundOverlay);

// Lista de cores do background associadas a cada slide (cores sólidas, sem opacidade)
const backgroundColors = [
    "rgb(0, 200, 255)",  // Slide 1 (cor sólida)
    "rgb(255, 234, 0)",  // Slide 2 (cor sólida)
    "rgb(255, 0, 0)",    // Slide 3 (cor sólida)
    "rgb(0, 255, 47)",    // Slide 4 (cor sólida)
    "rgb(255, 225, 0)"   // Slide 5 (cor sólida)
];

// Lista de cores do botão associadas a cada slide
const buttonColors = [
    "rgb(0, 200, 255)",        
    "rgb(255, 234, 0)", 
    "rgb(255, 0, 0)",  
    "rgb(0, 255, 55)", 
    "rgb(255, 204, 0)"  
];

// Lista de âncoras para cada slide
const buttonAnchors = [
    "./index.html",    
    "./atadoNoAto160.html",  
    "./empreenderNaCozinha160.html",  
    "./desenheitudo160.html", 
    "./estudio160.html"  
];

// Adiciona transições para o título e a descrição
carouselTitle.style.transition = "opacity 0.5s ease-in-out";
carouselDescription.style.transition = "opacity 0.5s ease-in-out";

// Função para alterar fundo e estilos
function updateStyles(index) {
    const newBackgroundColor = backgroundColors[index] || "rgb(255, 0, 0)";
    const newButtonColor = buttonColors[index] || "#FF5733";
    const newAnchor = buttonAnchors[index] || "#";

    // Suaviza a transição do background
    backgroundOverlay.style.opacity = "0"; // Fade-out
    
    setTimeout(() => {
        // Define a cor de fundo sólida
        backgroundOverlay.style.background = newBackgroundColor;
        backgroundOverlay.style.backgroundSize = "cover";
        backgroundOverlay.style.backgroundPosition = "center";
        backgroundOverlay.style.backgroundRepeat = "no-repeat";
        backgroundOverlay.style.opacity = "1"; // Mantém opacidade total
    }, 400); // Tempo de espera antes de trocar o fundo

    // Aplica transição suave ao botão
    saibaMaisBtn.style.transition = "background-color 0.5s ease-in-out";
    saibaMaisBtn.style.backgroundColor = newButtonColor;
    saibaMaisBtn.setAttribute("href", newAnchor);
}

// Evento para mudar título, descrição e estilos ao trocar de slide
carouselElement.addEventListener('slid.bs.carousel', function(event) {
    const activeItem = event.relatedTarget;
    const title = activeItem.getAttribute('data-title');
    const description = activeItem.getAttribute('data-description');

    // Aplica fade-out no texto antes da troca
    carouselTitle.style.opacity = "0";
    carouselDescription.style.opacity = "0";

    setTimeout(() => {
        // Atualizar título e descrição após fade-out
        carouselTitle.innerText = title;
        carouselDescription.innerText = description;

        // Aplica fade-in
        carouselTitle.style.opacity = "1";
        carouselDescription.style.opacity = "1";
    }, 400); // Tempo de transição antes da troca

    // Obtém o índice do slide ativo
    const activeIndex = [...carouselElement.querySelectorAll('.carousel-item')].indexOf(activeItem);

    // Atualiza estilos
    updateStyles(activeIndex);
});

// Define os estilos iniciais do primeiro slide ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    updateStyles(0);
});
