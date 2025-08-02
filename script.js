document.addEventListener('DOMContentLoaded', () => {

    const gameData = [
        { type: 'start' },
        { type: 'question', question: 'Найдите грамматическую основу: "За окном медленно падал снежок, и снежный, ясный свет лежал на стенах комнаты".', answer: 'снежок падал, свет лежал' },
        { type: 'question', question: 'Найдите грамматическую основу: "Солнце закатилось, и над городом стояла золотистая пыль".', answer: 'солнце закатилось, пыль стояла' },
        { type: 'event', text: 'Вы нашли карту сокровищ! Переместитесь на 3 клетки вперёд.', move: 3 },
        { type: 'question', question: 'В каком предложении «зато» является союзом?', options: ['Много поработали и устали, за(то) все сделали.', 'Поблагодари Диму за(то), что он для тебя сделал.'], correct: 0, answer: 'Союз «зато» близок по значению союзу «но». Проверка: "Много поработали и устали, но все сделали".' },
        { type: 'question', question: 'Является ли «зато» союзом в предложении: "Кукушка хвалит петуха за(то), что хвалит он кукушку"?', answer: 'Нет, это местоимение с предлогом. Можно задать вопрос «за что?».'},
        { type: 'event', text: 'Ловушка! Вы попали в зыбучие пески. Вернитесь на 2 клетки назад.', move: -2 },
        { type: 'question', question: 'Укажите, где «однако» будет частицей, а где союзом: "Погода была ветреная, ветер, однако, не совсем попутный."', answer: 'Частица. Стоит в середине предложения и обособляется с двух сторон.' },
        { type: 'question', question: 'Укажите, где «однако» будет частицей, а где союзом: "Мы не надеялись никогда более встретиться, однако встретились."', answer: 'Союз. Стоит в начале части предложения и равен союзу «но».' },
        { type: 'event', text: 'Попутный ветер! Вы получаете 10 бонусных очков.', points: 10 },
        { type: 'question', question: 'Определите, где «то(же)» и «так(же)» будут союзом, а где частицей: "Толстый ковер лежал на полу, стены то(же) были увешаны коврами."', answer: 'Союз. «Тоже» можно заменить союзом «и».' },
        { type: 'question', question: 'Определите, где «то(же)» и «так(же)» будут союзом, а где частицей: "И завтра то(же), что вчера."', answer: 'Частица с местоимением. Частицу «же» можно опустить.' },
        { type: 'event', text: 'Заколдованный лес! Пропустите следующий ход.', missTurn: true },
        { type: 'question', question: 'Какое утверждение является неверным?', options: ['Сложносочинённые предложения – это предложения, в которых простые связываются сочинительными союзами.', 'В сложносочинённых предложениях с союзом И указывается на чередование явлений.'], correct: 1, answer: 'Союз И указывает на одновременность или последовательность, а не чередование.' },
        { type: 'question', question: 'Определите тип предложения: "Ветер лизнул огромные серые валуны, раскиданные древним ураганом и за столетия неподвижности обросшие переплетением сцепившихся кустов."', answer: 'Простое предложение с обособленными однородными членами.' },
        { type: 'event', text: 'Вы нашли зелье удачи! Бросьте кубик еще раз.', extraTurn: true },
        { type: 'question', question: 'Определите тип предложения: "Небо совсем выцвело от зноя, пыльные листья на полях чуть съёжились и пожелтели по краям."', answer: 'Бессоюзное сложное предложение.' },
        { type: 'question', question: 'Как надо продолжить предложение, чтобы оно получилось сложносочинённым? "Цветут липы..."', options: ['...и привлекают своим запахом пчёл.', '...распространяя вокруг удивительный запах.'], correct: 0, answer: 'Нужна вторая грамматическая основа.' },
        { type: 'event', text: 'Секретный портал! Переместитесь на клетку 30.' , moveTo: 30 },
        { type: 'question', question: 'Как надо продолжить предложение, чтобы оно получилось сложносочинённым? "Поднялся сильный ветер..."', options: ['...и сорвал с деревьев последние листья.', '...разнося по дорожкам сада упавшие листья.'], correct: 0, answer: 'Нужна вторая грамматическая основа.' },
        { type: 'question', question: 'Как надо продолжить предложение, чтобы оно получилось сложносочинённым? "Внезапно набежали тучи..."', options: ['...и стало темно.', '...вскоре закрывшие солнце.'], correct: 0, answer: 'Нужна вторая грамматическая основа.' },
        { type: 'event', text: 'Ой, вы разбудили дракона! Вернитесь на старт.', moveTo: 1 },
        { type: 'question', question: 'Какие отношения выражаются с помощью союза И в предложении: "Золотилась и краснела листва..., и ... плыла голубая дымка, и ... ветер был напоён..."?', answer: 'Одновременность явлений.' },
        { type: 'question', question: 'Найдите грамматическую основу: "Месячный свет падал из окон бледно-голубыми арками".', answer: 'свет падал'},
        { type: 'event', text: 'Помощь от грифона! +15 очков.', points: 15 },
        { type: 'question', question: 'Является ли «однако» союзом в предложении: "Страстно преданный барину, он, однако ж, редкий день в чем-нибудь не солжет ему."?', answer: 'Нет, это вводное слово (близко по значению к "тем не менее").' },
        { type: 'question', question: 'Является ли «так(же)» союзом в предложении: "Людям Павла Ивановича деревня то(же) понравилась. Они так(же), как и он сам, обживались в ней."', answer: 'В первом случае - союз. Во втором - наречие с частицей.' },
        { type: 'event', text: 'Проклятье! Теряете 5 очков.', points: -5 },
        { type: 'question', question: 'Определите тип предложения: "В комнаты ворвался упоительный свежий ветер, который принёс запах сырой травы и мокрых елей."', answer: 'Сложноподчинённое предложение.'},
        { type: 'event', text: 'Подарок от феи! Все команды, кроме вашей, теряют 5 очков.' },
        { type: 'question', question: 'Найдите грамматическую основу: "В саду было тихо, только птица иногда ворочалась и опять засыпала..."', answer: 'было тихо, птица ворочалась, засыпала' },
        { type: 'event', text: 'Телепорт! Поменяйтесь местами с лидером.', swapWithLeader: true },
        { type: 'question', question: 'В каком предложении два простых предложения соединены союзом ОДНАКО?', options: ['Погода была ветреная, ветер, однако, не совсем попутный.', 'Раздался сильный взрыв, однако ребята не растерялись.'], correct: 1, answer: 'Союз «однако» равен союзу «но».'},
        { type: 'event', text: 'Время перемен! Все команды меняются очками по часовой стрелке.' },
        { type: 'question', question: 'Какое утверждение является неверным?', options: ['Простые предложения не могут соединяться в сложносочинённое только при помощи интонации.', 'В сложносочинённом предложении простые предложения связываются сочинительными или подчинительными союзами.'], correct: 1, answer: 'Только сочинительными.' },
        { type: 'event', text: 'Двойная награда! Ваши очки за следующий правильный ответ удваиваются.', doublePointsNext: true },
        { type: 'question', question: 'Найдите грамматическую основу: "Поезд тронулся, и она остановилась, глядя широко раскрытыми синими глазами на мелькающие вдоль платформы вагоны".', answer: 'поезд тронулся, она остановилась' },
        { type: 'event', text: 'Щедрость! Поделитесь 10 очками с командой, у которой меньше всего очков.' },
        { type: 'question', question: 'В каком предложении «зато» пишется раздельно?', options: ['Приют наш мал, за(то) спокоен.', 'Небо стало очищаться от туч, за(то) ветер еще усилился.', 'Поблагодари Диму за(то), что он для тебя сделал.'], correct: 2, answer: '«За то» - местоимение с предлогом, если можно задать вопрос «за что?».'},
        { type: 'event', text: 'Риск! Вы можете рискнуть и бросить кубик ещё раз. При неудаче (1-3) вернётесь на 5 клеток назад, при удаче (4-6) — на 5 вперёд.' },
        { type: 'question', question: 'Какое из этих утверждений о сложносочинённых предложениях неверно?', options: ['Бывают союзными и бессоюзными.', 'С разделительным союзом ТО-ТО обычно указывается на чередование явлений.'], correct: 0, answer: 'Сложносочинённые предложения всегда союзные.'},
        { type: 'event', text: 'Загадка от сфинкса! Ответьте правильно на следующий вопрос и получите 20 очков.'},
        { type: 'question', question: 'Найдите предложение с ошибкой в пунктуации.', options: ['Мы не надеялись никогда более встретиться, однако встретились.', 'Ветер, однако не утихал.'], correct: 1, answer: 'Вводное слово «однако» в середине предложения выделяется запятыми с двух сторон.'},
        { type: 'event', text: 'Финишная прямая! Осталось совсем чуть-чуть.' },
        { type: 'finish' }
    ];
    const BOARD_SIZE = gameData.length;
    const TEAMS = [
        { name: 'Гриффиндор', icon: '🦁' },
        { name: 'Когтевран', icon: '🦅' },
        { name: 'Пуффендуй', icon: '🦡' },
        { name: 'Слизерин', icon: '🐍' }
    ];
    const POINTS_PER_CORRECT_ANSWER = 10;

    const boardEl = document.getElementById('board');
    const diceEl = document.getElementById('dice');
    const rollDiceBtn = document.getElementById('rollDice');
    const modalEl = document.getElementById('modal');
    const modalTitleEl = document.getElementById('modal-title');
    const modalTextEl = document.getElementById('modal-text');
    const optionsContainerEl = document.getElementById('options-container');
    const answerFeedbackEl = document.getElementById('answer-feedback');
    const correctBtn = document.getElementById('correct-btn');
    const incorrectBtn = document.getElementById('incorrect-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');
    const nextTurnBtn = document.getElementById('next-turn-btn');
    const winnerModalEl = document.getElementById('winner-modal');
    const winnerTextEl = document.getElementById('winner-text');
    const restartGameBtn = document.getElementById('restart-game');
    const currentTeamNameEl = document.getElementById('current-team-name');
    
    let gameState = {};

    function createBoardPath() {
        const path = [
            {x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 8, y: 4},
            {x: 8, y: 3}, {x: 7, y: 3}, {x: 6, y: 3}, {x: 5, y: 3}, {x: 4, y: 3}, {x: 3, y: 3}, {x: 2, y: 3}, {x: 1, y: 3}, {x: 0, y: 3},
            {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2},
            {x: 8, y: 1}, {x: 7, y: 1}, {x: 6, y: 1}, {x: 5, y: 1}, {x: 4, y: 1}, {x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 0, y: 1},
            {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}, {x: 8, y: 0},
        ];
        return path.slice(0, BOARD_SIZE);
    }

    const boardPath = createBoardPath();

    function initGame() {
        gameState = {
            players: TEAMS.map((team, i) => ({ 
                id: i, 
                name: team.name, 
                icon: team.icon, 
                score: 0, 
                position: 0, 
                missNextTurn: false,
                doublePointsNext: false,
                sfenixRiddle: false,
             })),
            currentPlayerIndex: 0,
            gamePhase: 'ROLLING', // ROLLING, ANSWERING, EVENT, GAMEOVER
            specialEvent: null, // For multi-step events like "Risk"
            extraTurn: false,
        };
        renderBoard();
        renderScoreboard();
        updateTurnIndicator();
        winnerModalEl.classList.add('hidden');
        modalEl.classList.add('hidden');
        rollDiceBtn.disabled = false;
    }

    function renderBoard() {
        boardEl.innerHTML = '';
        boardPath.forEach((pos, i) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.id = i;
            // Precise positioning
            const boardWidth = boardEl.clientWidth;
            const boardHeight = boardEl.clientHeight;
            const cellWidth = 60;
            const cellHeight = 60;
            const numCols = 9;
            const numRows = 5;
            cell.style.left = `${(pos.x / (numCols - 1)) * (boardWidth - cellWidth)}px`;
            cell.style.top = `${(pos.y / (numRows - 1)) * (boardHeight - cellHeight)}px`;
            
            const cellData = gameData[i];
            cell.textContent = i + 1;
            if (cellData.type === 'start') cell.classList.add('start');
            if (cellData.type === 'finish') cell.classList.add('finish');
            if (cellData.type === 'event') cell.classList.add('event');
            boardEl.appendChild(cell);
        });

        gameState.players.forEach(player => {
            const token = document.createElement('div');
            token.id = `player${player.id}`;
            token.classList.add('player-token');
            token.innerHTML = player.icon; // Add team icon to token
            boardEl.appendChild(token);
            movePlayerToken(player.id, 0);
        });
    }

    function renderScoreboard() {
        gameState.players.forEach((player, i) => {
            document.getElementById(`score${i}`).textContent = player.score;
            const li = document.querySelector(`li[data-team-id="${i}"]`);
            if (i === gameState.currentPlayerIndex) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }
    
    function updateTurnIndicator() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        currentTeamNameEl.innerHTML = `${currentPlayer.icon} ${currentPlayer.name}`;
    }

    function movePlayerToken(playerId, newPosition) {
        const token = document.getElementById(`player${playerId}`);
        const cell = document.querySelector(`.cell[data-id="${newPosition}"]`);
        if (cell && token) {
            token.style.left = `${cell.offsetLeft + cell.offsetWidth / 2 - token.offsetWidth / 2 + playerId * 4}px`;
            token.style.top = `${cell.offsetTop + cell.offsetHeight / 4 + playerId * 4}px`;
        }
    }
    
    function processCellAction(cellIndex) {
        const cellData = gameData[cellIndex];
        modalEl.classList.remove('hidden');
        optionsContainerEl.innerHTML = '';
        answerFeedbackEl.innerHTML = '';
        answerFeedbackEl.style.background = 'transparent';
        
        // Reset all buttons
        [correctBtn, incorrectBtn, showAnswerBtn, nextTurnBtn].forEach(btn => btn.classList.add('hidden'));

        modalTitleEl.textContent = cellData.type === 'event' ? 'Событие!' : 'Волшебное испытание!';
        modalTextEl.textContent = cellData.text || cellData.question;
        
        if (cellData.type === 'question') {
            gameState.gamePhase = 'ANSWERING';
            if (cellData.options) { // Multiple choice question
                cellData.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.classList.add('option-btn');
                    button.textContent = option;
                    button.onclick = () => handleAnswer(index === cellData.correct, cellData);
                    optionsContainerEl.appendChild(button);
                });
                showAnswerBtn.classList.remove('hidden');
            } else { // Open question for manual check
                showAnswerBtn.classList.remove('hidden');
                correctBtn.classList.remove('hidden');
                incorrectBtn.classList.remove('hidden');
            }
        } else { // Event or Start/Finish
            handleEvent(cellData);
            if(gameState.specialEvent !== 'RISK') {
               nextTurnBtn.classList.remove('hidden');
            }
        }
    }

    function handleEvent(cellData) {
        const player = gameState.players[gameState.currentPlayerIndex];
        
        if (cellData.move) {
            let newPosition = Math.max(0, Math.min(player.position + cellData.move, BOARD_SIZE - 1));
            player.position = newPosition;
            setTimeout(() => movePlayerToken(player.id, player.position), 500);
        }
        if (cellData.points) player.score += cellData.points;
        if (cellData.missTurn) player.missNextTurn = true;
        if (cellData.doublePointsNext) player.doublePointsNext = true;
        if (cellData.extraTurn) gameState.extraTurn = true;
        if (cellData.text?.includes("Загадка от сфинкса")) player.sfenixRiddle = true;

        if (cellData.moveTo) {
            player.position = cellData.moveTo - 1;
            setTimeout(() => movePlayerToken(player.id, player.position), 500);
        }

        if (cellData.swapWithLeader) {
            const leader = [...gameState.players].sort((a,b) => b.score - a.score).find(p => p.id !== player.id) || player;
            if (leader.id !== player.id) {
                [player.position, leader.position] = [leader.position, player.position]; // Swap positions
                setTimeout(() => {
                    movePlayerToken(player.id, player.position);
                    movePlayerToken(leader.id, leader.position);
                }, 500);
            }
        }
        
        if (cellData.text?.includes("Все команды, кроме вашей, теряют 5 очков")) {
            gameState.players.forEach(p => p.id !== player.id ? p.score = Math.max(0, p.score - 5) : null);
        }

        if (cellData.text?.includes("Все команды меняются очками по часовой стрелке")) {
            const scores = gameState.players.map(p => p.score);
            gameState.players.forEach((p, i) => p.score = scores[(i - 1 + scores.length) % scores.length]);
        }
        
        if (cellData.text?.includes("Поделитесь 10 очками")) {
            if (player.score >= 10) {
                const poorestPlayer = [...gameState.players].sort((a,b) => a.score - b.score).find(p => p.id !== player.id);
                if (poorestPlayer) {
                    player.score -= 10;
                    poorestPlayer.score += 10;
                }
            }
        }
        
        if (cellData.text?.includes("Риск!")) {
            gameState.gamePhase = 'EVENT';
            gameState.specialEvent = 'RISK';
            modalTextEl.innerHTML += '<br/><br/>Бросайте кубик, чтобы испытать удачу!';
            rollDiceBtn.disabled = false;
            return;
        }

        renderScoreboard();
    }
    
    function handleAnswer(isCorrect, cellData) {
        optionsContainerEl.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
        [correctBtn, incorrectBtn, showAnswerBtn].forEach(btn => btn.classList.add('hidden'));
        nextTurnBtn.classList.remove('hidden');
        
        const player = gameState.players[gameState.currentPlayerIndex];
        let pointsAwarded = isCorrect ? POINTS_PER_CORRECT_ANSWER : 0;

        if(isCorrect) {
            if (player.doublePointsNext) { pointsAwarded *= 2; player.doublePointsNext = false; }
            if (player.sfenixRiddle) { pointsAwarded = 20; player.sfenixRiddle = false; }
            player.score += pointsAwarded;
            answerFeedbackEl.textContent = `Верно! +${pointsAwarded} очков!`;
            answerFeedbackEl.style.background = 'rgba(40, 167, 69, 0.5)';
        } else {
            answerFeedbackEl.textContent = 'Неверно. Очков не начислено.';
            answerFeedbackEl.style.background = 'rgba(220, 53, 69, 0.5)';
        }
        renderScoreboard();
    }

    async function handleDiceRoll() {
        if (gameState.gamePhase !== 'ROLLING' && gameState.gamePhase !== 'EVENT') return;
        rollDiceBtn.disabled = true;

        const roll = Math.ceil(Math.random() * 6);
        const rollAnimation = setInterval(() => diceEl.textContent = Math.ceil(Math.random() * 6), 50);

        setTimeout(() => {
            clearInterval(rollAnimation);
            diceEl.textContent = roll;
            
            if (gameState.specialEvent === 'RISK') {
                const player = gameState.players[gameState.currentPlayerIndex];
                const move = roll <= 3 ? -5 : 5;
                answerFeedbackEl.textContent = `Выпало ${roll}! ${move > 0 ? 'Удача!' : 'Неудача!'} Перемещение на ${move} клеток.`;
                answerFeedbackEl.style.background = 'rgba(23, 162, 184, 0.5)';
                player.position = Math.max(0, Math.min(player.position + move, BOARD_SIZE - 1));
                movePlayerToken(player.id, player.position);
                gameState.specialEvent = null;
                nextTurnBtn.classList.remove('hidden');
                return;
            }

            const player = gameState.players[gameState.currentPlayerIndex];
            let newPosition = Math.min(player.position + roll, BOARD_SIZE - 1);
            player.position = newPosition;
            movePlayerToken(player.id, newPosition);
            setTimeout(() => processCellAction(newPosition), 800);
        }, 1000);
    }
    
    function showAnswer() {
        const cellIndex = gameState.players[gameState.currentPlayerIndex].position;
        const cellData = gameData[cellIndex];
        answerFeedbackEl.textContent = `Правильный ответ: ${cellData.answer}`;
        answerFeedbackEl.style.background = 'rgba(23, 162, 184, 0.5)';
    }

    function nextTurn() {
        modalEl.classList.add('hidden');
        
        if (gameState.players[gameState.currentPlayerIndex].position >= BOARD_SIZE - 1) {
            endGame();
            return;
        }

        if (gameState.extraTurn) {
            gameState.extraTurn = false;
        } else {
            gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % TEAMS.length;
        }
        
        const nextPlayer = gameState.players[gameState.currentPlayerIndex];
        updateTurnIndicator();
        renderScoreboard();
        
        if (nextPlayer.missNextTurn) {
            nextPlayer.missNextTurn = false;
            // A simple alert is better than complex UI for a small feature
            alert(`${nextPlayer.icon} ${nextPlayer.name} пропускает ход!`);
            setTimeout(nextTurn, 200);
            return; 
        }

        gameState.gamePhase = 'ROLLING';
        rollDiceBtn.disabled = false;
    }
    
    function endGame() {
        gameState.gamePhase = 'GAMEOVER';
        const winner = gameState.players.reduce((prev, curr) => (prev.score > curr.score) ? prev : curr);
        winnerTextEl.textContent = `Победила команда ${winner.icon} ${winner.name}!`;
        winnerModalEl.classList.remove('hidden');
    }

    rollDiceBtn.addEventListener('click', handleDiceRoll);
    correctBtn.addEventListener('click', () => handleAnswer(true, gameData[gameState.players[gameState.currentPlayerIndex].position]));
    incorrectBtn.addEventListener('click', () => handleAnswer(false, gameData[gameState.players[gameState.currentPlayerIndex].position]));
    showAnswerBtn.addEventListener('click', showAnswer);
    nextTurnBtn.addEventListener('click', nextTurn);
    restartGameBtn.addEventListener('click', initGame);

    initGame();
    // Re-render board on resize to adjust cell positions
    window.addEventListener('resize', renderBoard);
});