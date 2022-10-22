import { JSX } from 'preact'
import { useRef, useState } from 'preact/hooks'

export default function UploadImg() {
  const img_input = useRef<HTMLInputElement>(null)
  const img_preview = useRef<HTMLImageElement>(null)
  const [response, setResponse] = useState({})

  const handle_img_paste = (
    e: JSX.TargetedClipboardEvent<HTMLFormElement>,
  ) => {
    // if we have a file, and that file is an image
    // and the image ref mounted
    if (
      e.clipboardData?.files[0] &&
      e.clipboardData?.files[0].type.startsWith('image') &&
      img_input.current
    ) {
      img_input.current.files = e.clipboardData.files

      // reader - to render the pasted image to
      // the preview
      const reader = new FileReader()
      reader.onload = (e) => {
        img_preview.current!.src = e.target?.result as string
      }

      reader.readAsDataURL(img_input.current.files[0])
    }
  }

  type FormSubmitEvent = JSX.TargetedEvent<HTMLFormElement, Event>
  const handle_form_submit = async (e: FormSubmitEvent) => {
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)

    const img_name = (fd.get('img_name') as string) || new Date().toJSON()

    const body = JSON.stringify({
      img_b64: img_preview.current?.src.split('base64,')[1],
      img_name: img_name.endsWith('.png') ? img_name : img_name + '.png',
    })

    const res = await fetch('/api/upload_img', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }).then((r) => r.json())

    setResponse(res)
  }

  return (
    <>
      <form
        onPaste={handle_img_paste}
        onSubmit={handle_form_submit}
        style={{
          outline: '1px dashed lightblue',
        }}
        class="p-12 mt-4 rounded-xl hover:shadow
          bg-gray-50 flex flex-col justify-center items-center"
      >
        <img
          src="/image.svg"
          class="w-xs h-xs block mx-auto mb-6 opacity-90
            border-indigo-500 dark:border-sky-500 border-2 border-dashed"
          ref={img_preview}
          alt="Image upload preview"
        />
        <input
          class="sr-only"
          type="file"
          id="img-upload"
          ref={img_input}
        />

        <div class="mb-2">
          <div>
            <label class="sr-only" for="name">
              Image Name
            </label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Image name"
              type="text"
              name="img_name"
            />
          </div>
        </div>

        <button
          class="text-white bg-blue-700 hover:bg-blue-800
          focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium rounded-lg text-sm px-5 py-2.5 text-center
          inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700
          dark:focus:ring-blue-80
        "
        >
          Upload
          <img
            src="/upload.png"
            alt="upload-icon"
            class="ml-2 -mr-1 w-5 h-5"
          />
        </button>
      </form>

      <pre class="absolute top-0 left-0 z-[-1]">
        {JSON.stringify(response, null, 2)}
      </pre>
    </>
  )
}
