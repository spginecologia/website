import TextInput from "@/components/common/TextInput"
import CategoriesSelect from "@/components/common/CategoriesSelect"
import { SearchIcon } from "lucide-react"
import { Grid } from "@/components/layout/Grid"
import Select from "@/components/common/Select"
import DateRange from "@/components/common/DateRange"


export default function EventFilters() {
    const eventTypes = [
        {
            label: "Eventos SPG",
            value: "spg",
        }, {
            label: "Eventos Patrocinados",
            value: "patrocinado",
        }, {
            label: "Outros",
            value: "outros",
        }
    ]

    return <Grid columns="ab" gap="sm">
        <TextInput placeholder={"Procurar..."} leftSection={<SearchIcon />} />
        <DateRange />
        <CategoriesSelect />
        <Select data={eventTypes} placeholder="Todos tipos de Evento" />
    </Grid>
}