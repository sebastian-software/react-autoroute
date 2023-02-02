import { Link, Outlet, useLoaderData } from "react-router-dom";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface LoaderResult {
  firstName: string
  name: string
}

export async function Loader(): Promise<LoaderResult> {
  // This could be any `fetch()` which loads data from a remote
  await sleep(500)

  return {
    firstName: "Gregory",
    name: "Schmidt"
  }
}

export default function Home() {
  // As of React Router 6.8.0 there is no generic parameter to `useLoaderData`
  // See also: https://github.com/remix-run/react-router/discussions/9854
  const x = useLoaderData() as LoaderResult
  return (
    <>
      <h1>Home Page (with Outlet to render children)</h1>
      <p>Howdy {x.firstName} {x.name}</p>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="imprint">Imprint</Link></li>
        <li><Link to="posts">Posts</Link></li>
        <li><Link to="settings">Settings</Link></li>
      </ul>
      <Outlet/>
    </>
  )
}
