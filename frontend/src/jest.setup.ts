let consoleSpy: jest.MockedFunction<any>;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleSpy).not.toBeCalled();
  consoleSpy.mockRestore();
});
