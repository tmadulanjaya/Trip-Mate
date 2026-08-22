import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-emoji">🗺️</span>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-sub">Looks like this destination doesn't exist on our map.</p>
        <Link to="/" className="btn btn-primary btn-lg">Go home</Link>
      </div>
    </div>
  );
}
