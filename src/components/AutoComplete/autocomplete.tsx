import { ChangeEvent, FC, useState } from "react";
import Input, { InputProps } from "../Input/input";

export interface AutocompleteProps extends Omit<InputProps, "onSelect"> {
  fatchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

const Autocomplete: FC<AutocompleteProps> = (props) => {
  const { fatchSuggestions, onSelect, ...restProps } = props;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  console.log(suggestions);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const res = fatchSuggestions(value);
      setSuggestions(res);
    } else {
      setSuggestions([]);
    }
  };
  return (
    <div className="auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps}></Input>
    </div>
  );
};

export default Autocomplete;
