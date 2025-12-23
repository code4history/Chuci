
## ADDED Requirements

### Requirement: GitHub Pages Deployment
The project MUST include a GitHub Actions workflow to deploy the demo website to GitHub Pages.

#### Scenario: Verify Workflow File
- **Given** I verify `.github/workflows/`
- **Then** a file named `deploy.yml` (or similar) should exist
- **And** it should trigger ONLY on push to `main`
