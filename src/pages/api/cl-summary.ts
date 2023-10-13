// Import Express types or use the appropriate import for your framework
import { OpenAIStream, OpenAIStreamPayload } from '@/utils/OpenAIStream'

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { clsummary } = (await req.json()) as {
    clsummary?: string
  }

  if (!clsummary) {
    return new Response('No prompt in the request ok', { status: 400 })
  }

  // Now you have either ciprompt or aoprompt, not both
  const promptQuestion: any = clsummary

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: promptQuestion },
    ],
    max_tokens: 3000,
    stream: true,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}

export default handler
