const reset = document.getElementById('resetBtn');
const cards = Array.from(document.querySelectorAll('.card'));
const winnerText = document.querySelector('.h3-winner');
const gameMessage = document.querySelector('h2');
let currentPlayer = 'X';

const xImageSrc = '../img/x.png';
const oImageSrc = '../img/Blue_circle.png';