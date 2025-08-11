// Sample test file to verify Jest setup
describe('Jest Configuration Test', () => {
  test('should be able to run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  test('should support async tests', async () => {
    const promise = Promise.resolve('test');
    await expect(promise).resolves.toBe('test');
  });

  test('should support TypeScript features', () => {
    interface TestInterface {
      name: string;
      value: number;
    }

    const testObject: TestInterface = {
      name: 'test',
      value: 42
    };

    expect(testObject.name).toBe('test');
    expect(testObject.value).toBe(42);
  });
});
