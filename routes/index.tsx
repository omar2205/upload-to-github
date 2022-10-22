import { Head } from '$fresh/runtime.ts'
import UploadImg from "@/islands/UploadImg.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6 text-center">
          Upload images to GitHub. Just paste an image below.
        </p>

        <UploadImg />
      </div>
    </>
  )
}