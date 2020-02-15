'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var SIMILAR_WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardPanelElement = document.querySelector('.setup');
// Шаблон мага
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
// Панель похожих магов
var setupSimilarElement = document.querySelector('.setup-similar');
// Элемент списка похожих магов
var similarListElement = document.querySelector('.setup-similar-list');

// Элемент открытия настроек мага
var setupOpenElement = document.querySelector('.setup-open');
// Элемент закрытия настроек мага
var setupCloseElement = document.querySelector('.setup-close');
var setupCloseElementClickHandler = function () {
  hideWizardPanel();
};

var setupCloseElementKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    hideWizardPanel();
    // Останавливаем всплытие события
    evt.stopPropagation();
  }
};

// Элемент редактирования имени мага
var setupUserNameElement = document.querySelector('.setup-user-name');
var setupUserNameElementKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    // Останавливаем всплытие события
    evt.stopPropagation();
  }
};

// Элемент мантии
var coatElement = document.querySelector('.setup-wizard .wizard-coat');
var coatColorInput = document.querySelector('input[name=coat-color]');
var coatElementClickHandler = function () {
  var color = getRandomArrayValue(WIZARD_COAT_COLORS);
  coatElement.style.fill = color;
  coatColorInput.value = color;
};

// Элемент глаз
var eyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = document.querySelector('input[name=eyes-color]');
var eyesElementClickHandler = function () {
  var color = getRandomArrayValue(WIZARD_EYES_COLORS);
  eyesElement.style.fill = color;
  eyesColorInput.value = color;
};

// Элемент файрбола
var fireballElement = document.querySelector('.setup-fireball-wrap');
var fileballColorInput = document.querySelector('input[name=fireball-color]');
var fireballElementClickHandler = function () {
  var color = getRandomArrayValue(WIZARD_FIREBALL_COLORS);
  fireballElement.style.backgroundColor = color;
  fileballColorInput.value = color;
};

// Обработчик нажатия клавиши в панели настроек мага
var wizardPanelKeyDownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    hideWizardPanel();
  }
};

// Получить случайно целое число от min до max
var getRandomInteger = function randomInteger(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Получить случайный элемент массива
var getRandomArrayValue = function (array) {
  var arrayLength = array.length;
  var randomIndex = getRandomInteger(0, arrayLength - 1);
  var result = array[randomIndex];
  return result;
};

// Получить заданное количество магов
var getWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    var newWizardName = getRandomArrayValue(WIZARD_NAMES);
    var newWizardLastname = getRandomArrayValue(WIZARD_LASTNAMES);
    var newCoatColor = getRandomArrayValue(WIZARD_COAT_COLORS);
    var newEyeColor = getRandomArrayValue(WIZARD_EYES_COLORS);

    var wizard = {
      name: newWizardName + ' ' + newWizardLastname,
      coatColor: newCoatColor,
      eyeColor: newEyeColor
    };

    wizards.push(wizard);
  }

  return wizards;
};

// Сгенерировать элемент мага
var getWizardElement = function (wizard, teplateElement) {
  var wizardElement = teplateElement.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
};

// Получить массив элементов магов
var getWizardsElements = function (wizards, wizardTemplate) {
  var wizardTemplates = [];

  for (var i = 0; i < wizards.length; i++) {
    var wizard = wizards[i];
    // Создаем элемент мага
    var wizardElement = getWizardElement(wizard, wizardTemplate);
    // Записываем в буферный фрагмент
    wizardTemplates.push(wizardElement);
  }

  return wizardTemplates;
};

// Инициализируем панель магов
var initWizardPanel = function () {
  // Генерируем магов
  var wizards = getWizards(SIMILAR_WIZARD_COUNT);
  // Получаем элементы похожих магов
  var wizardsElements = getWizardsElements(wizards, similarWizardTemplate);

  // Создаем буферный фрагмент
  var wizardsFragment = document.createDocumentFragment();
  // Наполняем буферный фрагмент элементами магов
  for (var i = 0; i < wizardsElements.length; i++) {
    wizardsFragment.appendChild(wizardsElements[i]);
  }

  // Добавляем фрагмент магов в список
  similarListElement.appendChild(wizardsFragment);

  // Делаем видимой панель похожих магов
  setupSimilarElement.classList.remove('hidden');
};

// Показать панель мага
var showWizardPanel = function () {
  wizardPanelElement.classList.remove('hidden');

  // Добавляем обработчик клика для элемента закрытия
  setupCloseElement.addEventListener('click', setupCloseElementClickHandler);
  // Добавляем обработчик нажатия клавиши для элемента закрытия
  setupCloseElement.addEventListener('keydown', setupCloseElementKeydownHandler);

  // Добавляем обработчик нажатия клавиши для элемента имени мага
  setupUserNameElement.addEventListener('keydown', setupUserNameElementKeydownHandler);

  // Обработчик нажатия клавиши в документе
  document.addEventListener('keydown', wizardPanelKeyDownHandler);

  // Добавляем обработчик клика по плащу мага
  coatElement.addEventListener('click', coatElementClickHandler);
  // Добавляем обработчик клика по глазам мага
  eyesElement.addEventListener('click', eyesElementClickHandler);
  // Добавляем обработчик клика по файрболу
  fireballElement.addEventListener('click', fireballElementClickHandler);
};

// Скрыть панель мага
var hideWizardPanel = function () {
  wizardPanelElement.classList.add('hidden');

  // Удаляем обработчик клика для элемента закрытия
  setupCloseElement.removeEventListener('click', setupCloseElementClickHandler);
  // Удаляем обработчик нажатия клавиши для элемента закрытия
  setupCloseElement.removeEventListener('keydown', setupCloseElementKeydownHandler);

  // Удаляем обработчик нажатия клавиши для элемента имени мага
  setupUserNameElement.removeEventListener('keydown', setupUserNameElementKeydownHandler);

  // Удаляем обработчик нажатия клавиши в документе
  document.removeEventListener('keydown', wizardPanelKeyDownHandler);

  // Удаляем обработчик клика по плащу мага
  coatElement.removeEventListener('click', coatElementClickHandler);
  // Удаляем обработчик клика по глазам мага
  eyesElement.removeEventListener('click', eyesElementClickHandler);
  // Удаляем обработчик клика по файрболу
  fireballElement.removeEventListener('click', fireballElementClickHandler);
};

// Элемент открытия настроек мага
setupOpenElement.addEventListener('click', function () {
  showWizardPanel();
});

// Элемент иконки открытия настроек мага
var setupOpenIconElement = document.querySelector('.setup-open-icon');
setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    showWizardPanel();
  }
});

// Инициализируем панель магов
initWizardPanel();
