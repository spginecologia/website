import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config"
import styles from "./styles.module.css"
import Link from "next/link";
import Button from "@/components/common/Button";
import { FormInput } from "@/components/common/Form";
import LostPassword from "@/components/lost-password";

export default async function Page() {    
    return (
        <LostPassword />
    )
}
