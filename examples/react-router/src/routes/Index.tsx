import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type LoaderResult = Record<string, string | number>

const fakeData: Record<string, any> = {
  firstName: "Gregory",
  name: "Schmidt"
}

export async function Loader({ params }: LoaderFunctionArgs): Promise<LoaderResult> {
  console.log("Loader Params:", params)

  // This could be any `fetch()` which loads data from a remote
  await sleep(500)
  return fakeData
}

export async function Action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  for (const [name, value] of formData) {
    fakeData[name] = value
  }

  // This could be any `fetch()` which loads data from a remote
  await sleep(1000)
  return null
}

export default function Home() {
  // As of React Router 6.8.0 there is no generic parameter to `useLoaderData`
  // See also: https://github.com/remix-run/react-router/discussions/9854
  const x = useLoaderData() as LoaderResult
  return (
    <>
      <h1>Home Page (with Outlet to render children)</h1>
      <p>Howdy {x.firstName} {x.name}</p>
      <Form method="post" style={{display: "inline-flex", gap:"8px", flexDirection: "column"}}>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" defaultValue={x.firstName}/>
        <label htmlFor="name">Name</label>
        <input name="name" defaultValue={x.name}/>
        <input type="submit" value="Update"/>
      </Form>
      <br/><br/>
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
