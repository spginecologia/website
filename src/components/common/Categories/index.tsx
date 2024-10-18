import { Category } from "@/payload-types";
import Link from "next/link";

import styles from './styles.module.css';

export default function Component({ categories }: { categories: Category[] }) {
    return (
        <div className={styles.categories}>
            {categories?.map((category, index) => (
                <Link href={`/categorias/${(category as Category).slug}`} key={index}>
                    {(category as Category).name}
                </Link>
            ))}
        </div>
    );
}
