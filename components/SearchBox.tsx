import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { KeyboardEvent } from "react";

interface InputProps 
    extends React.InputHTMLAttributes<HTMLInputElement>{}


const SearchBox = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input 
            type={type}
            className={twMerge(`
                    w-full
                    outline-none
                    bg-transparent
                    text-sm
                `, className)}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    )
})

SearchBox.displayName = 'SearchBox';

export default SearchBox