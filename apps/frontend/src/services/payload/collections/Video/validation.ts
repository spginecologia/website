/* * */

import { z } from 'zod/v4';

import { VideoOptions } from './options';

/* * */

export const VideoValidationCommon = {

	authors: z
		.string({ message: 'Por favor coloque os autores do vídeo' })
		.min(5, { message: 'Por favor coloque os autores do vídeo' })
		.max(150, { message: 'Autores deve ser menor ou igual que 150 caracteres' }),

	description: z
		.string({ message: 'Telefone é um campo obrigatório.' })
		.min(10, { message: 'Phone deve ser maior ou igual que 9 caracteres.' }),

	introduction: z
		.string({ message: 'O vídeo precisa de uma introdução' })
		.max(150, { message: 'A introdução deve explicar resumidamente o conteúdo do vídeo' }),

	rgpd_toggle: z
		.boolean(),

	section: z
		.string(),

	title: z
		.string({ message: 'O vídeo precisa de um título' })
		.min(10, { message: 'O título deve ser explicativo do conteúdo do vídeo' }),

	topics: z
		.array(z.string(), { message: 'Selecione pelo menos 1 tópico' })
		.min(1, { message: 'Selecione pelo menos 1 tópico' }),

};

/* * */

export const VideoValidationClient = z.object({

	...VideoValidationCommon,

	declaration_file: z
		.any()
		.refine(file => !!file, { message: 'Selecione um PDF' }),

	featured_image: z
		.any()
		.refine(file => !!file, { message: 'Selecione uma imagem de capa' }),

	rgpd_toggle: z
		.boolean()
		.refine(rgpd_toggle => rgpd_toggle, { message: 'Aceite a declaração de privacidade' }),

	video_file: z
		.any()
		.refine(file => !!file, { message: 'Selecione um ficheiro de vídeo' }),

});

/* * */

export const VideoValidationServer = z.object({

	...VideoValidationCommon,

});
