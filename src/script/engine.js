const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        ranking: document.querySelector("#ranking"), // Adicione este elemento ao HTML
    },

    value: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        ranking: [], // Ranking para armazenar pontuações de cada vida
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    }
};

// Função para o contador de tempo
function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if (state.value.currentTime <= 0) {
        gameOver();
    }
}

// Função para diminuir vidas e salvar pontuação ao perder uma vida
function decreaseLives() {
    state.value.ranking.push(state.value.result); // Adiciona a pontuação atual ao ranking
    updateRankingDisplay(); // Atualiza o display do ranking

    state.value.lives--;
    state.view.lives.textContent = state.value.lives;
    state.value.result = 0; // Reseta a pontuação para a nova vida
    state.view.score.textContent = state.value.result;

    if (state.value.lives <= 0) {
        gameOver();
    }
}

// Função de Game Over
function gameOver() {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    playGameOverMusic();
    
    alert("Game Over! Pontuações por vida: " + state.value.ranking.join(", "));
    
    resetGame(); // Reinicia o jogo para uma nova sessão
}
// Se quiser e so ativar para escutar essa musica de fundo
// // Função para música de fundo (tocada durante o jogo)
// function backgroudMusic() {
//     let audio = new Audio(`/src/audios/FUNK-OF-GALACTICO-SUPER-SLOWED.m4a`);
//     audio.volume = 0.10;
//     audio.play();
// }

// Função para tocar música de game over
function playGameOverMusic() {
    let audio = new Audio(`/src/audios/8-bit-music-on-245249.m4a`); // Substitua pelo caminho real
    audio.volume = 0.10;
    audio.play();
}

// Função para resetar o jogo para uma nova sessão
function resetGame() {
    state.value.result = 0;
    state.value.currentTime = 60;
    state.value.lives = 3;

    // Atualiza a interface com os valores iniciais
    state.view.score.textContent = state.value.result;
    state.view.timeLeft.textContent = state.value.currentTime;
    state.view.lives.textContent = state.value.lives;
    updateRankingDisplay(); // Exibe o ranking final antes de resetar para uma nova sessão

    // Reinicia os timers e a movimentação do inimigo
    state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

// Função para atualizar o display do ranking na interface
function updateRankingDisplay() {
    state.view.ranking.innerHTML = state.value.ranking
        .map((score, index) => `<p>${index + 1}º Vida: ${score} pontos</p>`)
        .join("");
}

// Função para tocar o som ao acertar o inimigo
function playSound() {
    let audio = new Audio(`/src/audios/Mario-Som-Moedas-Olhe-A-Descrição-.m4a`);
    audio.volume = 0.10;
    audio.play();
}

// Função para mover o inimigo
function moveEnemy() {
    state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

// Função para escolher uma posição aleatória do inimigo
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

// Função para adicionar eventos aos quadrados
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound();
            }
        });
    });
}

// Função de inicialização do jogo
function init() {
    backgroudMusic();
    moveEnemy();
    addListenerHitBox();
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

// Inicializa o jogo
init();
