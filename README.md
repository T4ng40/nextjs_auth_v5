# Next.js Authentication with Auth.js

This project demonstrates authentication in a Next.js application using Auth.js and Prisma.

## Features

- **Next.js**: A powerful React framework for building server-side rendered applications.
- **TypeScript**: Ensures type safety throughout the application.
- **Prisma**: Provides a robust ORM for database management.
- **Next-Auth**: Simplifies the implementation of authentication in Next.js applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Radix UI**: Unstyled, accessible components for building high-quality user interfaces.
- **BcryptJS**: Used for securely hashing passwords.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/T4ng40/nextjs_auth_v5.git
cd nextjs_auth_v5
```

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Highlights

- **Authentication**: Implemented using Next-Auth with Prisma adapter for secure and efficient user management.
- **Theming**: Supports dark mode and theme switching using `next-themes`.
- **UI Components**: Utilizes Radix UI for accessible and high-quality UI components.
- **Form Handling**: Built-in form validation and handling using `zod`.

## Pages and Functionalities

### Login Page (`src/app/login/page.tsx`)

- **Path**: `/login`
- **Component**: Displays a login form using the `LoginForm` component.
- **Functionality**: Handles user login actions.

### Dashboard Page (`src/app/dash/page.tsx`)

- **Path**: `/dash`
- **Component**: Displays user role and session information.
- **Functionality**: Fetches and displays the current user session using the `auth` function

### Root Layout (`src/app/layout.tsx`)

- **Path**: Applied globally as the root layout.
- **Component**: Wraps the application with theme and session providers.
- **Functionality**: Provides theme support, session management, and notifications.

### Register Page (`src/app/register/page.tsx`)

- **Path**: `/register`
- **Component**: Displays a registration form using the `RegisterForm` component.
- **Functionality**: Handles user registration, hashing passwords with `bcryptjs`, and saving user data to the database.

### API Routes

- **Authentication Route (`src/app/api/auth/[...nextauth]/route.ts`)**: Defines GET and POST handlers for authentication using `next-auth`.

### Schemas

- **Login Schema (`src/schemas/loginSchema.ts`)**: Validates login form data.
- **Magic Link Schema (`src/schemas/magicLinkSchema.ts`)**: Validates magic link form data.
