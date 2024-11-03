'use client'

import React, { FormHTMLAttributes, useState } from 'react'
import styles from './styles.module.css'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import RichTextEditor from '../RichTextEditor'
import Select from '../Select'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  error?: string
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  placeholder: string
}

interface RichTextEditorProps {
  label: string
  placeholder: string
  onChange: (value: any) => void
}

interface SelectProps {
  label: string
  placeholder: string
  data: { value: string; label: string }[]
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
}

interface CheckboxProps {
  text: React.ReactNode
}

interface MultipleCheckboxProps {
  options: {
    value: string
    label: React.ReactNode
  }[]
  label: string
}


/* Title */

const FormTitle = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className={styles.title}>
        {children}
      </div>
    )
  },
)

FormTitle.displayName = 'FormTitle'

/* Subtitle */

const FormSubtitle = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className={styles.subtitle}>
        {children}
      </div>
    )
  },
)

FormSubtitle.displayName = 'FormSubtitle'

/* Section */

const FormSection = React.forwardRef<HTMLDivElement, { title: string; description?: string }>(
  ({ title, description }, ref) => {
    return (
      <div ref={ref} className={styles.section}>
        <div className={styles.sectionTitle}>{title}</div>
        {description && <div className={styles.sectionDescription}>{description}</div>}
      </div>
    )
  },
)

FormSection.displayName = 'FormSection'

/* Input */

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type, className, leftSection, rightSection, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <>
        <label className={styles.label}>{label}</label>
        <div className={styles.InputContainer}>
          <div className={styles.icon}>{leftSection}</div>
          <input
            ref={ref}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className={`${styles.Input} ${className}`}
            placeholder={placeholder}
            {...props}
          />
          <div className={styles.icon}>
            {type === 'password' ? (
              showPassword ? (
                <EyeIcon onClick={() => setShowPassword(false)} />
              ) : (
                <EyeOffIcon onClick={() => setShowPassword(true)} />
              )
            ) : (
              rightSection
            )}
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </>
    )
  },
)
FormInput.displayName = 'FormInput'

/* TextArea */

const FormTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, ...props }, ref) => {
    return (
      <>
        <label className={styles.label}>{label}</label>
        <div className={styles.InputContainer}>
          <textarea ref={ref} className={styles.Input} placeholder={placeholder} {...props} />
        </div>
      </>
    )
  },
)
FormTextArea.displayName = 'FormTextArea'

/* RichTextEditor */

const FormRichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ label, onChange }, ref) => {
    return (
      <>
        <label className={styles.label}>{label}</label>
        <RichTextEditor onChange={onChange} placeholder={''} />
      </>
    )
  },
)
FormRichTextEditor.displayName = 'FormRichTextEditor'

/* Select */

const FormSelect = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ label, placeholder, data, onChange, onBlur, name, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState('')

    return (
      <>
        <label className={styles.label}>{label}</label>
        <Select
          placeholder={placeholder}
          data={data}
          value={selectedValue}
          onChange={(value: string | null) => {
            setSelectedValue(value ?? '')
            onChange?.(value ?? '')
          }}
        />
      </>
    )
  },
)
FormSelect.displayName = 'FormSelect'

/* Checkbox */

const FormCheckbox = React.forwardRef<HTMLDivElement, CheckboxProps>(({ text, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.checkboxWrapper}>
      <input type="checkbox" {...props} />
      <div className={styles.checkboxText}>{text}</div>
    </div>
  )
})
FormCheckbox.displayName = 'FormCheckbox'

/* MultipleCheckbox */

const MultipleCheckbox = React.forwardRef<HTMLDivElement, MultipleCheckboxProps>(({ options, label, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.multipleCheckboxWrapper}>
      <label className={styles.label}>{label}</label>
      {options.map((item, index) => 
        <div key={options[index].value} className={styles.multipleCheckbox}>
          <input type="checkbox" {...props} />
          <div className={styles.multipleCheckboxText}>{item.label}</div>
        </div>
      )}
    </div>
  )
})
MultipleCheckbox.displayName = 'MultipleCheckbox'

/* Form */

const Form = React.forwardRef<
  HTMLFormElement,
  { children: React.ReactNode; className?: string; action?: (data: any) => void }
>(({ children, className, action, ...props }, ref) => {
  return (
    <form ref={ref} className={`${styles.form} ${className}`} {...props} action={action}>
      {children}
    </form>
  )
})
Form.displayName = 'Form'

/* FormDateTimePicker */

const FormDateTimePicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type, className, leftSection, rightSection, error, ...props }, ref) => {
    return (
      <>
        <label className={styles.label}>{label}</label>
        <div className={styles.InputContainer}>
          <input
            ref={ref}
            type='date'
            className={`${styles.Input} ${className}`}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </>
    )
  },
)
FormDateTimePicker.displayName = 'FormDateTimePicker'

export {
  Form,
  FormTitle,
  FormSubtitle,
  FormSection,
  FormInput,
  FormTextArea,
  FormRichTextEditor,
  FormSelect,
  FormCheckbox,
  FormDateTimePicker,
  MultipleCheckbox,
}
