import type { CollectionConfig } from 'payload'

// #, Legenda, Nome, Tipo
// 0, Título, video_title, Texto
// 1, Ficheiro deste Vídeo, video_file, Ficheiro
// 2, Duração do Vídeo, video_file_length, Texto
// 3, Destacar?, video_featured, Verdadeiro / Falso
// 4, Declaração Assinada, video_declaration_signed, Ficheiro
// 5, Confirmação RGPD, video_rgpd_confirmation, Verdadeiro / Falso
// 6, Autores, video_authors, Texto
// 7, Área de Interesse, video_section, Selecção
// 8, Introdução deste Vídeo, video_introduction, Área de texto
// 9, Descrição deste Vídeo, video_description, Editor WYSIWYG

const Videos: CollectionConfig = {
	labels: {
		singular: "Video",
		plural: "Videos",
	},
	slug: "videos",
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
			type: "row",
			fields: [
				{
					name: "video_featured",
					label: "Destacar?",
					type: "checkbox",
					defaultValue: false,
				},
				{
					name: "video_rgpd_confirmation",
					label: "Confirmação RGPD",
					type: "checkbox",
					required: true,
				},
			]
		},
		{
			// Todo: Add a hook to get the video duration from the video file
			name: "video_file_length",
			label: "Duração do Vídeo",
			type: "text",
			required: false,
			admin: {
				position: "sidebar",
			}
		},
		{
			name: "video_file",
			label: "Ficheiro do Vídeo",
			type: "upload",
			required: true,
			relationTo: "media",
		},
		{
			name: "video_declaration_signed",
			label: "Declaração Assinada",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "video_authors",
			label: "Autores",
			type: "text",
			required: true,
		},
		{
			name: "video_section",
			label: "Área de Interesse",
			type: "select",
			required: true,
			options: [
				{ value: "geral", label: "Geral" },
				{ value: "colposcopia_patologia_tracto_genital_inferior", label: "Colposcopia Patologia Tracto Genital Inferior" },
				{ value: "endoscopia_ginecologica", label: "Endoscopia Ginecológica" },
				{ value: "ginecologia_oncologica", label: "Ginecologia Oncológica" },
				{ value: "menopausa", label: "Menopausa" },
				{ value: "uroginecologia", label: "Uroginecologia" },
			],
		},
		{
			name: "video_introduction",
			label: "Introdução deste Vídeo",
			type: "textarea",
			required: true,
		},
		{
			name: "video_description",
			label: "Descrição deste Vídeo",
			type: "richText",
			required: true,
		},
		{
			name: "author",
			label: "Autor",
			type: "relationship",
			relationTo: "users",
			required: true,
		},
		{
			name: "categories",
			label: "Categorias",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
			admin: {
				position: "sidebar",
			}
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			required: true,
			admin: { position: "sidebar" }
		},
		{
			name: "featured_image",
			label: "Imagem de Destaque",
			type: "upload",
			relationTo: "media",
			admin: { position: "sidebar" }
		}
	]
}

export default Videos;