import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Copy, CopyCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

async function copyToClipboard(value: string, _meta?: Record<string, unknown>) {
  navigator.clipboard.writeText(value)
}

interface CopyButtonProps {
  value: string
  src?: string
}

function CopyButton({ value, src }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              copyToClipboard(value, {
                component: src,
              })
              toast.success('Copied to clipboard')
              setHasCopied(true)
            }}
            disabled={hasCopied || !value}
            className={cn('h-8 p-2', hasCopied && 'bg-green-800')}
          >
            {hasCopied ? (
              <CopyCheck className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy Output</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default CopyButton
