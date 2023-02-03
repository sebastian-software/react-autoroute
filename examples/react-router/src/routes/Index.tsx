import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home Page (with Outlet to render children)</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="form">Form</Link></li>
        <li><Link to="imprint">Imprint</Link></li>
        <li><Link to="posts">Posts</Link></li>
        <li><Link to="settings">Settings</Link></li>
      </ul>
      <Outlet/>
    </>
  )
}
