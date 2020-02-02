'use strict';

var SIMILAR_WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Получить случайно целое число от 0 до max
var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

// Получить случайное число из массива
var getRandomArrayValue = function (array) {
  var maxIndex = array.length - 1;
  var randomIndex = getRandomInt(maxIndex);
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

// Отображение списка похожих магов
var showSimilarWizards = function (wizards) {
  // Элемент списка похожих магов
  var similarListElement = document.querySelector('.setup-similar-list');

  // Шаблон мага
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // Создаем буферный фрагмент
  var wizardsFragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    var wizard = wizards[i];
    // Создаем элемент мага
    var wizardElement = getWizardElement(wizard, similarWizardTemplate);
    // Записываем в буферный фрагмент
    wizardsFragment.appendChild(wizardElement);
  }

  // Добавляем фрагмент магов в список
  similarListElement.appendChild(wizardsFragment);
};

// Показать панель мага
var showWizardPanel = function () {
  // Отображаем панель мага
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  // Генерируем магов
  var wizards = getWizards(SIMILAR_WIZARD_COUNT);
  // Отображаем похожих магов
  showSimilarWizards(wizards);

  // Делаем видимой панель похожих магов
  var setupSimilarDiv = document.querySelector('.setup-similar');
  setupSimilarDiv.classList.remove('hidden');
};

showWizardPanel();
