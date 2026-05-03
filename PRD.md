# Nexus Professional — Platform PRD (Module 1: User Integration)

## 1. Project Identity & Vision
**Nexus Professional** is a premium, high-performance freelance ecosystem designed as a university group project (SPM). The platform connects top-tier digital talent (Freelancers) with businesses (Clients) through a trust-centered, verified professional network.

---

## 2. Core Architecture: Multi-Role Experience
The platform is built on a tripartite role system, where the interface and functionality adapt dynamically to the logged-in user's identity.

### A. Freelancer Role (The Talent)
*   **Focus**: Portfolio showcase, professional growth, and earnings.
*   **Dashboard**: Features trust score, platform tier (Elite/Pro/Rising), and a timeline of recent feedback received from clients.
*   **Key Tools**:
    *   **Portfolio Manager**: Multimedia project showcasing with "Featured" project highlights.
    *   **Skill Matrix**: Management of technical skills with verified proficiency levels.
    *   **Work History**: Verifiable professional timeline.
    *   **Certifications**: Upload and verification of external professional credentials.
    *   **Badges**: Display of earned honors (Skill, Community, Social Impact).

### B. Client Role (The Hirer)
*   **Focus**: Talent recruitment, project management, and quality control.
*   **Dashboard**: Features hiring velocity, reviews submitted, and "Top Matching Talent" recommendations based on real database records.
*   **Key Tools**:
    *   **Freelancer Discovery**: A high-performance browsing interface with robust search (by Name, Headline, or Skill).
    *   **Hiring Console**: (Placeholder for Module 2) Tracking active hires and project budgets.
    *   **Feedback System**: Ability to review freelancers, which impacts their trust score and public visibility.

### C. Admin Role (The Orchestrator)
*   **Focus**: Platform integrity, user moderation, and system health.
*   **Dashboard**: Features total user metrics, pending verification counts, and system audit logs.
*   **Key Tools**:
    *   **User Management**: A master console to view, filter, and moderate all platform participants.
    *   **Moderation Queue**: Interface to approve/reject identity and certification requests.

---

## 3. Functional Requirements

### 3.1 Authentication & Security
*   **Multi-Role Registration**: Users choose their primary role during signup (Freelancer/Client).
*   **Secure Auth**: JWT-based authentication with token persistence and auto-logout on expiry.
*   **Profile Recovery**: Email-based OTP or token for password resets (Bcrypt hashing enforced).

### 3.2 Dynamic Navigation System
*   **Role-Aware Sidebar**: 
    *   **Freelancers**: Overview, Portfolio, Skills, Documents, Settings.
    *   **Clients**: Dashboard, Find Freelancers, My Hired Talent, Post a Job, Profile.
    *   **Admins**: User Management, Analytics, Moderation, Settings.
*   **Smart Indicators**: Active states for navigation items and role-specific icons.

### 3.3 Search & Discovery (Client-Centric)
*   **Unified Search**: A single input field that queries the database across `first_name`, `last_name`, `headline`, and `skills`.
*   **Real-Time Results**: Debounced API calls to ensure a smooth, lag-free browsing experience.
*   **Rich Profile Cards**: Displays freelancer average rating, trust score, hourly rate, and verification badges.

### 3.4 Trust & Verification System
*   **Identity Verification**: Multi-step submission of identity documents with Admin review workflow.
*   **Trust Score Algorithm**: A dynamic score (0-100%) calculated based on reviews, verification status, and platform activity.
*   **Verification Badges**: Visual indicators (blue checks) for verified users and certifications.

### 3.5 Review & Feedback (Inter-Role Communication)
*   **Client to Freelancer**: Clients can submit 5-star ratings and detailed comments.
*   **Public Visibility**: Reviews are displayed on public profiles and reflected in freelancer dashboards.
*   **Metric Updates**: Submitting a review triggers a backend recalculation of the freelancer's average rating and total review count.

---

## 4. Technical Stack
*   **Frontend**: React 19, Vite, Tailwind CSS (Custom "Nexus Pro" Design System).
*   **Backend**: Node.js, Express, PostgreSQL.
*   **Database**: Centralized pool using `pg` with complex JOINs for role-based data retrieval.
*   **Styling**: Dual-mode (Light/Dark) using CSS variables and Tailwind's `dark:` utility. Glassmorphism and bento-grid layouts enforced.

---

## 5. API Architecture & Data Flow
*   **Auth API**: `/api/auth/*` (Login, Register, Reset).
*   **User Integration API**: `/api/users/*` (Profile fetching, search, role-specific stats).
*   **Review API**: `/api/reviews/*` (Submitting and retrieving feedback).
*   **Profile API**: `/api/profiles/*` (Avatar/Banner uploads, profile updates).

---

## 6. UI/UX Design Standards (Nexus Pro Protocol)
1.  **Typography**: Manrope for headlines (700-900 weight), Inter for body.
2.  **Color Palette (Dark)**: Deep midnight surface (`#00132e`), teal accents (`#89f5e7`), and translucent containers.
3.  **Aesthetics**: Minimalist but premium. Use of HSL tailored colors and subtle micro-animations (fade-in, scale-hover).
4.  **Consistency**: Role-specific sections must use the same "Nexus Protocol" visual tokens to ensure the platform feels unified.

---

## 7. Current Project State (Module 1 Complete)
*   ✅ Complete Backend API with role-based logic.
*   ✅ Role-specific Frontend dashboards for Freelancers, Clients, and Admins.
*   ✅ Integrated Freelancer Discovery for Clients.
*   ✅ Live Data Binding: Stats and Reviews are pulled from the database, not hardcoded.
*   ✅ Dockerized environment for both Backend and Frontend.
