import { sidebarFields } from "@/fields/sidebar"
import { CollectionConfig } from "payload"


const Events: CollectionConfig = {
	labels: {
		singular: "Evento",
		plural: "Eventos",
	},
	slug: "events",
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Titulo",
			type: "text",
			required: true,
		},
		{
			name: "is_featured",
			label: "Evento em destaque",
			type: "checkbox",
			required: false,
		},
		{
			name: "event_type",
			label: "Tipo de Evento",
			type: "select",
			options: [{
				label: "Eventos SPG",
				value: "spg",
			}, {
				label: "Eventos Patrocinados",
				value: "patrocinado",
			}, {
				label: "Outros",
				value: "outros",
			}],
			required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "start_date",
					label: "Data de início",
					type: "date",
					required: true,
				},
				{
					name: "end_date",
					label: "Data de fim",
					type: "date",
					required: true,
				},
			]
		},
		{
			name: "links_group",
			label: "Links do Evento",
			type: "group",
			fields: [
				{
					name: "link_to_official_page",
					label: "Link da página Oficial",
					type: "text",
					required: false,
				},

				{
					name: "link_to_facebook",
					label: "Link do Evento no Facebook",
					type: "text",
					required: false,
				},
				{
					name: "link_to_register",
					label: "Link para inscrição",
					type: "text",
					required: false,
				},
				{
					name: "link_to_program",
					label: "Link para Programa",
					type: "text",
					required: false,
				}
			]
		},
		{
			name: "sections",
			label: "Secções",
			type: "array",
			required: false,
			fields: [
				{
					name: "title",
					label: "Título",
					type: "text",
				},
				{
					name: "evento_section_type",
					label: "Tipo de Secção",
					type: "select",
					defaultValue: "text",
					options: [
						{
							label: "Conteúdo",
							value: "text",
						}, {
							label: "Fotografias",
							value: "images",
						},
						{
							label: "Vídeo",
							value: "video",
						},
						{
							label: "iFrame",
							value: "iframe",
						},
					],
				},
				{
					name: "content",
					label: "Conteúdo",
					type: "richText",
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === "text" }
				},

				{
					name: "video",
					label: "Url do Vídeo",
					type: "text",
					required: false,
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === "video" }
				},
				{
					name: "iframe",
					label: "iFrame",
					type: "text",
					required: false,
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === "iframe" }
				},
				{
					name: "images",
					label: "Fotografias",
					type: "array",
					required: false,
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === "images" },
					fields: [
						{
							name: "image",
							label: "Imagem",
							type: "upload",
							relationTo: "media",
							required: true,
						},
						{
							name: "caption",
							label: "Legenda",
							type: "text",
							required: false,
						},
					]
				},
			]
		},
		...sidebarFields,
	],
}

export default Events