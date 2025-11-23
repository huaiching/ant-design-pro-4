import {request} from '@mli-csmo/base'

export async function createAgent(body: any, options?: { [key: string]: any }) {
  return request<any>('/hrm/data/Agent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}