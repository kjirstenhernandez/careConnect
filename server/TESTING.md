# Jest Testing Setup for TypeScript

This project uses Jest with ts-jest for testing TypeScript code in the server.

## Available Scripts

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode (re-runs when files change)
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
server/
├── __tests__/           # Test files
│   ├── setup.test.ts    # Basic Jest setup verification
│   └── providers.test.ts # Example controller tests
├── jest.config.js       # Jest configuration
├── jest.setup.js        # Global test setup
└── tsconfig.json        # TypeScript configuration (updated for tests)
```

## Writing Tests

### Basic Test Structure

```typescript
describe('Feature Name', () => {
  test('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

### Testing Express Controllers

```typescript
import request from 'supertest';
import express from 'express';
import { controllerFunction } from '../controllers/example';

// Mock dependencies
jest.mock('../prisma/client');

const app = express();
app.use(express.json());
app.get('/endpoint', controllerFunction);

describe('Controller Tests', () => {
  test('should handle request correctly', async () => {
    const response = await request(app).get('/endpoint');
    expect(response.status).toBe(200);
  });
});
```

### Mocking Prisma

```typescript
// Mock the entire Prisma client
jest.mock('../prisma/client', () => ({
  providers: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

// In your test
import prisma from '../prisma/client';
(prisma.providers.findMany as jest.Mock).mockResolvedValue(mockData);
```

## Configuration Details

### jest.config.js
- Uses `ts-jest` preset for TypeScript support
- Test files: `**/__tests__/**/*.ts` and `**/*.{test,spec}.ts`
- Excludes coverage for node_modules, dist, and test files
- 10-second timeout for async operations

### TypeScript Configuration
- Added Jest types to tsconfig.json
- Includes test files in TypeScript compilation
- Supports ES modules and CommonJS

## Best Practices

1. **Organize tests**: Keep tests in `__tests__` folder or use `.test.ts` suffix
2. **Mock external dependencies**: Always mock database calls, external APIs
3. **Test edge cases**: Success, failure, and error scenarios
4. **Use descriptive names**: Clear test and describe block names
5. **Clean up**: Use `beforeEach` and `afterEach` for test isolation

## Example Test Patterns

### Async/Await Testing
```typescript
test('should handle async operations', async () => {
  const promise = Promise.resolve('data');
  await expect(promise).resolves.toBe('data');
});
```

### Error Handling
```typescript
test('should handle errors gracefully', async () => {
  mockFunction.mockRejectedValue(new Error('Database error'));
  const response = await request(app).get('/endpoint');
  expect(response.status).toBe(500);
});
```

### TypeScript Interfaces
```typescript
test('should work with TypeScript types', () => {
  interface TestType {
    id: string;
    name: string;
  }
  
  const testObject: TestType = { id: '1', name: 'test' };
  expect(testObject.id).toBe('1');
});
```
