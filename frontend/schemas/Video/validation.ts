/* * */

import { z } from 'zod';

/* * */

export const VideoValidation = z.object({

	authors: z
		.string({ message: 'Por favor coloque os autores do vídeo' })
		.min(5, { message: 'Por favor coloque os autores do vídeo' })
		.max(150, { message: 'Autores deve ser menor ou igual que 150 caracteres' }),

	cover_file: z
		.string({ message: 'Por favor selecione uma imagem' })
		.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

	declaration_file: z
		.string({ message: 'Primeiro Nome é um campo obrigatório.' })
		.max(25, { message: 'Primeiro Nome deve ser menor ou igual que ${max} caracteres.' }),

	description: z
		.string({ message: 'Telefone é um campo obrigatório.' })
		.min(9, { message: 'Phone deve ser maior ou igual que 9 caracteres.' })
		.max(13, { message: 'Phone deve ser menor ou igual que 13 caracteres.' }),

	introduction: z
		.string({ message: 'O vídeo precisa de uma introdução' })
		.max(25, { message: 'A introdução deve explicar resumidamente o conteúdo do vídeo' }),

	rgpd_toggle: z
		.boolean({ message: 'Último Nome é um campo obrigatório.' }),

	section: z
		.string({ message: 'Último Nome é um campo obrigatório.' })
		.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

	title: z
		.string({ message: 'O vídeo precisa de um título' })
		.min(10, { message: 'O título deve ser explicativo do conteúdo do vídeo' }),

	topics: z
		.string({ message: 'Último Nome é um campo obrigatório.' })
		.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

	video_file: z
		.string({ message: 'Por favor selecione um ficheiro' })
		.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

});
