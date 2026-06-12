export const metadata = {
  title: 'Meu Blog Tech',
  description: 'Blog criado com Next.js e TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, backgroundColor: '#f9f9f9', color: '#333' }}>
        {children}
      </body>
    </html>
  );
}