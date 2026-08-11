

## ADDED Requirements

### Requirement: Recommended Extensions
The project MUST include `.vscode/extensions.json` to recommend essential extensions (ESLint, Prettier) to VSCode users.

#### Scenario: Verify Extensions
- **Given** I open the project in VSCode
- **When** I check the "Recommended" extensions section
- **Then** I should see ESLint and Prettier listed

### Requirement: Workspace Settings
The project MUST include `.vscode/settings.json` to enable specific behaviors like "Format on Save" to enforce consistency.

#### Scenario: Verify Format on Save
- **Given** I modify a file in VSCode
- **When** I save the file
- **Then** it should be automatically formatted by Prettier
