import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditProps {
  isEdit: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
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
    <div
      className="flex self-center rounded-md text-lg font-bold text-black"
      onClick={toggleEditMode}
    >
      {editMode ? (
        <div className="flex gap-2">
          <button disabled={!isEdit} onClick={handleCancel}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ef4444"
                    height="1.7em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">Cancel changes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
          <button disabled={!isEdit} onClick={handleSave}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#22c55e"
                    height="1.7em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">Save changes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
        </div>
      ) : (
        <div className="flex h-full disabled:cursor-not-allowed">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="flex h-full disabled:cursor-not-allowed"
                disabled={!isEdit}
                onClick={handleEdit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.7em"
                  viewBox="0 0 448 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}