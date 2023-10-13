import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Mix";
interface DifficultyLevelProps {
  difficultyLevel: DifficultyLevel;
  setDifficultyLevel: (difficultyLevel: DifficultyLevel) => void;
}

let difficultyLevels: DifficultyLevel[] = ["Easy", "Medium", "Hard", "Mix"];

export function DropDownDifficultyLevel({
  difficultyLevel,
  setDifficultyLevel,
}: DifficultyLevelProps) {
  return (
    <Menu as="div" className="relative block w-full text-left">
      <div className="">
        <Menu.Button className="flex w-full  items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {difficultyLevel}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 hidden h-5 w-5 ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={difficultyLevel}
        >
          <div className="">
            {difficultyLevels.map((levelItem) => (
              <Menu.Item key={levelItem}>
                {({ active }) => (
                  <button
                    onClick={() => setDifficultyLevel(levelItem)}
                    className={` ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }
                      ${difficultyLevel === levelItem ? "bg-gray-200" : ""}
                      "flex w-full items-center justify-between space-x-2 px-4 py-2 text-left text-sm"
                    `}
                  >
                    <p className="flex justify-between">
                      {" "}
                      <span> {levelItem}</span>{" "}
                      {difficultyLevel === levelItem ? (
                        <CheckIcon className="text-bold h-4 w-4 text-right " />
                      ) : null}
                    </p>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
