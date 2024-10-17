import Button from '@/components/common/Button';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';

export default function Component() {
	return (
		<Section variant="secondary">
			<Grid columns="abc" withGap>
				<Button link={""} fullWidth>Estatudos da Sociedade</Button>
				<Button link={""} fullWidth>Regulamento eleitoral</Button>
				<Button link={""} fullWidth>Regulamento de Patrocínios</Button>
				<Button link={""} fullWidth>1ª Assembleia Geral</Button>
				<Button link={""} fullWidth>Direções Anteriores</Button>
				<Button link={""} fullWidth>Regulamento das secções e núcleos</Button>
			</Grid>
			<Button link={""} fullWidth>Relatórios de atividades 2023</Button>
		</Section>
	);
}
