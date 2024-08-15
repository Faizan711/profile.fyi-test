# E-commerce Test App

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- **TypeScript**: For type safety and improved development experience.
- **NextAuth**: Integrated for user authentication.
- **Redux Toolkit**: For managing global state, including cart functionality.
- **Tailwind CSS**: For utility-first CSS styling.

## Checkout the App

The application is deployed on Vercel and can be accessed via the following link:

https://profile-fyi-test.vercel.app/

### Credentials

Email: admin@gmail.com

Password: admin@123

## Setting up locally

### 1. Install the Dependencies

First, ensure you have Node.js installed on your machine. Then, install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Variables:

To set up authentication with NextAuth, you'll need to configure environment variables in a .env.local file at the root of the project.

```bash
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. Run Development Server

To set up authentication with NextAuth, you'll need to configure environment variables in a .env.local file at the root of the project.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Login with Below Credentials

Email: admin@gmail.com

Password: admin@123
