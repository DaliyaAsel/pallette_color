const saveBtn = document.getElementById('color_btn'),
  resultColor = document.querySelector('.result-color');

let form = document.forms[0];
let color = document.getElementById('color'),
  typeColor = document.getElementById('type'),
  codeColor = document.getElementById('code');

let colorArr = [];
let errorDiv = document.createElement('div');

function addColors() {
  saveBtn.addEventListener('click', (e) => {


    let colorUpperCase = color.value.toUpperCase(); //для перевода цвета в верхний регистр
    //Проверяем, что название цвета состоит только из букв латинского алфавита
    if (/^[A-Z]+$/.test(colorUpperCase)) {
      // Проверка, правильности введенного кода цвета
      if (checkColorCode(typeColor.value, codeColor.value)) {
        
        //Проверка, что такого цвета нет в массиве
        // Конкретно для проверки наличия элемента в массиве существует метод includes – https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        if (colorArr.indexOf(colorUpperCase) == -1) {

          errorDiv.remove();
          colorArr.push(colorUpperCase);
          // Создание блоков для вывода цвета
          let blockPalette = document.createElement('div');
          blockPalette.classList.add('new-palette');
          let innerdBlockPalette = document.createElement('div');
          innerdBlockPalette.classList.add('innerblock');
          // Придание цвета блокам наружного и внутреннего, исходя из введенного кода цвета и выбора типа цвета
          if (typeColor.value == 'rgb') {
            blockPalette.style.backgroundColor = `rgb(${codeColor.value})`;
            innerdBlockPalette.style.backgroundColor = `rgba(255,255,255,0.5)`;
          } else if (typeColor.value == 'rgba') {
            blockPalette.style.backgroundColor = `rgba(${codeColor.value})`;
            innerdBlockPalette.style.backgroundColor = `rgba(255,255,255,0.5)`;
          } else {
            blockPalette.style.backgroundColor = `${codeColor.value}`;
            innerdBlockPalette.style.backgroundColor = `rgba(255,255,255,0.5)`;
          }

          resultColor.append(blockPalette);
          blockPalette.append(innerdBlockPalette);
          innerdBlockPalette.innerHTML = colorUpperCase + '<br>' + typeColor.value + '<br>' + codeColor.value;
        } else {
          errorDiv.classList.add('errorDiv');
          errorDiv.textContent = 'Такой цвет есть и он не будет добавлен';
          addErrorBlock();
        }
      } else {
        if (codeColor.value == '') {
          errorDiv.classList.add('errorDiv');
          errorDiv.textContent = 'Поле Code не может быть пустым';
          addErrorBlock();
        } else {
          errorDiv.classList.add('errorDiv');
          // Вызов функции для описания ошибки ввода кода цвета
          descriptionErrorCodeColor(typeColor.value);
          addErrorBlock();
        }
      }
    } else {
      if (color.value == '') {
        errorDiv.classList.add('errorDiv');
        errorDiv.textContent = 'Поле Color не может быть пустым';
        addErrorBlock();
      } else {
        errorDiv.classList.add('errorDiv');
        errorDiv.textContent = 'Название цвета должно состоять только из букв латинского алфавита';
        addErrorBlock();
      }
    }

    e.preventDefault(); //отменяем событие браузера по-умолчанию
    form.reset(); //очищаю форму
  });
}

// Функция для проверки соответствия введенным данным в поле code
function checkColorCode(typeColor, codeColor) {
  switch (typeColor) {
    case 'rgb':
      return /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/.test(codeColor);
    case 'rgba':
      return /(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*((0.[1-9])|[01])\s*)$/.test(codeColor);
    case 'hex':
      return /[\#]([a-fA-F\d]{6}|[a-fA-F\d]{3})/gm.test(codeColor);
    default:
      return false;
  }
}

function addErrorBlock() {
  form.prepend(errorDiv);
  errorDiv.addEventListener('click', (e) => {
    errorDiv.remove();
  })
}

function descriptionErrorCodeColor(typeColor){
  switch (typeColor) {
    case 'rgb':
      errorDiv.textContent = 'RGB code должен быть в формате 0-255,0-255,0-255';
      break;
    case 'rgba':
      errorDiv.textContent = 'RGBA code должен быть в формате 0-255,0-255,0-255,0-1';
      break;
    default:
      errorDiv.textContent = 'HEX code должен состоять из символа # и 6 цифр или букв от a до f, или 3 букв. Пример: #f4b5f6 или #fff';
      break;
  }
}

addColors();