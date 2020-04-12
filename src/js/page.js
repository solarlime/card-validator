/* eslint-disable class-methods-use-this */
import luhnAlgorithm from './luhn';
import getPaymentSystem from './paySystem';

/**
 * Приложение для проверки правильности номера
 * банковской карты. Работает с 15-ти и 16-тизначными
 * номерами. Поддерживаемые платёжные системы: Visa, MasterCard,
 * Мир, JCB, American Express, Discover, Diners Club
 */
export default class App {
  /**
   * Начальная точка приложения
   * Объявляем переменные для основных элементов
   */
  constructor() {
    this.page = document.body;
    this.form = this.page.querySelector('#form');
    this.input = this.page.querySelector('#input');
    this.button = this.page.querySelector('button.button');
    this.answer = this.page.querySelector('p.answer');
    this.init();
  }

  /**
   * Очищаем форму и добавляем 2 обработчика событий:
   * на текстовое поле и на кнопку
   */
  init() {
    this.form.reset();
    this.input.addEventListener('keydown', (event) => {
      if (this.answer.innerText) {
        this.answer.innerText = '';
      }
      const active = this.page.querySelector('img.card-active');
      if (active) {
        active.classList.remove('card-active');
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        this.checkValue(event.target.value);
      }
    });
    this.button.addEventListener('click', () => {
      this.checkValue(this.button.parentElement.querySelector('input').value);
    });
  }

  /**
   * Основная функция. Чистим строку от пробелов, проверяем
   * на наличие исключительно цифр, на длину в 15 или 16 символов.
   * Запускаем проверку правильности номера карты. После проверки
   * определяем платёжную систему, выводим ответ.
   * @param value - строка в текстовом поле
   */
  checkValue(value) {
    const trimmed = value.trim();
    if (parseInt(trimmed, 10)
      && (trimmed.length === parseInt(trimmed, 10).toString().length)
      && ((trimmed.length >= 14) && (trimmed.length <= 16))) {
      if (luhnAlgorithm(trimmed)) {
        this.answer.innerText = 'This card is valid';
      } else {
        this.answer.innerText = 'This card is invalid';
      }
      this.page
        .querySelector(`img.card[data-name="${getPaymentSystem(trimmed)}"]`)
        .classList.add('card-active');
    } else {
      this.answer.innerText = 'Incorrect input';
    }
  }
}
