import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

async function copyToClipboard(value: string, _meta?: Record<string, unknown>) {
  navigator.clipboard.writeText(value)
}

interface CopyButtonProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
  value: string
  src?: string
}

function CopyButton({ value, src, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <div
      className="relative inline-flex h-7 items-end justify-center font-medium text-slate-900 focus:outline-none"
      onClick={() => {
        copyToClipboard(value, {
          component: src,
        })
        toast.success('Copied to clipboard')
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <svg
                className="rounded-md bg-black p-1.5"
                stroke="2.5"
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                viewBox="0 0 448 512"
              >
                <path
                  fill="white"
                  d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
                />
              </svg>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">Copy Output</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
export default CopyButton
