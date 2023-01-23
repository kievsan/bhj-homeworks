class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = document.getElementById('timer');  // добавлено
    this.handlers = {timerID: 0};  // добавлено

    this.registerEvents();  // поменял местами

    this.reset();  // поменял местами
  }

  reset() {
    clearInterval(this.handlers.timerID);  // добавлено
    alert('Начинаем новый раунд!');  // добавлено

    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;

    this.timerElement.textContent = this.setBackOverTime();  // добавлено
    document.addEventListener('keydown', this.handlers.keydown);  // добавлено
    this.timer();  // добавлено
  }

  timer(startDelay = 4, tickDelay = 2000) {  // добавлено
    let timerTicks = () => {
      --this.timerElement.textContent;
      return parseInt(this.timerElement.textContent);
    }

    let currentDelay = startDelay;
    let start = new Date().getTime();

    this.handlers.timerID =  setInterval(() => {
      if (new Date().getTime() - start < currentDelay) {
        currentDelay = tickDelay + start - new Date().getTime();
      } else {
        let time = timerTicks() + 1;
        if (!time) {
          this.fail();
        }
        currentDelay = tickDelay;
        start = new Date().getTime();
      }},  currentDelay);
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    // Всё, что добавлено мной вне этой функции - для работы таймера,
    // но без него - это не игра!

    this.handlers.keydown = function (event) {
      let pressedSymbol = event.key.toLowerCase();
      let correctSymbol = this.currentSymbol.textContent.toLowerCase();
      
      let result = pressedSymbol === correctSymbol ? this.success.bind(this) : this.fail.bind(this);
      result();

      event.preventDefault();
    }.bind(this)
  }

  success() {

    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    document.removeEventListener('keydown', this.handlers.keydown);  // добавлено

    if (++this.winsElement.textContent === 2) {  // 10
      alert('Победа!');
      this.reset();
    } else {  // добавлено
      alert('Молодец, так держать!\nНаберите следующее слово на клавиатуре как можно быстрее!');  // добавлено
    }
    this.setNewWord();
    this.timerElement.textContent = this.setBackOverTime();  // добавлено
    document.addEventListener('keydown', this.handlers.keydown);  // добавлено
  }

  fail() {
    document.removeEventListener('keydown', this.handlers.keydown);  // добавлено

    if (++this.lossElement.textContent === 2) {  // 5
      alert('Вы проиграли!');
      this.reset();
    } else {  // добавлено
      alert('Не айс...\nНаберите следующее слово на клавиатуре как можно быстрее!');  // добавлено
    }
    this.setNewWord();
    this.timerElement.textContent = this.setBackOverTime();  // добавлено
    document.addEventListener('keydown', this.handlers.keydown);  // добавлено
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  setBackOverTime() { return this.wordElement.querySelectorAll(`.symbol`).length; }  // добавлено

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

