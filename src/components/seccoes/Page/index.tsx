/* * */
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import Image from 'next/image';

import SectionCards from '../SectionCards';
import { Assets } from '@/lib/assets';

/* * */

export default function Component() {
	return (
		<>
			<Section>
				<SectionCards />
			</Section>
			<Section>
				<Grid align="center" columns="aab" withGap>
					<div>
						<h2>Juntos contribuímos para o avanço do conhecimento.</h2>
						<br />
						<p>As Secções da SPG surgem no contexto da subespecialização dos conhecimentos e competências no âmbito da Especialidade. Destinados ao estudo aprofundado de temas específicos, pretendem agrupar os membros da SPG com especial interesse nessa temática.</p>
					</div>
					<Image alt="" height={10} src={Assets.SECTION_ILLUSTRATION} style={{ height: 'auto', width: '100%' }} width={750} />
				</Grid>
			</Section>
		</>
	);
}
