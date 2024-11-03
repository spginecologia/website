/* * */

import Card from '@/components/common/card/Card';
import { Grid } from '@/components/layout/Grid';
import { AssetsSections } from '@/lib/assets';
import { SectionRoutes } from '@/lib/routes';

/* * */

export default function Component() {
	return (
		<>
			<Grid columns="abcde" gap="md">
				<Card
					variant='transparent'
					link={SectionRoutes.SPCPTGI.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.COLPOSCOPIA_PATOLOGIA_TRACTO_GENITAL_INFERIOR,
					}}
				/>
				<Card
					variant='transparent'
					link={SectionRoutes.SPEG.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.ENDOSCOPIA_GINECOLOGICA,
					}}
				/>
				<Card
					variant='transparent'
					link={SectionRoutes.GINECOLOGIA.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.GINECOLOGIA_ONCOLOGICA,
					}}
				/>
				<Card
					variant='transparent'
					link={SectionRoutes.SPM.path}
					image={{
						alt: '',
						size: 300,
						src: AssetsSections.MENOPAUSA,
					}}
				/>
				<Card
					variant='transparent'
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
