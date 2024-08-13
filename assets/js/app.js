// Variables para contar las rondas y los puntajes
let numGames = 0; // Número de juegos totales
let currentGame = 0; // Juego actual
let playerWins = 0; // Victorias del jugador
let computerWins = 0; // Victorias de la computadora

// Función para iniciar el juego
function startGame() {
    // Obtener el número de juegos que el usuario quiere jugar
    const input = document.getElementById('numGames');
    numGames = parseInt(input.value);

    // Verificar si el número ingresado es válido
    if (isNaN(numGames) || numGames < 1) {
        alert('Por favor ingresa un número válido de juegos.');
        return;
    }

    // Mostrar el contenedor del juego
    document.getElementById('gameContainer').style.display = 'block';

    // Reiniciar las rondas y los puntajes
    currentGame = 0;
    playerWins = 0;
    computerWins = 0;
    document.getElementById('roundNumber').innerText = '1';
    document.getElementById('result').innerText = '';
    document.getElementById('finalResult').innerText = '';
}

// Función para jugar una ronda
function playRound() {
    // Verificar si aún hay rondas por jugar
    if (currentGame >= numGames) {
        alert('El juego ha terminado.');
        return;
    }

    // Obtener la elección del jugador
    const playerChoice = document.getElementById('playerChoice').value;

    // Generar una elección aleatoria para la computadora
    const computerChoice = getComputerChoice();

    // Determinar el ganador de la ronda
    const result = determineWinner(playerChoice, computerChoice);

    // Actualizar el resultado de la ronda
    updateResults(result, playerChoice, computerChoice);

    // Avanzar a la siguiente ronda
    currentGame++;
    if (currentGame < numGames) {
        document.getElementById('roundNumber').innerText = (currentGame + 1).toString();
    } else {
        // Mostrar el resultado final cuando terminen todas las rondas
        showFinalResult();
    }
}

// Función para obtener una elección aleatoria de la computadora
function getComputerChoice() {
    const choices = ['piedra', 'papel', 'tijera'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Función para determinar el ganador de una ronda
function determineWinner(player, computer) {
    if (player === computer) {
        return 'empate';
    } else if (
        (player === 'piedra' && computer === 'tijera') ||
        (player === 'papel' && computer === 'piedra') ||
        (player === 'tijera' && computer === 'papel')
    ) {
        playerWins++;
        return 'ganaste';
    } else {
        computerWins++;
        return 'perdiste';
    }
}

// Función para mostrar los resultados de cada ronda
function updateResults(result, playerChoice, computerChoice) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Tú elegiste: ${playerChoice}</p>
        <p>La computadora eligió: ${computerChoice}</p>
        <p>Resultado: ${result.charAt(0).toUpperCase() + result.slice(1)}</p>
    `;
}

// Función para mostrar el resultado final después de todas las rondas
function showFinalResult() {
    const finalResultDiv = document.getElementById('finalResult');
    let finalMessage = '';

    if (playerWins > computerWins) {
        finalMessage = '¡Felicidades, ganaste el juego!';
    } else if (computerWins > playerWins) {
        finalMessage = 'La computadora ganó el juego.';
    } else {
        finalMessage = 'El juego terminó en empate.';
    }

    finalResultDiv.innerText = finalMessage;
}
