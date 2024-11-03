'use client'

import { Select as MantineSelect, SelectProps } from '@mantine/core'
import { useState } from 'react'

import styles from './styles.module.css'

export default function Select({ data, ...props }: SelectProps) {
  return (
    <MantineSelect
      classNames={{
        root: styles.root,
        wrapper: styles.inputWrapper,
        input: styles.input,
        dropdown: styles.dropdown,
        option: styles.option,
        options: styles.options,
      }}
      clearable
      data={data}
      {...props}
    />
  )
}
