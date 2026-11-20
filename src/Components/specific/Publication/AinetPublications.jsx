import ele1 from "/ele1.jpg"
import ele2 from "/ele2.png"
import BookShelf from './BookShelf';

const books = [
  { src: "/publicationAinet.png", alt: "Connecting Eight Effective ELT Classrooms", href: "https://store.pothi.com/book/dipika-gode-connecting-eight-effective-elt-classrooms-contexts-challenges-and-solutions/" },
  { src: ele1, alt: "Changing Learners, Changing Teachers: ELE in a New World", href: "https://store.pothi.com/book/krishna-dixit-changing-learners-changing-teachers-ele-new-world/" },
  { src: ele2, alt: "English Language Education: Understanding Change", href: "https://store.pothi.com/book/krishna-dixit-vivek-joshi-milind-mane-english-language-education-understanding-change/" },
  { src: "/otherpublicationssouth.png", alt: "English Language Education in the Global South: Innovation, Inclusion, Empowerment", href: "https://store.pothi.com/book/krishna-dixit-english-language-education-global-south-innovation-inclusion-empowerment/" },
  { src: "/otherpublicationsResearch.jpg", alt: "Research in English Language Education in Indian Universities: A Directory", href: "https://store.pothi.com/book/amol-padwad-research-english-language-education-indian-universities-directory/" },
];

export default function AinetPublications() {
  return <BookShelf title="Other Publications" books={books} />;
}
