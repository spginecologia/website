'use client'
import 'dayjs/locale/pt';


import { useState } from 'react';
import { DatePickerInput, DatesRangeValue, WeekdaysRow } from '@mantine/dates';

import "@mantine/dates/styles.css";
import styles from "./styles.module.css";

export default function DateRange() {
    const [value, setValue] = useState<DatesRangeValue | undefined>(undefined);
    return (
        <DatePickerInput
            classNames={{
                input: styles.input,
                wrapper: styles.inputWrapper,
                levelsGroup: styles.levelsGroup,
                calendarHeaderControl: styles.headerControls,
            }}
            locale="pt"
            type="range"
            placeholder="Escolha um intervalo de datas"
            value={value}
            clearable
            onChange={setValue}
        />
    );
}