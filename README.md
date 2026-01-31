```markdown
# LMS (Learning Management System)

<p align="center">
  <img src="https://img.clerk.com/preview.png" alt="LMS Logo" width="100"/>
</p>

LMS is a sophisticated Learning Management System built with Next.js, designed to provide an interactive and personalized learning experience. It leverages cutting-edge technologies for authentication, AI-driven content generation, and a dynamic user interface.

---

## ✨ Features

*   **AI-Powered Companions**: Interact with AI companions that can explain complex subjects and provide personalized learning paths.
*   **Interactive Learning Modules**: Engage with dynamic content, including 3D visualizations and real-time feedback.
*   **Secure Authentication**: Robust user authentication and management powered by Clerk.
*   **Personalized Journeys**: Track and manage your learning progress with "My Journey" features.
*   **Marketplace**: Discover and access a curated selection of learning resources and AI companions.
*   **Rich UI Components**: Built with Radix UI and Aceternity UI for a modern and accessible user experience.
*   **Real-time Data**: Seamless integration with Supabase for data persistence and real-time updates.

---

## 🚀 Tech Stack

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **UI Components**: Radix UI, Aceternity UI, Shadcn/ui
*   **Authentication**: Clerk
*   **AI Integration**: Google Generative AI (`@google/genai`)
*   **Database**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
*   **3D Rendering**: React Three Fiber (`@react-three/fiber`, `@react-three/drei`), React Spline (`@splinetool/react-spline`)
*   **Utilities**: `jsmastery/utils`, `react-hook-form`
*   **Icons**: `@tabler/icons-react`
*   **Styling**: Tailwind CSS, PostCSS

---

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/lms.git
    cd lms
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables**:
    Create a `.env.local` file in the root of your project and add the following variables:

    ```env
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

    # Google Generative AI
    GOOGLE_API_KEY=your_google_api_key
    ```
    You can obtain these keys from your respective provider dashboards (Clerk, Supabase, Google AI Studio).

4.  **Initialize Supabase**:
    If you haven't already, set up your Supabase project and create the necessary tables as defined by the application's data models.

---

## 💡 Usage

1.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2.  **Open the application**:
    Navigate to `http://localhost:3000` in your web browser.

    You will be prompted to sign up or sign in via Clerk. Once authenticated, you can explore the various sections of the LMS:

    *   **Homepage**: Landing page with introductory information and featured content.
    *   **Marketplace**: Browse available AI companions and learning resources.
    *   **Companions**: Interact with AI learning assistants.
    *   **My Journey**: View and manage your personal learning progress and history.

---

## 📂 Project Structure

```
lms/
├── app/                  # Next.js App Router routes and UI
│   ├── api/
│   ├── companions/
│   ├── global-error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── marketplace/
│   ├── my-journey/
│   ├── page.tsx
│   ├── sentry-example-page/
│   ├── sign-in/
│   ├── subscription/
│   └── ...
├── components/           # Reusable React components
│   ├── aceternity/       # Aceternity UI components
│   ├── blocks/
│   ├── CompanionCard.tsx
│   ├── CompanionComponent.tsx
│   ├── CompanionForm.tsx
│   ├── CompanionsList.tsx
│   ├── CTA.tsx
│   ├── LandingPage.tsx
│   ├── marketplaceCard.tsx
│   ├── Navbar.tsx
│   ├── NavItems.tsx
│   ├── SearchInput.tsx
│   ├── SubjectFilter.tsx
│   └── ui/               # Radix UI and Shadcn/ui components
├── components.json       # Shadcn/ui configuration
├── constants/            # Application constants
│   ├── index.ts
│   └── soundwaves.json
├── eslint.config.mjs     # ESLint configuration
├── lib/                  # Utility functions and API clients
│   ├── actions/
│   ├── prompt.ts
│   ├── supabase.ts
│   ├── utils.ts
│   └── vapi.sdk.ts
├── middleware.ts         # Clerk middleware for route protection
├── next-env.d.ts         # Next.js TypeScript definitions
├── next.config.ts        # Next.js configuration
├── package-lock.json     # npm lock file
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── public/               # Static assets
│   └── icons/
├── README.md             # This file
├── tsconfig.json         # TypeScript configuration
└── types/                # TypeScript type definitions
```

---

## ⚙️ Configuration

This project relies on environment variables for configuration. Ensure you have set up the following in your `.env.local` file:

*   **Clerk**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`.
*   **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
*   **Google Generative AI**: `GOOGLE_API_KEY`.

The `middleware.ts` file is configured to protect routes using Clerk. Static files and certain internal Next.js paths are excluded from this protection.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Create a new Pull Request.

Please ensure your code adheres to the existing coding style and includes appropriate tests if applicable.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```