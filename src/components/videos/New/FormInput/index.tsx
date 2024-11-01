import * as React from "react"

import styles from './styles.module.css'
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    label?: string;
    placeholder: string;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, className, leftSection, rightSection, label, placeholder, ...props }, ref) => {

        return (
            <>
                <label className={styles.label}>{label}</label>
                <div className={styles.InputContainer}>
                    <div className={styles.icon}>{leftSection}</div>
                    <input
                        ref={ref}
                        type={type}
                        className={`${styles.Input} ${className}`}
                        placeholder={placeholder}
                        {...props}
                    />
                    <div className={styles.icon}>{rightSection}</div>
                </div>
            </>
        )
    }
)
FormInput.displayName = "FormInput"

export default FormInput