# Flat Mate Finder Application

Flat Mate Finder is a platform designed to simplify the process of finding flatmates and shared accommodations. Whether you're a student looking for a flat near campus or a young professional seeking roommates in a new city, Flat Mate Finder makes it easy to connect with compatible individuals and find the perfect living arrangement.

## Features

- **User Authentication**: Secure user authentication system with login/register functionality.
- **Flat Listings**: Browse through a wide range of flat listings with detailed information about location, price, and amenities.
- **Search and Filter**: Easily search for flats based on location, price range, number of bedrooms, and more.
- **Messaging System**: Communicate with potential flatmates through an integrated messaging system.
- **Profile Management**: Manage your profile information and preferences to find the best match.
- **Admin Dashboard**: Admin dashboard for managing user accounts, flat listings, and reported content.

## Technologies Used

- **Frontend**: React.js, Next.js, Typescript, Material-UI
- **Backend**: Node.js, Express.js, Typescript, PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgrSQL (Supabase)
- **ORM**: Prisma
- **State Management**: Redux, Redux Toolkit
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (Backend), Vercel (Frontend)

## Getting Started

1. Clone the repository:

```
git clone <https://github.com/touhidcodes/Level-2-Assignment-9-Flat-Mate-Finder-App-Client>
```

2. Install dependencies:

```
cd flat-mate-finder
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```
// Example .env file
NEXT_PUBLIC_BACKEND_URL=https://flat-sharing-app.vercel.app/api
NEXT_PUBLIC_LOCAL_URL=http://localhost:5000/api
NEXT_PUBLIC_IMAGEBB_API_KEY= <your imagebb api key>
NEXT_PUBLIC_IMAGEBB_API_URL=https://api.imgbb.com/1/upload
```

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## User Login Credentials

```
# Super Admin Login:
· Username: superadmin
· Email: super@admin.com
· Password: superadmin

# Admin Login:
· Username: admin
· Email: admin@admin.com
· Password: password

# User Login:
· Username: user
· Email: user@user.com
· Password: password

```

## Live URLs

#### Live Project URL: https://flat-mate-finder.vercel.app/

#### Live API URL: https://flat-sharing-app.vercel.app/api

## Project Dependencies

#### Dependencies List

```
 "dependencies": {
    "@emotion/cache": "^11.11.0",
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@hookform/resolvers": "^3.4.2",
    "@mui/icons-material": "^5.15.18",
    "@mui/material": "^5.15.18",
    "@mui/material-nextjs": "^5.15.11",
    "@reduxjs/toolkit": "^2.2.5",
    "axios": "^1.7.2",
    "jwt-decode": "^4.0.0",
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.51.5",
    "react-redux": "^9.1.2",
    "sonner": "^1.4.41",
    "zod": "^3.23.8"
  },
```

#### Dev Dependencies List

```
 "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
```

## Contributing

Contributions are welcome! If you'd like to contribute to Flat Mate Finder, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request

## Contact Information

If you have any questions or feedback regarding Flat Mate Finder, feel free to contact us through the following channels:

- **Email**: [touhidcodes@gmail.com](mailto:touhidcodes@gmail.com)
- **Phone**: +1 (123) 456-7890
- **Social Media**:
  - [Facebook](https://www.facebook.com/mhrinkue)
  - [Linkedin](https://www.linkedin.com/in/touhidur-zaman/)

We look forward to hearing from you!
