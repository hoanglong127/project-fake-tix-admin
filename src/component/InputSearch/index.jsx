import React, { useRef } from "react";
import { Input } from "antd";

const { Search } = Input;

const InputSearch = ({ onSearch }) => {
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    const { value } = e.target;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <Search
      placeholder="Tìm kiếm"
      onChange={handleChange}
      size="middle"
      style={{ maxWidth: 500 }}
      enterButton
    />
  );
};

export default InputSearch;
