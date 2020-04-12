/**
 * Функция, возвращающая название платёжной системы.
 * Проверяется соответствие регулярным выражениям. Если не нашлось
 * ни одно, то возвращается сообщение о невозможности определить систему.
 * Определяются: Visa, MasterCard, Мир, JCB, Discover, American Express, Diners Club
 * @param cardNumberString
 * @returns {string}
 */
export default function getPaymentSystem(cardNumberString) {
  if (/^4/.test(cardNumberString)) {
    return 'Visa';
  }
  if (/^5[1-5]/.test(cardNumberString)) {
    return 'MasterCard';
  }
  if (/^2/.test(cardNumberString)) {
    return 'MIR';
  }
  if (/^3[15]/.test(cardNumberString)) {
    return 'JCB';
  }
  if (/^3[068]/.test(cardNumberString)) {
    return 'Diners Club';
  }
  if (/^60/.test(cardNumberString)) {
    return 'Discover';
  }
  if (/^3[47]/.test(cardNumberString)) {
    return 'American Express';
  }
  return 'Can\'t resolve the payment system';
}
