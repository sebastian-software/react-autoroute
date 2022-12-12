import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <>
      <h1>Settings (as root-level file)</h1>
      <Link to="username">Username</Link>
    </>
  )
}
