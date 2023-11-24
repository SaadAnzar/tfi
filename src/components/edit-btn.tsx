import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Check, PencilLine, X } from 'lucide-react'

interface EditProps {
  isEdit: boolean
  editMode: boolean
  toggleEditMode: () => void
  handleEdit: () => void
  handleCancel: () => void
  handleSave: () => void
}

export default function Edit({
  isEdit,
  editMode,
  toggleEditMode,
  handleEdit,
  handleCancel,
  handleSave,
}: EditProps) {
  return (
    <div onClick={toggleEditMode}>
      {editMode ? (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-8 p-2 bg-red-500 hover:bg-red-600"
                  disabled={!isEdit}
                  onClick={handleCancel}
                >
                  <X className="h-8 w-4" strokeWidth={3} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-8 p-2 text-3xl font-extrabold bg-green-500 hover:bg-green-600"
                  disabled={!isEdit}
                  onClick={handleSave}
                >
                  <Check className="h-8 w-4" strokeWidth={3} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div className="flex h-full disabled:cursor-not-allowed">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="disabled:cursor-not-allowed">
                <button
                  className="h-8 p-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 !disabled:cursor-not-allowed"
                  disabled={!isEdit}
                  onClick={handleEdit}
                >
                  <PencilLine className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  )
}
