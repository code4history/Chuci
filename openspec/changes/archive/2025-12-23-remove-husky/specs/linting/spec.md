
## MODIFIED Requirements

### Requirement: CI Enforcement
Code quality checks (linting, testing) MUST be enforced by the Continuous Integration (CI) system instead of local git hooks.

#### Scenario: Verify CI Linting
- **Given** I push a commit with linting errors
- **Then** the CI workflow (`ci.yml`) should fail
- **And** the pull request should be blocked (if branch protection is enabled)
