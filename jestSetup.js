// TODO: This file is executed before each test. find a better place to extend expect
expect.extend({
  toMatchArryIgnoringOrder(received, expected) {
    try {
      expect(received.length).toEqual(expected.length);
      expect(received).toEqual(expect.arrayContaining(expected));

      return {
        message: () =>
          `expected ${JSON.stringify(received)} not to match ${JSON.stringify(
            expected
          )}`,
        pass: true
      };
    } catch (e) {
      return {
        message: () =>
          `expected ${JSON.stringify(received)} to match array ${JSON.stringify(
            expected
          )} ignoring the order`,
        pass: false
      };
    }
  }
});

expect.extend({
  isFalsyMatrix(received, n) {
    const exactN = received.length === n && received[0].length === n;

    let allFalsy = true;

    received.forEach(tuple => {
      tuple.forEach(item => {
        if (item) {
          allFalsy = false;
        }
      });
    });

    if (exactN && allFalsy) {
      return {
        message: () =>
          `expected ${JSON.stringify(
            received
          )} not to be an array of all falsy values of n = ${n}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${JSON.stringify(
            received
          )} to be an array of all falsy values of n = ${n}`,
        pass: false
      };
    }
  }
});
