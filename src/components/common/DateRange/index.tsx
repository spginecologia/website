'use client'
import 'dayjs/locale/pt';

import { DatePickerInput, DatesRangeValue } from '@mantine/dates';

import "@mantine/dates/styles.css";
import styles from "./styles.module.css";

export default function DateRange({ value, onChange }: { value: DatesRangeValue | undefined, onChange: (value: DatesRangeValue | undefined) => void }) {

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
            onChange={onChange}
        />
    );
}