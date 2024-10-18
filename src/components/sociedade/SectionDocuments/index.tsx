import Button from '@/components/common/Button';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { PDFs } from '@/lib/assets';

export default function Component() {
	return (
		<Section variant="secondary">
			<Grid columns="abc" withGap>
				<Button link={PDFs.ESTATUTOS_SPG} fullWidth>Estatudos da Sociedade</Button>
				<Button link={PDFs.REGULAMENTO_ELEITORAL_SPG} fullWidth>Regulamento eleitoral</Button>
				<Button link={PDFs.REGULAMENTO_PATROCINIOS_SPG} fullWidth>Regulamento de Patrocínios</Button>
				<Button link={PDFs.PRIMEIRA_ASSEMBLEIA_GERAL_SPG} fullWidth>1ª Assembleia Geral</Button>
				<Button link={PDFs.ANTERIORES_DIRECCOES_SPG} fullWidth>Direções Anteriores</Button>
				<Button link={PDFs.REGULAMENTO_GERAL_SECCOES_SPG} fullWidth>Regulamento das secções e núcleos</Button>
			</Grid>
			<Button link={PDFs.RELATORIO_DE_ACTIVIDADES_SPG_2023} fullWidth>Relatórios de atividades 2023</Button>
		</Section>
	);
}
