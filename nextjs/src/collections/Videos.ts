import { sidebarFields } from '@/fields/sidebar'
import type { CollectionConfig } from 'payload'

const Videos: CollectionConfig = {
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Titulo',
      type: 'text',
      required: true,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'video_featured',
          label: 'Destacar?',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'video_rgpd_confirmation',
          label: 'Confirmação RGPD',
          type: 'checkbox',
          required: true,
        },
      ],
    },
    {
      // Todo: Add a hook to get the video duration from the video file
      name: 'video_file_length',
      label: 'Duração do Vídeo',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'video_file',
      label: 'Ficheiro do Vídeo',
      type: 'upload',
      required: true,
      relationTo: 'media',
    },
    {
      name: 'video_declaration_signed',
      label: 'Declaração Assinada',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'video_authors',
      label: 'Autores',
      type: 'text',
      required: true,
    },
    {
      name: 'video_section',
      label: 'Área de Interesse',
      type: 'select',
      required: true,
      options: [
        { value: 'geral', label: 'Geral' },
        {
          value: 'colposcopia_patologia_tracto_genital_inferior',
          label: 'Colposcopia Patologia Tracto Genital Inferior',
        },
        { value: 'endoscopia_ginecologica', label: 'Endoscopia Ginecológica' },
        { value: 'ginecologia_oncologica', label: 'Ginecologia Oncológica' },
        { value: 'menopausa', label: 'Menopausa' },
        { value: 'uroginecologia', label: 'Uroginecologia' },
      ],
    },
    {
      name: 'video_introduction',
      label: 'Introdução deste Vídeo',
      type: 'textarea',
      required: true,
    },
    {
      name: 'video_description',
      label: 'Descrição deste Vídeo',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    ...sidebarFields,
  ],
}

export default Videos
