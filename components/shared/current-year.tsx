import { cacheLife } from "next/cache"

// Con Cache Components, `new Date()` solo puede leerse dentro de un ámbito cacheado.
export async function CurrentYear() {
  "use cache"
  cacheLife("days")
  return <>{new Date().getFullYear()}</>
}
