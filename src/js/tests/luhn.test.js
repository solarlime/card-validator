import luhnAlgorithm from '../luhn';

test.each([
  ['Valid card', '4276010021346554', true],
  ['Invalid card', '5469370010432874', false],
])('%s', (_, received, expected) => {
  expect(luhnAlgorithm(received)).toEqual(expected);
});
