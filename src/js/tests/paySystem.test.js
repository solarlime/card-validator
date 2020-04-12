import getPaymentSystem from '../paySystem';

test.each([
  ['Visa', '4276010021346554', 'Visa'],
  ['MasterCard', '5189010004509395', 'MasterCard'],
  ['MIR', '2202200128683966', 'MIR'],
  ['JCB', '3540696663911028', 'JCB'],
  ['Diners Club', '36426861860000', 'Diners Club'],
  ['Discover', '6011001810500209', 'Discover'],
  ['American Express', '371758885524003', 'American Express'],
  ['Other PS (China UnionPay)', '6226806064650273', 'Can\'t resolve the payment system'],
])('%s', (_, received, expected) => {
  expect(getPaymentSystem(received)).toEqual(expected);
});
