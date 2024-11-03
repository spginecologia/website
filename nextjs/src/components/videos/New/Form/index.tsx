'use client'

import {
  FormCheckbox,
  FormInput,
  FormRichTextEditor,
  //   FormRichTextEditor,
  FormSection,
  FormSelect,
  FormSubtitle,
  FormTitle,
} from '@/components/common/Form'
import { useForm } from 'react-hook-form'

import styles from './styles.module.css'
import Button from '@/components/common/Button'
import { Video } from '@/payload-types'
import { generateId } from '@/lib/utils'
import { useState } from 'react'

export default function VideoUploadForm() {
  const { register, handleSubmit, watch } = useForm()
  const [section, setSection] = useState('')

  const onSubmit = async (data: any) => {
    data.section = section
    const files = [data.file[0], data.coverImage[0], data.declarationFile[0]]

    //Upload files
    const responses = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        console.log('formData', file)

        return fetch('/api/media', {
          method: 'POST',
          body: formData,
        })
      }),
    )

    if (responses.some((response) => !response.ok)) {
      alert('Failed to upload files')
      return
    }

    const responsesData = await Promise.all(responses.map((response) => response.json()))

    console.log('responsesData', responsesData)

    const video: Video = {
      id: generateId(),
      title: data.title,
      video_featured: false,
      video_rgpd_confirmation: data.isPrivacyChecked,
      video_file_length: null,
      video_file: responsesData[0].doc.id,
      video_declaration_signed: responsesData[2].doc.id,
      video_authors: data.authors,
      video_section: data.section as
        | 'geral'
        | 'colposcopia_patologia_tracto_genital_inferior'
        | 'endoscopia_ginecologica'
        | 'ginecologia_oncologica'
        | 'menopausa'
        | 'uroginecologia',
      video_introduction: data.introduction,
      video_description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'O caso descreve uma mulher de 32 anos com antecedentes de Infertilidade primária com 18 meses de evolução e com queixas de dismenorreia primária. A quistectomia laparoscópica pela técnica invertida prima por realizar o ',
                  type: 'text',
                  version: 1,
                },
                {
                  detail: 0,
                  format: 2,
                  mode: 'normal',
                  style: '',
                  text: 'stripping ',
                  type: 'text',
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'na porção mais espessa do quisto reduzindo a possibilidade de fragmentar as paredes do mesmo, identificando assim mais facilmente o plano  de separação entre o parênquima ovárico e o quisto. Adicionalmente, a realização da incisão até aos bordos do quisto é uma referência importante de orientação para o cirurgião, realizando a quistectomia sob visualização direta, permitindo uma excisão completa. Neste caso, e por se tratar de um quadro de infertilidade associada à endometriose é aconselhada a realização da prova de cromotubação tubária bilateral no final do procedimento para confirmar a permeabilidade tubar.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      author: '671192ffac28620f8ff592bf',
      categories: [],
      featured: responsesData[1].doc.id,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    console.log(video)

    const response = await fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    })

    if (response.ok) {
      alert('Video submitted successfully')
    } else {
      alert('Failed to submit video')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Title and subtitle */}
      <FormTitle>Upload a video</FormTitle>
      <FormSubtitle>
        Agradecemos o seu interesse em publicar na Academia SPG. Poderá encontrar as{' '}
        <a target="_blank" href="/academia/videos/new/help/">
          instruções de publicação aqui
        </a>
        . Para qualquer dúvida não hesite em contactar-nos para o email{' '}
        <a href="mailto:academia@spginecologia.pt">academia@spginecologia.pt</a>
      </FormSubtitle>
      {/* Main fields */}
      <FormInput
        label="Título"
        placeholder="Introduza o nome do vídeo"
        type="text"
        {...register('title')}
      />
      <FormInput
        label="Autores"
        placeholder="Nome Apelido; Nome Apelido; Nome Apelido; ..."
        type="text"
        {...register('authors')}
      />
      <FormInput label="Ficheiro" placeholder="" type="file" {...register('file')} />
      <FormInput label="Imagem de Capa" placeholder="" type="file" {...register('coverImage')} />
      {/* About fields */}
      <FormSection
        title={'Sobre este Vídeo'}
        description={
          'Introduza uma pequena introdução que descreva o core do vídeo. Na descrição pode incluir detalhes mais vastos.'
        }
      />
      <FormInput label="Introdução" placeholder="" type="text" {...register('introduction')} />

      {/* <FormRichTextEditor
        label="Descrição"
        placeholder="Introdução"
        onChange={(value) => {
          console.log(value)
        }}
      /> */}

      {/* Metadata fields */}
      <FormSection
        title={'Metadados'}
        description={'Escolha vários tópicos que se relacionam com o tema do seu vídeo.'}
      />
      <FormSelect
        label="Área de Interesse"
        placeholder="— Selecione uma opção —"
        onChange={setSection}
        data={[
          { value: 'geral', label: 'Geral' },
          {
            value: 'colposcopia_patologia_tracto_genital_inferior',
            label: 'Colposcopia Patologia Tracto Genital Inferior',
          },
          { value: 'endoscopia_ginecologica', label: 'Endoscopia Ginecológica' },
          { value: 'ginecologia_oncologica', label: 'Ginecologia Oncológica' },
          { value: 'menopausa', label: 'Menopausa' },
          { value: 'uroginecologia', label: 'Uroginecologia' },
        ]}
      />
      {/* Privacy and conflicts of interest fields */}
      <FormSection
        title={'Privacidade e Conflito de Interesses'}
        description={
          'A SPG valoriza os direitos de privacidade e a garantia de não existirem quaisquer conflitos de interesse inerentes à publicação de um vídeo científico. Pedimos ao autor do vídeo que assine a Declaração de Cedência de Direitos e faça o upload do ficheiro no campo seguinte. Pode encontrar a Declaração de Cedência de Direitos no link abaixo.'
        }
      />
      <FormInput
        label="Declaração Assinada"
        placeholder=""
        type="file"
        {...register('declarationFile')}
      />
      <FormCheckbox
        {...register('isPrivacyChecked', { required: true })}
        text={
          <>
            Confirmo que possuo os direitos de imagem dos ficheiros enviados e estão ocultas as
            respectivas identificações pessoais, de acordo com o{' '}
            <a
              target="_blank"
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02016R0679-20160504"
            >
              Regulamento Geral de Protecção de Dados (RGPD)
            </a>
            .
          </>
        }
      />
      <Button fullWidth type="submit" disabled={!watch('isPrivacyChecked')}>
        Submeter Vídeo
      </Button>
    </form>
  )
}
