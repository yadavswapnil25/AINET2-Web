import ele2 from "/ele2.png"
import ele1 from "/ele1.jpg"
import BookShelf from './BookShelf';

const books = [
  { src: ele2, alt: "English Language Education: Understanding Change", href: "https://store.pothi.com/book/krishna-dixit-vivek-joshi-milind-mane-english-language-education-understanding-change/" },
  { src: "/publicationconf2.png", alt: "Exploring Learners and Learning English", href: "https://store.pothi.com/book/krishna-dixit-exploring-learners-and-learning-english/" },
  { src: "/publicationsconf1.png", alt: "Teaching English in Multilingual Contexts", href: "https://store.pothi.com/book/krishna-dixit-teaching-english-multilingual-contexts/" },
  { src: ele1, alt: "Changing Learners, Changing Teachers: ELE in a New World", href: "https://store.pothi.com/book/krishna-dixit-changing-learners-changing-teachers-ele-new-world/" },
  { src: "/otherpublicationssouth.png", alt: "English Language Education in the Global South: Innovation, Inclusion, Empowerment", href: "https://store.pothi.com/book/krishna-dixit-english-language-education-global-south-innovation-inclusion-empowerment/" },
];

export default function AinetConferences() {
  return <BookShelf title="AINET Conference Selections" books={books} />;
}
