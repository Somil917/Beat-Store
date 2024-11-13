import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>{ }

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input
            type = {type}
            className={twMerge(`
                    flex
                    w-full
                    rounded-md
                    custom-shadow
                    bg-transparent
                    border
                    border-neutral-700/80
                    px-3
                    py-3
                    text-sm
                    transition
                    file:border-0
                    file:bg-transparent
                    file:text-sm
                    file:font-medium
                    placeholder:text-neutral-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    focus:outline-none
                    focus:border-blue-600
                `,
                className
            )}
            disabled={disabled}
            ref = {ref}
            {...props}
        />
    )
})

Input.displayName = 'Input';
 
export default Input;