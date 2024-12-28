# MysteryMessage

MysteryMessage is an anonymous messaging platform built with Next.js, TypeScript, and Tailwind CSS. It allows users to send anonymous messages securely and seamlessly. The application is enhanced with modern features, including AI-powered suggestions and email verification for a better user experience.

## Features

- **Anonymous Messaging**: Send messages without revealing your identity.
- **Secure Authentication**: User authentication powered by NextAuth.
- **Schema Validation**: Robust validation with Zod to ensure data integrity.
- **Email Verification**: Secure account verification using Resend.
- **AI Suggestions**: Generate message suggestions with Gemini API.
- **Modern UI**: Sleek and responsive design with ShadCN UI.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Authentication**: NextAuth
- **Validation**: Zod
- **Email Service**: Resend
- **AI Integration**: Gemini API
- **UI Components**: ShadCN

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (>= 16.x)
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)
- Resend API key
- Gemini API key
- NextAuth configuration

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JeetDas5/mysterymessage.git
   cd mysterymessage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   RESEND_API_KEY=your-resend-api-key
   GEMINI_API_KEY=your-gemini-api-key
   MONGODB_URI=your-mongodb-connection-string
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Project Structure

```
/mysterymessage
├── /components       # Reusable UI components
├── /hooks            # Hooks
├── /lib              # Resend and Database utilities
├── /helpers          # helper files
├── /models           # User models
├── /schemas          # Zod validation schemas
├── /types            # Types for typescript
├── /api              # API routes for backend logic
├── /context          # Authprovider
├── /api              # API routes for backend logic
├── /middleware.js    # Handling Middleware
└── /public           # Static assets
```

---

## Usage

1. **Sign Up**: Create an account with your email and verify it through the email sent.
2. **Send a Message**: Visit the recipient's page and send an anonymous message.
3. **Receive Messages**: Check your inbox for messages from other users.
4. **AI Suggestions**: Use the AI-powered suggestions to craft engaging messages.
---

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth](https://next-auth.js.org/)
- [Zod](https://zod.dev/)
- [Resend](https://resend.com/)
- [Gemini API](https://gemini.com/)
- [ShadCN](https://shadcn.dev/)

---

## Contact

For any queries or feedback, feel free to reach out:
- Email: jeet15083011@gmail.com
- GitHub: [JeetDas5](https://github.com/JeetDas5)

