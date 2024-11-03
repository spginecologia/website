'use client'

import { useState } from 'react';
import { Combobox as MantineCombobox, TextInput, useCombobox } from '@mantine/core';

import styles from './styles.module.css'

interface ComboboxProps {
    options: string[]
    placeholder?: string
    label?: string
    onChange?: (value: string) => void
}

export default function Combobox({ options, placeholder, label, onChange }: ComboboxProps) {
    const combobox = useCombobox();
    const [value, setValue] = useState('');
    const shouldFilterOptions = !options.some((item) => item === value);

    const filteredOptions = shouldFilterOptions
        ? options.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
        : options;

    const optionsList = filteredOptions.map((item) => (
        <MantineCombobox.Option value={item} key={item}>
            {item}
        </MantineCombobox.Option>
    ));

    return (
        <MantineCombobox
            onOptionSubmit={(optionValue) => {
                setValue(optionValue);
                combobox.closeDropdown();
                onChange?.(optionValue)
            }}
            store={combobox}
        >
            <MantineCombobox.Target>
                <TextInput
                    label={label}
                    placeholder={placeholder}
                    value={value}
                    classNames={{
                        input: styles.Input
                    }}
                    onChange={(event) => {
                        setValue(event.currentTarget.value);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                />
            </MantineCombobox.Target>

            <MantineCombobox.Dropdown>
                <MantineCombobox.Options>
                    {optionsList.length === 0 ? <MantineCombobox.Empty>Nothing found</MantineCombobox.Empty> : optionsList}
                </MantineCombobox.Options>
            </MantineCombobox.Dropdown>
        </MantineCombobox>
    );
}