# SeeMail

SeeMail is a Next.js application that allows users to access data from their emails using the [ImapFlow](https://imapflow.com/) library. This app uses Vercel's Serverless Framework and Google Cloud Platform to run Chrome in the cloud via Puppeteer to complete various operations. The app is styled using Tailwind CSS.

## Getting Started

To get started with SeeMail, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/seemail.git
```

2. Install the dependencies:

```bash
cd seemail
yarn
```

3. Rename the `.env.example` file to `.env`:

```bash
mv .env.example .env
```

4. Update the values in the `.env` file with the appropriate credentials and API keys.

5. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

The following scripts are available in `package.json`:

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server.
- `yarn lint`: Lints the code using ESLint.
- `yarn clean`: Removes the `.next` folder and `node_modules`, then reinstalls the dependencies.

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [ImapFlow](https://imapflow.com/)
- [Vercel](https://vercel.com/)
- [Google Cloud Platform](https://cloud.google.com/)
- [Puppeteer](https://pptr.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
