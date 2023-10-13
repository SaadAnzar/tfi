"use client";

import chroma from "chroma-js";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const formats = [
  { value: "MCQ", label: "MCQ", color: "#000" },
  { value: "Short Answer", label: "Short Answer", color: "#000" },
  { value: "Long Answer", label: "Long Answer", color: "#000" },
  { value: "Statement Based", label: "Statement Based", color: "#000" },
  { value: "Fillups", label: "Fillups", color: "#000" },
  { value: "True/False", label: "True/False", color: "#000" },
];

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.08).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : "black",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.08).css()
          : undefined,
      },
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.08).css(),
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const resources = [
  { value: "Internet", label: "Internet", color: "#000" },
  { value: "Chart Paper", label: "Chart Paper", color: "#000" },
  { value: "Computer", label: "Computer", color: "#000" },
];

interface VerbMultiSelectProps {
  selectedOptions: any;
  setSelectedOptions: (e: any) => void;
}

export function FormatMultiSelect({
  selectedOptions,
  setSelectedOptions,
}: VerbMultiSelectProps) {
  return (
    <Select
      className="remove-input-txt-border mt-3 text-left"
      closeMenuOnSelect={false}
      placeholder="Select a question format"
      components={animatedComponents}
      defaultValue={[]}
      value={selectedOptions}
      isMulti
      options={formats}
      onChange={(e: any) => {
        setSelectedOptions(e);
      }}
      styles={colourStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: "#000",
        },
      })}
    />
  );
}
