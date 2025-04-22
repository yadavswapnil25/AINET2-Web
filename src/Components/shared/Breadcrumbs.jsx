import { Link } from "react-router-dom";

const Breadcrumbs = ({ links = [] }) => {
  return (
    <div className="flex items-center text-[20px] font-medium">
      {links.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.to ? (
            <Link to={item.to} className="text-black hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400">{item.label}</span>
          )}
          {index < links.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
