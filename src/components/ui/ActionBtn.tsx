import React from "react";

interface ActionBtnProps {
  editBtn: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
}
const ActionBtn = ({
  editBtn,
  editMode,
  handleEdit,
  handleCancel,
  handleSave,
}: ActionBtnProps) => {
  return (
    <>
      {" "}
      <div className="rounded-md  px-4  text-lg font-bold text-black">
        {editMode && !editBtn ? (
          <div className="flex gap-5">
            <button
              disabled={editBtn}
              className="rounded-md bg-slate-200 px-4 py-1 text-black hover:bg-slate-300"
              onClick={handleCancel}
            >
              Cancel
            </button>{" "}
            <button
              disabled={editBtn}
              className="rounded-md bg-black px-4 py-1 text-white hover:bg-black/80"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            disabled={editBtn}
            onClick={handleEdit}
            className="rounded-md bg-slate-200 px-6 py-2 hover:bg-slate-300"
          >
            <span>
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default ActionBtn;
