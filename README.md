# FitLife Gym Application

This is a simple gym application created for GitHub Actions practice.

## Features

- Gym membership plans
- Member registration form
- BMI calculator
- Node.js server
- Automated tests
- GitHub Actions workflow

## Project Structure

```text
gym_application_github_actions/
├── .github/
│   └── workflows/
│       └── nodejs-ci.yml
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── src/
│   └── gym.js
├── test/
│   └── app.test.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## How to Run Locally

```bash
npm install
npm start
```

Open in your browser:

```text
http://localhost:3000
```

If port 3000 is already busy, run another port:

```bash
PORT=3001 npm start
```

On Windows PowerShell:

```powershell
$env:PORT=3001; npm start
```

## Run Tests

```bash
npm test
```

## GitHub Actions

The workflow file is already included here:

```text
.github/workflows/nodejs-ci.yml
```

It runs automatically when you push to GitHub on the `main` or `master` branch.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial gym application with GitHub Actions"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
