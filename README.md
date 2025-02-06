<p align="center">
  <a href="https://nextjs-fastapi-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Digit Prediction with CNN</h3>
  </a>
</p>

<p align="center">A Next.js 14 project utilizing <a href="https://fastapi.tiangolo.com/">FastAPI</a> as the API backend.</p>

<br/>

## Introduction

This project predicts digit values from an uploaded image or a drawing panel. The frontend is built using **Next.js 14**, while **FastAPI** handles image processing and model inference. The CNN model is maintained in a separate [repository](https://github.com/arnon3339/mnist-model.git).

## Demo

Live deployment: [mnist-project.vercel.app](https://mnist-project.vercel.app/)


## Deploy Your Own

You can clone & deploy this project to **Vercel** with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farnon3339%2Fmnist-project%2Ftree%2Fmain)

## Developing Locally

Clone this repository and set up the project with the following command:

```bash
npx create-next-app nextjs-fastapi --example "https://github.com/arnon3339/mnist-project.git"
```

### Getting Started

First, create and activate a **virtual environment**:

```bash
python3 -m venv venv
source venv/bin/activate
```

Then, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Start the development server (Python dependencies will be installed automatically):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The **FastAPI** server will run on [http://127.0.0.1:8000](http://127.0.0.1:8000). You can modify the port in `package.json` (and also update `next.config.js`).

## Dataset

The CNN model uses the **MNIST dataset**, which is publicly available. You can find it on [Kaggle](https://www.kaggle.com). Users can upload an image for digit prediction.

## Repositories

- **Deployment:** [mnist-project](https://github.com/arnon3339/mnist-project.git)  
- **CNN Model:** [mnist-model](https://github.com/arnon3339/mnist-model.git)  
- **Docker Deployment:** *(Coming soon)*

## Learn More

To explore more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Learn about FastAPI features and API.

For more details, check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) – contributions and feedback are welcome!
