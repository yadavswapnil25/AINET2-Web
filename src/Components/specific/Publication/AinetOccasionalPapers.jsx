import BookShelf from './BookShelf';

const books = [
  { src: "/ainetPaper.png", alt: "AINET Occasional Paper" },
  { src: "/ainetPaper.png", alt: "AINET Occasional Paper" },
];

export default function AinetOccasionalPapers() {
  return <BookShelf title="AINET Occasional Papers" viewAllTo="/publications/occasional-papers" books={books} />;
}
