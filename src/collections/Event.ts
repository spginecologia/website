import { formatSlug } from "@/lib/utils"
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
			name: "slug",
			label: "Slug",
			type: "text",
			required: true,
			admin: { position: "sidebar" },
			hooks: {
				beforeChange: [formatSlug("title")],
			},
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
			name: "categories",
			label: "Categorias",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
			admin: { position: "sidebar" },
		},
		{
			name: "featured_image",
			label: "Imagem em destaque",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: { position: "sidebar" },
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
					required: true,
				},
				{
					name: "evento_section_type",
					label: "Tipo de Secção",
					type: "select",
					options: [{
						label: "Conteúdo",
						value: "texto",
					}, {
						label: "Fotografias",
						value: "Fotografias",
					},
					{
						label: "Vídeo",
						value: "Vídeo",
					}
					],
				},
				{
					name: "content",
					label: "Conteúdo",
					type: "richText",
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === "texto" }
				},
				{
					name: "images",
					label: "Fotografias",
					type: "array",
					required: false,
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
				{
					name: "video",
					label: "Url do Vídeo",
					type: "text",
					required: false,
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === "Vídeo" }
				},
			]
		},

	],
}

export default Events