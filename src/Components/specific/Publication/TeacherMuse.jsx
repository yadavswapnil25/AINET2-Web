import muse1 from "/muse1.png"
import muse2 from "/muse2.jpg"
import muse3 from "/muse3.jpg"
import BookShelf from './BookShelf';

const books = [
  { src: muse1, alt: "Teachers' Muse", href: "https://store.pothi.com/book/amol-padwad-prithvirajsingh-thakur-teachers-muse/" },
  { src: muse2, alt: "Teachers' Muse, Volume 2", href: "https://store.pothi.com/book/amol-padwad-prithvirajsingh-thakur-teachers-muse-volume-2/" },
  { src: muse3, alt: "Teachers' Muse, Vol. 3", href: "https://store.pothi.com/book/amol-padwad-teachers-muse-vol-3/" },
];

export default function TeacherMuse() {
  return <BookShelf title="Teacher Muse" viewAllTo="/publications/occasional-papers" books={books} />;
}
