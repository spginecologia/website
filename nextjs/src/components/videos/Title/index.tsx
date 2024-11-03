import { Title } from "@mantine/core";
import styles from "./styles.module.css"

type Props = {
    children: React.ReactNode
}

export function VideoTitle({ children } : Props) {
    return (
        <>
            <Title className={styles.title}>{children}</Title>
            <div className={styles.separator} />
        </>
    )
}
