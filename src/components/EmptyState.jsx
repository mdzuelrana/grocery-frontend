import { Link } from "react-router-dom";

export default function EmptyState({ title, message, link, linkText }) {
  return (
    <div className="text-center py-20">

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-500 mb-6">
        {message}
      </p>

      {link && (
        <Link to={link} className="btn btn-primary">
          {linkText}
        </Link>
      )}

    </div>
  );
}