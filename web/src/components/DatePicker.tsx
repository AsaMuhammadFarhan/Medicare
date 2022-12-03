import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

const DatePicker = ({ ...props }: ReactDatePickerProps) => {
  return (
    <div className={"light-theme-original"}>
      <ReactDatePicker
        className="react-datapicker__input-text" //input is white by default and there is no already defined class for it so I created a new one
        {...props}
      />
    </div>
  );
};

export default DatePicker;