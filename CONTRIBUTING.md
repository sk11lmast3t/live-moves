# Contributing Guidelines

## Code Style

### JavaScript/Node.js
- Use 2-space indentation
- Use 'use strict' at the top of modules
- Use const/let instead of var
- Use arrow functions where appropriate
- Write meaningful variable names

### ESLint Configuration
```javascript
// .eslintrc.json
{
  "env": {
    "node": true,
    "es2021": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

## Git Workflow

1. Create feature branch:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Commit with clear messages:
   ```bash
   git commit -m "feat: add user authentication"
   ```

3. Push to branch:
   ```bash
   git push origin feature/feature-name
   ```

4. Open Pull Request

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Code style change
- **refactor**: Code refactoring
- **test**: Test addition
- **chore**: Build process changes

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Run `npm run lint`
4. Ensure all tests pass: `npm test`
5. Get approval from maintainers

## Testing

### Backend Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

## Code Review Checklist

- [ ] Code follows style guide
- [ ] Changes are well-commented
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No console logs left
- [ ] No hardcoded values
- [ ] Error handling is proper

## API Versioning

- Current version: v1
- Use versioning in routes: `/api/v1/...`
- Maintain backward compatibility
- Document breaking changes

## Performance Guidelines

- Use pagination for large datasets
- Implement caching where appropriate
- Optimize database queries
- Minify production builds
- Use CDN for assets

## Security Guidelines

- Never commit .env files
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting
- Use prepared statements (Mongoose)
- Keep dependencies updated

## Documentation

- Write clear comments for complex logic
- Update README for new features
- Include API documentation
- Document configuration options
- Include setup instructions

## Release Process

1. Update version in package.json
2. Update CHANGELOG
3. Create git tag: `git tag v1.0.0`
4. Push to main branch
5. Create GitHub release

## Questions?

Open an issue or contact the main contributors.
