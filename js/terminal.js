
// terminal.js
document.addEventListener('DOMContentLoaded', () => {
  let secretBuffer = '';
  const secretCode = 'hack';
  const terminal = document.getElementById('hacker-terminal');
  const termBody = document.getElementById('term-body');
  const termInput = document.getElementById('term-input');
  const termClose = document.getElementById('term-close');

  if (!terminal) return;

  const toggleTerminal = () => {
    terminal.classList.toggle('active');
    if (terminal.classList.contains('active')) {
      setTimeout(() => termInput.focus(), 100);
    }
  };

  termClose.addEventListener('click', () => terminal.classList.remove('active'));

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    if (!terminal.classList.contains('active') && e.key.length === 1) {
      secretBuffer += e.key.toLowerCase();
      if (secretBuffer.length > 10) secretBuffer = secretBuffer.slice(-10);
      if (secretBuffer.includes(secretCode)) {
        secretBuffer = '';
        toggleTerminal();
      }
    }
  });

  const printLog = (msg, type = '') => {
    const div = document.createElement('div');
    div.className = `term-log ${type}`;
    div.innerHTML = msg;
    termBody.appendChild(div);
    termBody.scrollTop = termBody.scrollHeight;
  };

  let snakeActive = false;
  let gameLoop;
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value.trim().toLowerCase();
      if (!val) return;
      termInput.value = '';
      printLog(`$&nbsp;${val}`, 'echo');

      if (snakeActive && val !== 'exit') {
        printLog('Snake is running. Type "exit" to quit game.', 'warn');
        return;
      }

      switch (val) {
        case 'help':
          printLog('Commands: whoami, projects, achievements, clear, exit, snake');
          break;
        case 'whoami':
          printLog('Gourav Sharma<br/>Full-Stack Developer<br/>"Building software that connects front to back, cleanly."');
          break;
        case 'projects':
          printLog('1. HealthTech Website<br/>2. E-Book Management System<br/>... Type "exit" and click Projects in nav for full UI.');
          break;
        case 'achievements':
          printLog('1. AWS Certified Cloud Practitioner<br/>2. 1st Place — SRM Hack 2025<br/>... See Achievements section in nav.');
          break;
        case 'clear':
          termBody.innerHTML = '<div>Terminal cleared.</div>';
          break;
        case 'exit':
          if (snakeActive) {
            snakeActive = false;
            clearInterval(gameLoop);
            termBody.innerHTML = '<div>Snake game terminated.</div>';
          } else {
            terminal.classList.remove('active');
          }
          break;
        case 'snake':
          printLog('INITIALIZING SNAKE PROTOCOL...', 'warn');
          startSnake();
          break;
        default:
          printLog(`command not found: ${val}`, 'error');
      }
    }
  });

  const startSnake = () => {
    snakeActive = true;
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 200;
    canvas.style.border = '1px solid var(--teal)';
    canvas.style.marginTop = '10px';
    termBody.appendChild(canvas);
    termBody.scrollTop = termBody.scrollHeight;

    const ctx = canvas.getContext('2d');
    let snake = [{ x: 10, y: 10 }];
    let dir = { x: 1, y: 0 };
    let food = { x: 15, y: 10 };
    let score = 0;
    const grid = 10;

    const draw = () => {
      if (!snakeActive) { clearInterval(gameLoop); return; }

      let head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.x >= canvas.width / grid || head.y < 0 || head.y >= canvas.height / grid || snake.some(s => s.x === head.x && s.y === head.y)) {
        clearInterval(gameLoop);
        printLog(`GAME OVER. Score: ${score}. Type 'snake' to restart.`, 'error');
        snakeActive = false;
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = { x: Math.floor(Math.random() * (canvas.width / grid)), y: Math.floor(Math.random() * (canvas.height / grid)) };
      } else {
        snake.pop();
      }

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#33ff00';
      snake.forEach(s => ctx.fillRect(s.x * grid, s.y * grid, grid - 1, grid - 1));
      ctx.fillStyle = '#ff3333';
      ctx.fillRect(food.x * grid, food.y * grid, grid - 1, grid - 1);

      ctx.fillStyle = '#33ff00';
      ctx.fillText(`Score: ${score}`, 5, 12);
    };

    const keyHandler = (e) => {
      if (!snakeActive) { document.removeEventListener('keydown', keyHandler); return; }
      if (e.key === 'ArrowUp' && dir.y === 0) dir = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && dir.y === 0) dir = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && dir.x === 0) dir = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && dir.x === 0) dir = { x: 1, y: 0 };
      if (e.key.startsWith('Arrow')) e.preventDefault();
    };
    document.addEventListener('keydown', keyHandler);
    gameLoop = setInterval(draw, 100);
  };
});
