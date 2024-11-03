import * as React from "react"

import styles from './styles.module.css'
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, className, leftSection, rightSection, ...props }, ref) => {

        return (
            <div className={styles.InputContainer}>
                <div className={styles.icon}>{leftSection}</div>
                <input
                    ref={ref}
                    type={type}
                    className={`${styles.Input} ${className}`}
                    {...props}
                />
                <div className={styles.icon}>{rightSection}</div>
            </div>
        )
    }
)
Input.displayName = "Input"

export default Input