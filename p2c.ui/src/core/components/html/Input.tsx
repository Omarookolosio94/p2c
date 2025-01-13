import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { cx, numbersOnly } from "../../utilities/helpers";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  boxClassName?: string;
  isRequired?: boolean;
  instruction?: string;
  error?: string;
  type?: string;
  dataList?: DataListItem[];
  label?: string;
  isNumberOnly?: boolean;
  showError?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    type = "text",
    boxClassName = "",
    label = "",
    instruction = "",
    isRequired = false,
    dataList = [],
    error = "",
    isNumberOnly = false,
    showError = true,
    children = <></>,
    ...rest
  },
  ref,
) {
  const [inputType] = useState(type);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumberOnly) {
      numbersOnly(event);
    }
  };

  return (
    <fieldset className={cx("mb-3", boxClassName)}>
      {label && label?.length > 0 && (
        <label htmlFor={rest?.id} className="mb-1 text-[12px] font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          autoComplete="on"
          aria-autocomplete="none"
          onKeyDown={handleKeyDown}
          {...rest}
          className={cx("input", rest.className!)}
        />
      </div>

      {dataList?.length > 0 && (
        <datalist id={rest?.list}>
          {dataList.map((data) => (
            <option key={data?.value} value={data?.value}>
              {data?.name}
            </option>
          ))}
        </datalist>
      )}

      {children}

      {instruction && (
        <>
          <span className="mb-1 text-[12px] leading-none text-gray-500">
            {instruction}
          </span>{" "}
          <br />
        </>
      )}

      {showError && (
        <div className="mt-1 flex h-3 items-center">
          {error && (
            <>
              <span className="text-xs leading-none text-red-500">{error}</span>
            </>
          )}
        </div>
      )}
    </fieldset>
  );
});

export default Input;
