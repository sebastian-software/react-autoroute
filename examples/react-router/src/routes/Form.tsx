import {
  ActionFunctionArgs,
  Form as RouterForm,
  LoaderFunctionArgs,
  useLoaderData,
  useRouteError
} from "react-router-dom"

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type LoaderResult = Record<string, string | number>

const fakeData: Record<string, any> = {
  firstName: "Gregory",
  name: "Schmidt"
}

export async function loader({
  params
}: LoaderFunctionArgs): Promise<LoaderResult> {
  console.log("Loader: Router Params:", params)

  // This could be any `fetch()` which loads data from a remote
  await sleep(500)
  return fakeData
}

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("Action: Router Params:", params)

  const formData = await request.formData()
  for (const [name, value] of formData) {
    if (value === "") {
      throw new Error(`Missing value for: ${name}!`)
    }

    fakeData[name] = value
  }

  // This could be any `fetch()` which loads data from a remote
  await sleep(1000)
  return null
}

export function RouteError() {
  const error = useRouteError() as Error
  return <h1>Route Error: {error.message}</h1>
}

export default function Form() {
  // As of React Router 6.8.0 there is no generic parameter to `useLoaderData`
  // See also: https://github.com/remix-run/react-router/discussions/9854
  const x = useLoaderData() as LoaderResult
  return (
    <>
      <p>
        Howdy {x.firstName} {x.name}
      </p>
      <RouterForm
        method="post"
        style={{ display: "inline-flex", gap: "8px", flexDirection: "column" }}
      >
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" defaultValue={x.firstName} />
        <label htmlFor="name">Name</label>
        <input name="name" defaultValue={x.name} />
        <input type="submit" value="Update" />
      </RouterForm>
    </>
  )
}
