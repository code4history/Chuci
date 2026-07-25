

## ADDED Requirements

### Requirement: Pre-commit Hooks
The project MUST use Husky to trigger pre-commit hooks, ensuring code quality checks run before committing validation.

#### Scenario: Verify Husky Install
- **Given** Husky is installed and initialized
- **When** I check `.husky/` directory
- **Then** it should contain a `pre-commit` hook

### Requirement: Lint Staged
The project MUST use `lint-staged` to run linters and formatters only on changed files during the pre-commit hook.

#### Scenario: Verify Lint Staged
- **Given** I adhere to the `lint-staged` configuration in `package.json`
- **When** I attempt to commit a file with linting errors
- **Then** the commit should be blocked
- **And** the output should show the linting failure
