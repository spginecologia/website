"use client"

import { MultiSelect } from "@mantine/core"

import styles from './styles.module.css'
import { useQueryState, parseAsString, parseAsArrayOf } from "nuqs"
import { Category } from "@/payload-types"

export default function CategoriesSelectClient({ categories }: { categories: Category[] }) {

    const [value, setValue] = useQueryState<string[]>("category", parseAsArrayOf(parseAsString, ';'))
    return <MultiSelect
        value={value ?? undefined}
        onChange={(value) => setValue(value ?? [])}
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
        placeholder={value?.length ? "" : "Todos os Tópicos"}
        data={categories.map((category) => ({
            label: category.name,
            value: category.slug
        }))}
    />
}