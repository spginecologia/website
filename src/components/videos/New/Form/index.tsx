"use client";

import { useState } from "react";
import RichTextEditor from "@/components/common/RichTextEditor";
import FormInput from "../FormInput";
import styles from "./styles.module.css";
import { Media } from "@/payload-types";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { InterestArea } from "@/types/videos";
import { handleSubmit } from "@/functions/handSubmit";

const convertFileToMedia = (file: File): Media => {
    return {
        id: file.name,
        alt: null,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        url: URL.createObjectURL(file),
        filename: file.name,
        mimeType: file.type,
        filesize: file.size,
        width: null,
        height: null,
        focalX: null,
        focalY: null,
    };
};

export function Form() {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [file, setFile] = useState<Media | null>(null);
    const [coverImage, setCoverImage] = useState<Media | null>(null);
    const [introduction, setIntroduction] = useState("");
    const [description, setDescription] = useState("");
    const [interestArea, setInterestArea] = useState<InterestArea | null>(null);
    const [declarationFile, setDeclarationFile] = useState<Media | null>(null);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form className={styles.form}>
            {/* onSubmit={() => handleSubmit(title, authors, file, coverImage, introduction, description, interestArea, declarationFile, isPrivacyChecked, setIsSubmitting)} */}
            <div className={styles.title}>Submeter Vídeo</div>
            <div className={styles.subtitle}>
                Agradecemos o seu interesse em publicar na Academia SPG. Poderá encontrar as <a target="_blank" href="/academia/videos/new/help/">instruções de publicação aqui</a>. Para qualquer dúvida não hesite em contactar-nos para o email <a href="mailto:academia@spginecologia.pt">academia@spginecologia.pt</a>
            </div>
            <FormInput label="Título" placeholder="Introduza o nome do vídeo" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <FormInput label="Autores" placeholder="Nome Apelido; Nome Apelido; Nome Apelido; ..." type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} />
            <FormInput 
                label="Ficheiro" 
                placeholder="" 
                type="file" 
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile ? convertFileToMedia(selectedFile) : null);
                }} 
            />
            <FormInput 
                label="Imagem de Capa" 
                placeholder="" 
                type="file" 
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setCoverImage(selectedFile ? convertFileToMedia(selectedFile) : null);
                }} 
            />
            <div className={styles.aboutTitle}>Sobre este Vídeo</div>
            <div className={styles.aboutSubtitle}>Introduza uma pequena introdução que descreva o core do vídeo. Na descrição pode incluir detalhes mais vastos.</div>
            <div className={styles.textArea}>
                <label>Introdução</label>
                <textarea rows={8} value={introduction} onChange={(e) => setIntroduction(e.target.value)}></textarea>
            </div>
            <div className={styles.richTextEditor}>
                <label>Descrição</label>
                <RichTextEditor value={description} onChange={setDescription} />
            </div>
            <div className={styles.aboutTitle}>Metadados</div>
            <div className={styles.aboutSubtitle}>Escolha vários tópicos que se relacionam com o tema do seu vídeo.</div>
            <div className={styles.label}>Área de Interesse</div>
            <Select
                placeholder="— Selecione uma opção —"
                data={[
                    { value: "geral", label: "Geral" },
                    { value: "colposcopia_patologia_tracto_genital_inferior", label: "Colposcopia Patologia Tracto Genital Inferior" },
                    { value: "endoscopia_ginecologica", label: "Endoscopia Ginecológica" },
                    { value: "ginecologia_oncologica", label: "Ginecologia Oncológica" },
                    { value: "menopausa", label: "Menopausa" },
                    { value: "uroginecologia", label: "Uroginecologia" },
                ]}
                value={interestArea}
                onChange={(value) => setInterestArea(value as InterestArea)}
            />
            <div className={styles.aboutTitle}>Privacidade e Conflito de Interesses</div>
            <div className={styles.aboutSubtitle}>
                A SPG valoriza os direitos de privacidade e a garantia de não existirem quaisquer conflitos de interesse inerentes à publicação de um vídeo científico. Pedimos ao autor do vídeo que assine a <a target="_blank" href="https://spginecologia.pt/wp-content/mu-plugins/forms/video_submit/AcademiaSPG-DeclaracaoCedenciaDireitos.pdf">Declaração de Cedência de Direitos</a> e faça o upload do ficheiro no campo seguinte. Pode encontrar a <a target="_blank" href="https://spginecologia.pt/wp-content/mu-plugins/forms/video_submit/AcademiaSPG-DeclaracaoCedenciaDireitos.pdf">declaração aqui</a>.
            </div>
            <FormInput
                label="Declaração Assinada"
                placeholder=""
                type="file"
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setDeclarationFile(selectedFile ? convertFileToMedia(selectedFile) : null);
                }}
            />
            <label className={styles.checkboxWrapper}>
                <input type="checkbox" checked={isPrivacyChecked} onChange={() => setIsPrivacyChecked(!isPrivacyChecked)} />
                <div className={styles.checkboxText}>Confirmo que possuo os direitos de imagem dos ficheiros enviados e estão ocultas as respectivas identificações pessoais, de acordo com o <a target="_blank" href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02016R0679-20160504">Regulamento Geral de Protecção de Dados (RGPD)</a>.</div>
            </label>
            <Button type="submit">
                {isSubmitting ? "Submetendo..." : "Submeter Vídeo"}
            </Button>
        </form>
    );
}
