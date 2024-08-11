# Tennis Court Reservation System

A web-based application for reserving tennis courts at a club, built using Next.js, TypeScript, and Tailwind CSS. The system supports multi-language localization and includes features such as court reservations, user authentication, and a responsive design optimized for mobile devices.

## Features

- **User Authentication**: Secure login for users with session management using `localStorage`.
- **Court Reservation**: Users can view available courts, select a date and time, and reserve a court.
- **Admin Dashboard**: Admins can view all reservations and manage courts.
- **Responsive Design**: Fully responsive UI designed with Tailwind CSS, optimized for mobile devices.
- **Multi-language Support**: Localization using `next-i18next` with support for Spanish and English.

## Technologies Used

- **Next.js**: Framework for building React applications with server-side rendering.
- **TypeScript**: Superset of JavaScript providing type safety.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **react-i18next**: Localization library for React applications.
- **axios**: HTTP client for making API requests.
- **react-toastify**: Library for providing notifications to the user.
- **react-calendar**: Calendar component for selecting reservation dates.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jaimeirazabal1/Tennis-Court-Reservation-System.git
cd Tennis-Court-Reservation-System
```

### 2. Install Dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_API_URL=your_api_url_here
```

Replace `your_api_url_here` with the actual URL of your backend API.

### 4. Running the Development Server

To start the development server, run:

```bash
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

### 5. Building for Production

To create a production build, run:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

## Project Structure

- **`/src`**: Contains all the source code.
  - **`/app`**: Contains the main application files.
    - **`/components`**: Reusable components like `NavBar`.
    - **`/pages`**: Contains individual pages like `Home`, `Reserve`, `Admin`.
    - **`/styles`**: Contains global styles, including Tailwind CSS.
  - **`/public`**: Static assets like images and icons.
  - **`/locales`**: Contains translation files for multi-language support.

## Common Commands

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Starts the production server.
- **`npm run lint`**: Runs the linter for code quality checks.

## Troubleshooting

### React Hydration Error

If you encounter a React Hydration Error, ensure that the translations are fully loaded before rendering components by using `useEffect` to check if `i18next` is initialized.

### Tailwind CSS Not Applying Styles

Make sure that `globals.css` is correctly imported in your `layout.tsx` and that the paths in `tailwind.config.js` include all relevant directories.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
