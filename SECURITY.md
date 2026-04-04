# Security Policy

## Scope

This repository is intended to hold the NEXUS AI Safety Certification Portal and its delivery controls. Security expectations apply to application code, infrastructure code, workflows, secrets handling, and release artifacts.

## Supported security baseline

Changes are expected to preserve or improve:

- authentication and session handling
- role-based access control
- input validation and output encoding
- file upload validation
- dependency hygiene
- secret protection
- auditability of privileged actions

## Reporting a vulnerability

Please report suspected vulnerabilities privately to the repository owner and do not open a public issue with exploit details.

Include:

- affected area
- impact
- reproduction steps
- suggested remediation if known

## Secure delivery expectations

Before release, changed areas should have:

- passing CI quality gates
- no unresolved critical or high severity findings in the changed scope
- validated migrations where applicable
- documented rollback considerations for risky changes
