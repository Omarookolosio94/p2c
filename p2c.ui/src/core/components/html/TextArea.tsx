import React, { useState, forwardRef, TextareaHTMLAttributes } from "react";
import { cx } from "../../utilities/helpers";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isRequired?: boolean;
  instruction?: string;
  boxClassName?: string;
  textareaClassName?: string;
  autoResize?: boolean; // For enabling auto-resizing feature
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  {
    label = "",
    isRequired = false,
    instruction = "",
    boxClassName = "",
    textareaClassName = "",
    autoResize = true,
    rows = 1,
    value,
    onChange,
    ...rest
  },
  ref,
) {
  const [currentValue, setCurrentValue] = useState(value || "");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(event.target.value);
    if (onChange) onChange(event);
  };

  // Dynamically adjust the height of the textarea when autoResize is enabled
  const handleResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize && event.target) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  return (
    <fieldset className={cx("mb-3", boxClassName)}>
      {label && (
        <label htmlFor={rest.id} className="mb-1 text-xs font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={ref}
          value={currentValue}
          rows={rows}
          onChange={(e) => {
            handleChange(e);
            handleResize(e);
          }}
          {...rest}
          className={cx("textarea", textareaClassName)}
        />
      </div>

      {instruction && (
        <p className="mb-1 text-[12px] leading-none text-gray-500">
          {instruction}
        </p>
      )}
      
    </fieldset>
  );
});

export default TextArea;
