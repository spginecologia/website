import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config";
import { Media } from "@/payload-types";
import { InterestArea } from "@/types/videos";

export const handleSubmit = async (title: string, authors: string, file: Media | null, coverImage: Media | null, introduction: string, description: string, interestArea: InterestArea | null, declarationFile: Media | null, isPrivacyChecked: boolean, setIsSubmitting: (value: boolean) => void) => {
    const payload = await getPayloadHMR({ config });

    if (!title || !authors || !file || !coverImage || !introduction || !description || !declarationFile || !isPrivacyChecked) {
        alert("Please fill in all required fields and confirm the privacy checkbox.");
        return;
    }

    setIsSubmitting(true);

    try {
        const response = await payload.create({
            collection: 'videos',
            data: {
                title,
                video_authors: authors,
                video_file: file,
                featured: coverImage,
                video_introduction: introduction,
                video_description: {
                    root: {
                        type: 'doc',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: description }],
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                },
                video_declaration_signed: declarationFile,
                video_rgpd_confirmation: isPrivacyChecked,
                video_section: interestArea ?? 'geral',
                author: '' // TODO: add current logged in user
            },
        });

        console.log("Video created:", response);
        alert("Video successfully submitted!");
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the video.");
    } finally {
        setIsSubmitting(false);
    }
}