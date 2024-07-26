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
            img.classList.add('visible');
        });
        card.classList.add('disabled'); 
        if (checkWin()) {
            winnerText.textContent = `El ganador es: ${currentPlayer}`;
            gameMessage.textContent = 'Presione reiniciar';
            disableCards();
        } else if (checkDraw()) {
            winnerText.textContent = 'Empate';
            gameMessage.textContent = 'Presione reiniciar';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]  
    ];
    return win.some(step => {
        return step.every(index => {
            const card = cards[index];
            const img = card.querySelector('img');
            return img && img.alt === currentPlayer;
        });
    });
}

function checkDraw() {
    return cards.every(card => {
        const img = card.querySelector('img');
        return img !== null;
    });
}

function resetGame() {
    cards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            img.classList.remove('visible');
            img.classList.add('fade-out');
            img.addEventListener('transitionend', () => {
                card.innerHTML = '';
            });
        } else {
            card.innerHTML = '';
        }
        card.classList.remove('disabled');
    });
    winnerText.textContent = 'El ganador es:'; 
    gameMessage.textContent = 'Eliga un cuadrado'; 
    currentPlayer = 'X';
}

function disableCards() {
    cards.forEach(card => {
        card.classList.add('disabled');
        card.style.opacity = '1'; 
    });
}

cards.forEach(card => {
    card.addEventListener('click', clickInCard);
});

reset.addEventListener('click', resetGame);