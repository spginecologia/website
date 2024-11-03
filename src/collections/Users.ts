import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
			name: 'title',
			label: 'Título',
			type: 'select',
      options: [
        { value: 'Sr.', label: 'Sr.' },
        { value: 'Sr.ª', label: 'Sr.ª' },
        { value: 'Dr.', label: 'Dr.' },
        { value: 'Dr.ª', label: 'Dr.ª' },
        { value: 'Prof.', label: 'Prof.' },
        { value: 'Prof.ª', label: 'Prof.ª' },
        { value: 'Exmo.', label: 'Exmo.' },
        { value: 'Exmo.ª', label: 'Exmo.ª' },
      ],
		},
    {
			name: 'name',
			label: 'Nome',
			type: 'text',
		},
    {
			name: 'last_name',
			label: 'Apelido',
			type: 'text',
		},
    {
			name: 'full_name',
			label: 'Nome Completo',
			type: 'text',
		},
    {
			name: 'cellphone',
			label: 'Telefone',
			type: 'number',
		},
    {
			name: 'email',
			label: 'Email',
			type: 'text',
		},
    {
			name: 'partner_number',
			label: 'Número de Sócio SPG',
			type: 'number',
		},
    {
			name: 'tax_number',
			label: 'Número de Contribuinte',
			type: 'number',
		},
    {
			name: 'date',
			label: 'Data de Nascimento',
			type: 'date',
		},
    {
			name: 'prime_workplace',
			label: 'Local de Trabalho Principal',
			type: 'text',
		},
    {
			name: 'secondary_workplace',
			label: 'Local de Trabalho Secundário',
			type: 'text',
		},
    {
      type: 'row',
      fields: [
        {
          name: 'colposcopia_patologia_tracto_genital_inferior',
          label: 'Colposcopia Patologia Tracto Genital Inferior',
          type: 'checkbox',
        },
        {
          name: 'endoscopia_genecologica',
          label: 'Endoscopia Ginecológica',
          type: 'checkbox',
        },
        {
          name: 'ginecologia_oncologica',
          label: 'Ginecologia Oncológica',
          type: 'checkbox',
        },
        {
          name: 'menopausa',
          label: 'Menopausa',
          type: 'checkbox',
        },
        {
          name: 'uroginecologia',
          label: 'Uroginecologia',
          type: 'checkbox',
        },
      ]
    },
    {
			name: 'address',
			label: 'Morada',
			type: 'text',
		},
    {
			name: 'address_cont',
			label: 'Morada (Continuação)',
			type: 'text',
		},
    {
			name: 'post_code',
			label: 'Código Postal',
			type: 'text',
		},
    {
			name: 'city',
			label: 'Cidade',
			type: 'text',
		},
    {
			name: 'country',
			label: 'País',
			type: 'text',
      defaultValue: 'Portugal'
		},
  ],
}
