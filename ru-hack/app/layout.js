export const metadata = {
  title: 'Physical Therapy - Next.js',
  description: 'Helping alleviate body pain with professional guidance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
