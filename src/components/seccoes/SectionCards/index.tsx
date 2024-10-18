/* * */

import Card from '@/components/common/card/Card';
import { Grid } from '@/components/layout/Grid';
import { AssetsSections } from '@/lib/assets';
import { SectionRoutes } from '@/lib/routes';

/* * */

export default function Component() {
	return (
		<>
			<Grid columns="abcde" withGap>
				<Card
					link={SectionRoutes.SPCPTGI.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.COLPOSCOPIA_PATOLOGIA_TRACTO_GENITAL_INFERIOR,
					}}
				/>
				<Card
					link={SectionRoutes.SPEG.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.ENDOSCOPIA_GINECOLOGICA,
					}}
				/>
				<Card
					link={SectionRoutes.GINECOLOGIA.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.GINECOLOGIA_ONCOLOGICA,
					}}
				/>
				<Card
					link={SectionRoutes.SPM.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.MENOPAUSA,
					}}
				/>
				<Card
					link={SectionRoutes.SPUG.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.UROGINECOLOGIA,
					}}
				/>
			</Grid>
		</>
	);
}
