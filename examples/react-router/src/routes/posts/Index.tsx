import { Link, Outlet } from "react-router-dom"

export default function PostsIndex() {
  return (
    <>
      <h1>Posts Index (No Outlet)</h1>
      <ul>
        <li>
          <Link to="first">First</Link>
        </li>
        <li>
          <Link to="second">Second</Link>
        </li>
        <li>
          <Link to="third">Third</Link>
        </li>
      </ul>
    </>
  )
}
