import { Fragment, type ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import classNames from "classnames";

interface BaseItem {
  id: string;
}

interface Props<T> {
  options: T[];
  selected?: T;
  setSelected: (selected: T) => void;
  renderOption: (item: T) => ReactNode;
}

export default function Select<T extends BaseItem>({
  options,
  selected,
  renderOption,
  setSelected,
}: Props<T>) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative h-9 w-full rounded-lg border border-gray-200 p-2 text-sm outline-offset-1 outline-transparent focus:outline-sky-200">
            <span className="block truncate text-left">
              {selected ? renderOption(selected) : "Select ..."}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown
                aria-hidden="true"
                className={classNames("h-5 w-5 text-gray-400", {
                  "rotate-180": open,
                })}
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {renderOption(option)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}