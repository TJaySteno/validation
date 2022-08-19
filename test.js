/************************************************
VALIDATION TESTING
************************************************/

/**************** RULE ****************/
// Write your rule after you tests are written
// Your rule will flag if this returns true

const rule = function (a,b,c,d) {
  return a && b && (c || d);
}

/**************** TESTS ****************/
// Write tests for all your scenerios
// Reference: https://jestjs.io/docs/api

test('Should not flag if not transported', () => {
  expect(rule(0, 0, 0, 0)).toBe(0);
  expect(rule(0, 1, 0, 0)).toBe(0);
  expect(rule(0, 0, 1, 0)).toBe(0);
  expect(rule(0, 0, 0, 1)).toBe(0);
  expect(rule(0, 0, 1, 1)).toBe(0);
  expect(rule(0, 1, 1, 1)).toBe(0);
});

test('Should flag if transported with no signatures', () => {
  expect(rule(1, 1, 1, 1)).toBe(1);
});

test('Should not flag if transported with patient signature', () => {
  expect(rule(1, 0, 1, 1)).toBe(0);
});

test('Should flag if transported with only patient rep signature', () => {
  expect(rule(1, 1, 0, 1)).toBe(1);
});

test('Should flag if transported with only HC provider signature', () => {
  expect(rule(1, 1, 1, 0)).toBe(1);
});

test('Should not flag if transported with PR and HCP signatures', () => {
  expect(rule(1, 1, 0, 0)).toBe(0);
});
