// Import Express types or use the appropriate import for your framework
import { OpenAIStream, OpenAIStreamPayload } from '@/utils/OpenAIStream'

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { aoquestion } = (await req.json()) as {
    aoquestion?: string
  }

  if (!aoquestion) {
    return new Response('No prompt in the request ok', { status: 400 })
  }

  // Now you have either ciprompt or aoprompt, not both
  const promptQuestion: any = aoquestion

  const payload: OpenAIStreamPayload = {
    model: 'gpt-4',
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
