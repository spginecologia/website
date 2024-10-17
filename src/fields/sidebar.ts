import { Field } from "payload";
import { categoriesField } from "./categories";
import { slugField } from "./slug";
import { featuredImageField } from "./featured-image";

export const sidebarFields: Field[] = [
    slugField(),
    categoriesField,
    featuredImageField,
]