import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});
export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note in NoteHub with automatic draft saving so your progress is not lost.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note in NoteHub with automatic draft saving so your progress is not lost.',
    url: "https://notehub.com/",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 683,
      alt: "NoteHub preview image"
    }],
  }
}

export default function RootLayout({
  children,
  modal,
}: {
    children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
