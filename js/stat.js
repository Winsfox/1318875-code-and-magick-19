'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var MESSAGE_LINE_1_X = 110;
var MESSAGE_LINE_1_Y = 30;

var MESSAGE_LINE_2_X = 110;
var MESSAGE_LINE_2_Y = 50;

// Оступ гистограммы от верхней границы облака
var HISTOGRAM_INDENT_TOP = 80;
var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_COLUMN_WIDTH = 40;
var HISTOGRAM_COLUMNS_SPACING = 50;
var HISTOGRAM_COLUMN_OWN_COLOR = 'rgba(255, 0, 0, 1)';

var PLAYER_NAME_IS_MY = 'Вы';

// Отрисовать облако
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Округлить все входные значения до целого
var roundValues = function (values) {
  var result = [];
  for (var i = 0; i < values.length; i++) {
    var roundValue = Math.round(values[i]);
    result.push(roundValue);
  }

  return result;
};

// Получить случайно целое число от 0 до max
var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

// Сгенерировать строку hsl
var getHslString = function (h, s, l) {
  var hslString = 'hsl(' + h + ',' + s + '%,' + l + '%)';
  return hslString;
};

// Найти максимальный элемент
var getMaxValue = function (values) {
  var max = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  return max;
};

// Высчитать высоту столбцов
var calcColumnsHeight = function (times, maxHeight) {
  var result = [];
  // Ищем самое большое значение
  var maxTime = getMaxValue(times);

  for (var i = 0; i < times.length; i++) {
    var height = times[i] * maxHeight / maxTime;
    var roundHeight = Math.round(height);
    result.push(roundHeight);
  }

  return result;
};

// Сгенерировать массив объектов столбцов
var getColumnsInfo = function (times, names) {
  // Переменная для хранения результата
  var columnInfo = [];
  // Округляем значения времени
  var roundTimes = roundValues(times);
  // Считаем высоту столбцов
  var columnsHeight = calcColumnsHeight(roundTimes, HISTOGRAM_HEIGHT);
  // Инициируем каждый столбец
  for (var i = 0; i < times.length; i++) {
    var color;
    // Если игрок это МЫ, то задаем специальный цвет
    if (names[i] === PLAYER_NAME_IS_MY) {
      color = HISTOGRAM_COLUMN_OWN_COLOR;
    } else {
      // Иначе генерируем новый цвет
      var hslL = getRandomInt(90);
      color = getHslString(236, 100, hslL);
    }

    // Создаем объект столбца
    var column = {
      player: names[i],
      time: roundTimes[i],
      height: columnsHeight[i],
      color: color
    };

    columnInfo.push(column);
  }

  return columnInfo;
};

// Отрисовка гистограммы
var renderHistogram = function (ctx, times, names) {
  // Получаем массив объектов столбцов
  var columnsInfo = getColumnsInfo(times, names);

  // Высчитваем координаты X для первого столбца
  var columnX = CLOUD_X + HISTOGRAM_COLUMNS_SPACING;
  // Нижняя граница столбцов
  var columnsBottomBorder = CLOUD_Y + HISTOGRAM_INDENT_TOP + HISTOGRAM_HEIGHT;
  for (var i = 0; i < columnsInfo.length; i++) {
    // Записываем высоту столбца
    var columnHeight = columnsInfo[i].height;
    // Высчитываем отступ сверху
    var columnY = columnsBottomBorder - columnHeight;

    // Задаем цвет
    ctx.fillStyle = columnsInfo[i].color;
    // Запускаем отрисовку
    ctx.fillRect(columnX, columnY, HISTOGRAM_COLUMN_WIDTH, columnHeight);
    // Выводим имя игрока
    ctx.fillStyle = '#000';
    ctx.fillText(columnsInfo[i].player, columnX, columnsBottomBorder + 10);
    // Выводим время
    ctx.fillText(columnsInfo[i].time, columnX, columnY - 20);

    // Высчитваем координаты X для следующего столбца
    columnX += HISTOGRAM_COLUMN_WIDTH + HISTOGRAM_COLUMNS_SPACING;
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем облако
  // Рисуем тень
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_SHADOW_COLOR);
  // Рисуем основную область
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // Выводим текст
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', MESSAGE_LINE_1_X, MESSAGE_LINE_1_Y);
  ctx.fillText('Список результатов: ', MESSAGE_LINE_2_X, MESSAGE_LINE_2_Y);

  // Рисуем гистограмму
  renderHistogram(ctx, times, names);
};
