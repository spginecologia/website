"use client"

import { MultiSelect } from "@mantine/core"
import { useState } from "react"

import styles from './styles.module.css'

export default function CategoriesSelectClient({ categories }: { categories: string[] }) {

    const [value, setValue] = useState<string[]>([])

    const handleChange = (value: string[]) => {
        setValue(value)
    }

    return <MultiSelect
        value={value}
        onChange={handleChange}
        classNames={{
            root: styles.root,
            wrapper: styles.inputWrapper,
            input: styles.input,
            pill: styles.pill,
            dropdown: styles.dropdown,
            option: styles.option,
            options: styles.options
        }}
        searchable
        clearable
        placeholder={value.length ? "" : "Todos os Tópicos"}
        data={categories}
    />
}