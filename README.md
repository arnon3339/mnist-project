<p align="center">
  <a href="https://nextjs-fastapi-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Digit Prediction with CNN</h3>
  </a>
</p>

<p align="center">A Next.js 14 project utilizing <a href="https://fastapi.tiangolo.com/">FastAPI</a> as the API backend.</p>

---

## 🚀 Introduction

**Digit Prediction with CNN** is a web application that predicts handwritten digit values from either an uploaded image or a drawing panel. The frontend is built using **Next.js 14**, while the backend, powered by **FastAPI**, processes images and performs model inference. The Convolutional Neural Network (CNN) model used for predictions is maintained in a separate [repository](https://github.com/arnon3339/mnist-model.git).

## 🌍 Live Demo

Check out the live deployment: [MNIST Project](https://mnist-project.vercel.app/)

## 📦 Deploy Your Own

You can clone & deploy this project to **Vercel** with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farnon3339%2Fnextjs-fastapi-emojiiai%2Ftree%2Fmain)

## 📦 Developing Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/arnon3339/mnist-project.git
cd mnist-project
```

### 2️⃣ Set Up a Virtual Environment (Backend)

```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```

### 3️⃣ Install Dependencies

```bash
npm install  # or yarn or pnpm install
```

### 4️⃣ Start the Development Server

```bash
npm run dev  # or yarn dev or pnpm dev
```

The **Next.js** frontend runs on [http://localhost:3000](http://localhost:3000).
The **FastAPI** backend runs on [http://127.0.0.1:8000](http://127.0.0.1:8000).

Modify the backend port in `package.json` if needed and update `next.config.js` accordingly.

## 📊 Dataset

This project utilizes the **MNIST dataset**, a well-known dataset for handwritten digit recognition. The dataset is publicly available on platforms such as [Kaggle](https://www.kaggle.com/). Users can upload an image or draw a digit for prediction.

## 📂 Project Repositories

- **Frontend & API:** [MNIST Project](https://github.com/arnon3339/mnist-project.git)
- **CNN Model:** [MNIST Model](https://github.com/arnon3339/mnist-model.git)
- **Docker Deployment:** *(Coming soon!)*

## 📚 Learn More

Explore the technologies used in this project:

- 📖 [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- 🎓 [Next.js Interactive Tutorial](https://nextjs.org/learn)
- ⚡ [FastAPI Documentation](https://fastapi.tiangolo.com/)

For contributions and feedback, check out the [Next.js GitHub repository](https://github.com/vercel/next.js/). Happy coding! 🚀
