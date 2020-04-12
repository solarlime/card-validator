/**
 * Функция, реализующая проверку по алгоритму Луна
 * @param cardNumberString - числовая строка
 * @returns {boolean} - true, если алгоритм пройден успешно. Иначе - false
 */
export default function luhnAlgorithm(cardNumberString) {
  let sum = 0;

  for (let i = 0; i < cardNumberString.length; i += 1) {
    let cardNumber = parseInt(cardNumberString[i], 10);
    if ((cardNumberString.length - i) % 2 === 0) {
      cardNumber *= 2;
      if (cardNumber > 9) {
        cardNumber -= 9;
      }
    }
    sum += cardNumber;
  }

  return sum % 10 === 0;
}
