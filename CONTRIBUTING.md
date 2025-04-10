# Contributing to Anjaneya Innovations Website

First off, thank you for considering contributing! Your help is appreciated.

This document provides guidelines for contributing to the Anjaneya Innovations website project.

## Table of Contents

*   [Code of Conduct](#code-of-conduct)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Locally](#running-locally)
*   [Making Changes](#making-changes)
    *   [Branching](#branching)
    *   [Code Style](#code-style)
    *   [Commit Messages](#commit-messages)
*   [Testing](#testing)
*   [Submitting Changes](#submitting-changes)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. (We may need to add a separate CODE_OF_CONDUCT.md file later if desired).

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended, check `.nvmrc` or `package.json` engines if specified)
*   [npm](https://www.npmjs.com/) (comes with Node.js)
*   [Git](https://git-scm.com/)

### Installation

1.  Fork the repository (if contributing externally) or clone it directly:
    ```bash
    git clone <repository-url>
    cd anjaneyainnovations
    ```
2.  Install project dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the Astro development server:

```bash
npm run dev
```

Navigate to `http://localhost:4321` (or the port specified in the console output).

## Making Changes

### Branching

1.  Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b <branch-type>/<short-description>
    # Examples: feature/add-blog-pagination, fix/mobile-menu-alignment
    ```
2.  Make your changes on this branch.

### Code Style

*   **Formatting:** This project aims for consistent formatting. Consider using [Prettier](https://prettier.io/) with default settings or integrating it into the project setup.
*   **CSS:** Follow existing patterns (CSS Variables, utility classes where appropriate).
*   **JavaScript:** Use modern JavaScript syntax. Keep code readable and add comments for complex logic.
*   **Astro Components:** Follow Astro's component structure and best practices.

### Commit Messages

Please write clear and concise commit messages. Following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification is recommended:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Example:
`feat: add Insights page placeholder`
`fix(css): correct header alignment on mobile`

## Testing

*(This section to be updated once testing infrastructure is in place)*

*   **End-to-End Tests:** (Using Playwright - setup pending)
    ```bash
    # Command to run tests (example)
    # npm run test:e2e 
    ```
*   Ensure all tests pass before submitting changes.
*   Add new tests for new features or bug fixes where applicable.

## Submitting Changes

1.  Commit your changes with clear messages.
2.  Push your branch to the remote repository:
    ```bash
    git push origin <branch-name>
    ```
3.  Open a Pull Request (PR) against the `master` branch.
4.  Provide a clear description of the changes in the PR.
5.  Ensure any CI checks (like build and tests in GitHub Actions) pass.
6.  Collaborate on any feedback or requested changes.

Thank you for contributing! 