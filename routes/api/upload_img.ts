import { Handlers } from '$fresh/server.ts'
import { BadRequest } from '@/utils/Res.ts'

const API = 'https://api.github.com'
const REPO = Deno.env.get('GH_REPO') || 'omar2205/redesigned-goggles'
const TOKEN = Deno.env.get('GH_TOKEN')
const PREFIX = Deno.env.get('UPLOAD_PREFIX') || ''

type RepoPath = {
  repo: string
  path: string
}

type Commit = {
  message: string
  comitter: {
    name: string
    email: string
  }
}

function get_url(api: string, r: RepoPath) {
  return api + '/repos/' + r.repo + '/contents/' + PREFIX + r.path
}

const uploader: Commit['comitter'] = {
  email: 'omar2205a@gmail.com',
  name: 'FreshUpload',
}

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { img_b64, img_name } = await req.json()
    if (!img_b64 || !img_name) return BadRequest()

    const url = get_url(API, { repo: REPO, path: img_name })
    console.log(url)

    const commit: Commit = {
      message: `Upload: ${img_name}`,
      comitter: uploader,
    }

    const body = JSON.stringify({
      ...commit,
      content: img_b64,
    })

    const results = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body,
    }).then((r) => r.json())

    return Response.json({ msg: 'hello', url, results })
  },
}
