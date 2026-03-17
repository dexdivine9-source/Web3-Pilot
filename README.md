# 🚀 Web3-Pilot

**Web3-Pilot** is an AI-powered growth and security suite designed for the next generation of Web3 creators and developers. Leverging the power of **Gemini 1.5 Flash**, it provides high-performance audits, social media automation, and grounded project intelligence.

---

## ✨ Key Features

### 🛡️ Tokenomics Risk Auditor
*   Analyze vesting schedules, supply dynamics, and token utility.
*   Detects 5 critical red flags: Concentration, Vesting, Utility, Compliance, and Liquidity.
*   Get instant technical risk scores (1-10) and executive summaries.

### 💬 Project-Grounded Chat
*   A technical support bot that stays strictly within your project's documentation.
*   Prevents hallucinations of generic crypto information.
*   Instant answers to complex technical queries based on your context.

### 🐦 Social Engine
*   Convert technical milestones (Mainnet launch, partnerships, etc.) into viral X (Twitter) threads.
*   Generates formatted Discord announcements for community engagement.
*   Maintains a high-energy, "Web3 native" tone.

### 📄 Value-Prop Summarizer
*   Condenses dense whitepapers and technical docs into 3 high-impact selling points.
*   Optimized for mobile reading and quick executive decision-making.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
*   **AI Engine:** [Google Gemini 1.5 Flash](https://aistudio.google.com/)
*   **Styling:** Tailwind CSS 4.0
*   **Animations:** Motion (Framer Motion)
*   **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites

*   [Node.js 18+](https://nodejs.org/)
*   A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1.  **Clone and Install:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your keys:
    ```env
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    APP_URL="http://localhost:3000"
    ```

3.  **Run Locally:**
    ```bash
    npm run dev
    ```

---

## 🔒 Security Note
This tool uses Server Actions to keep your **GEMINI_API_KEY** secure on the server. Never expose your API key in client-side code (prefixed with `NEXT_PUBLIC_`).

---

## ⚖️ Disclaimer
*Web3-Pilot provides technical audits and content generation. It does not provide financial advice. Always perform your own due diligence.*
