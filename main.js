const reset = document.getElementById('resetBtn');
const cards = Array.from(document.querySelectorAll('.card'));
const winnerText = document.querySelector('.h3-winner');
const gameMessage = document.querySelector('h2');
let currentPlayer = 'X';

const xImageSrc = '../img/x.png';
const oImageSrc = '../img/Blue_circle.png';

function clickInCard(event) {
    const card = event.target;
    if (card.innerHTML === '' && !card.classList.contains('disabled')) {
        const img = document.createElement('img');
        img.src = currentPlayer === 'X' ? xImageSrc : oImageSrc;
        img.alt = currentPlayer;
        img.style.width = '100%';
        img.style.height = '100%';
        card.appendChild(img);
        requestAnimationFrame(() => {
            img.classList.add('visible'); // Añadir la clase para la transición
        });
        card.classList.add('disabled');  // Deshabilitar la tarjeta inmediatamente
        if (checkWin()) {
            winnerText.textContent = `El ganador es: ${currentPlayer}`;
            gameMessage.textContent = 'Presione reiniciar';
            disableCards();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]  // diagonales
    ];
    return win.some(step => {
        return step.every(index => {
            const card = cards[index];
            const img = card.querySelector('img');
            return img && img.alt === currentPlayer;
        });
    });
}