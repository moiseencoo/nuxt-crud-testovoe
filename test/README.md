# Tests for useUserFilters
This directory contains comprehensive test scenarios for the application's composables and utilities.

## Test Structure

```
test/
├── setup.ts                   # Global test configuration
├── composables/               # Tests for Vue composables
│   └── useUserFilters.test.ts # Tests for user filtering logic
└── README.md                  # This file
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Data

The tests use mock user data that includes:
- Users with complete information (name, email, phone, company)
- Users without company information
- Users with various phone number formats

## Adding New Tests

When adding new tests:

1. Follow the existing structure and naming conventions
2. Use descriptive test names that explain the expected behavior
3. Test both positive and negative scenarios
4. Include edge cases and error conditions
5. Ensure tests are isolated and don't depend on each other
6. Use the `beforeEach` hook to reset state between tests