/* eslint-disable react/prop-types */
import { useState } from "react";

export default function InputField({ property }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputValue, setInputValue] = useState("");
  return (
    <input
      type="text"
      className="m-1 p-1"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={property}
      name={property}
      id=""
    />
  );
}
