# NEXUS — AI Safety Certification Portal

This repository currently provides the enterprise delivery baseline for the planned **NEXUS** portal: testing standards, security validation, CI quality gates, and repository governance.

## Target stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL 16 |
| ORM | Prisma 7 |
| Auth | JWT (`jose`) |
| Email | Nodemailer |
| PDF | Puppeteer |
| Charts | Recharts |
| Rich text | Tiptap |
| Toasts | Sonner |
| Forms | React Hook Form + Zod |
| Tests | Vitest |
| CI | GitHub Actions |

## Enterprise baseline now tracked in this repo

### CI quality gates

- Lint
- Typecheck
- Production build
- Unit tests
- Integration/API tests
- E2E tests
- Coverage enforcement
- Dependency review
- Secret scanning
- Static security analysis
- Container scanning
- Database migration validation

### Required application scripts

When the app is added, `package.json` should expose at least:

- `lint`
- `typecheck`
- `build`
- `test`
- `test:coverage`
- `test:integration`
- `test:e2e`
- `db:migrate`

### Test scope

- Unit tests for pure business logic
- Integration tests for auth, APIs, Prisma, email, PDF, storage, and audit flows
- E2E tests for submitter, receiver, approver, admin, and public registry journeys
- Negative and abuse-path coverage for auth, uploads, malformed payloads, and RBAC
- Migration and seed validation against PostgreSQL 16
- Accessibility, responsive, visual regression, and smoke coverage for critical UI

### Security baseline

- CodeQL for static analysis
- Dependency Review on pull requests
- Dependabot update automation
- Gitleaks secret scanning
- Trivy filesystem and container scanning
- Release gating on zero unresolved critical/high issues in changed scope

### Release criteria

- Build passes
- Required tests pass
- Coverage threshold passes
- Security scans pass
- Migration path validated
- Rollback path documented
- Monitoring and audit logging verified for changed areas

## Repository governance

- `/.github/workflows/ci.yml` enforces application quality gates once the app scaffold exists
- `/.github/workflows/codeql.yml` runs static security analysis
- `/.github/workflows/dependency-review.yml` blocks risky dependency changes on PRs
- `/.github/workflows/secret-scan.yml` scans for leaked secrets
- `/.github/workflows/container-scan.yml` scans Docker assets when present
- `/.github/workflows/dast.yml` provides manual OWASP ZAP baseline scans for staging targets
- `/.github/CODEOWNERS` defines review ownership
- `/.github/pull_request_template.md` standardizes change, test, and security reporting
- `/.github/dependabot.yml` automates dependency and action updates
- `/SECURITY.md` defines vulnerability reporting expectations

## Current state

The repository is intentionally minimal at the moment. The workflows are designed to:

- validate repository governance immediately
- stay safe on an empty repository
- become enforceable application gates as soon as the Next.js/Prisma app is added
