import { Status, STATUS_TEXT } from 'http'

export function BadRequest() {
  return Response.json(
    {
      error: ['bad-request'],
    },
    {
      status: Status.BadRequest,
      statusText: STATUS_TEXT[Status.BadRequest],
    },
  )
}
