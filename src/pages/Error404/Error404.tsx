import { Link } from "react-router-dom";
import { Path } from "@/common/Path";

export default function Error404() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to={Path.Main}>Go to Main Page</Link>
    </div>
  );
}
