import { Outlet } from "react-router-dom"

export default function PostsLayout() {
  return (
    <div
      style={{ background: "#f2f2f2", padding: "20px", borderRadius: "8px" }}
    >
      <Outlet />
    </div>
  )
}
