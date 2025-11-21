# Meeting Companion – Frontend  
*(Deployed on Vercel)*

<img width="1350" height="767" alt="Screenshot 2025-11-21 013430" src="https://github.com/user-attachments/assets/f443bacb-546b-43ee-b2bc-e38b774b9458" />


## 📝 Description  
Meeting Companion Frontend is a modern React + Vite application that allows users to upload meeting recordings, convert them into transcripts, generate MOM (Minutes of Meeting), and extract meeting summaries with a smooth step-by-step workflow.

---

## ⭐ Features  
- User authentication (Signup, OTP verification, Login)  
- Upload meeting audio/video  
- Generate transcript  
- Convert transcript into MOM  
- Generate meeting summary  
- Protected routes using JWT  
- Smooth drag-scroll stepper UI  
- Loader + button disabling for better UX  
- Real-time API status handling  
- React state management through custom Zustand stores  

---

## 🧪 Technologies Used  
- **React 19**  
- **Vite**  
- **TypeScript**  
- **TailwindCSS**  
- **React Router DOM**  
- **React Hook Form + Zod validation**  
- **Axios**  
- **Zustand (custom stores: Auth, Signup, UploadedMeeting)**  
- **React Indiana Drag Scroll**  
- **ReactFlow (flow UI)**  

---

## 🌐 API Fetching  
API requests are handled using a configured Axios instance:

- `sendSignupOtp()` → `/api/auth/signup-otp/`  
- `signupUser()` → `/api/auth/signup/`  
- `signinUser()` → `/api/auth/signin/`  
- `uploadMeeting()` → `/api/meeting/upload/` *(multipart form-data)*  
- `createTranscript()` → `/api/transcript/create/`  
- `editTranscript()` → `/api/transcript/edit/`  
- `generateMon()` → `/api/mom/generate/`

The Axios instance automatically attaches JWT tokens from `localStorage`.

---

## 🔧 .env Configuration  
- **Create a `.env` file in the project root:**
- **VITE_API_URL=https://your-backend-url.com**

---

## 📦 Clone & Installation Guide  
```bash
# Clone the repository
git clone https://github.com/MuhammadFareed2/Meeting-Companion-Frontend

# Enter project folder
cd mc

# Install dependencies
npm install

# Start development server
npm run dev
```
---

## 🔄 App Flow

- **User Authentication**
- **Upload Meeting**
- **Generate Transcript**
- **Generate MOM**
- **Generate Summary**
- **Stepper unlocks stage-by-stage**
- **Loader shows during API calls and buttons disable automatically**



