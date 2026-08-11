
## ADDED Requirements

### Requirement: Dev Server Root URL Access
The development server MUST serve `index.html` when accessed at the root URL (`http://localhost:5173/`).

#### Scenario: Verify Root URL
- **Given** I run `pnpm dev`
- **When** I access `http://localhost:5173/`
- **Then** I should see the application/demo page
