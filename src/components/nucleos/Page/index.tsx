/* * */
import Circle from '@/components/common/Circle';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { AssetsSections } from '@/lib/assets';
import { WorkgroupsRoutes } from '@/lib/routes';
import Image from 'next/image';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<Section>
				<div className={styles.circles}>
					<Circle className={styles.item} label="Comunicação" link={WorkgroupsRoutes.COMUNICACAO.path} />
					<Circle className={styles.item} label="Ecografia Ginecológica" link={WorkgroupsRoutes.ECOSONOGRAFIA_GINOLOGICA.path} />
					<Circle className={styles.item} label="Estudos Clinicos" link={WorkgroupsRoutes.ESTUDOS_CLINICOS.path} />
					<Circle className={styles.item} label="Ginecologia Da Infância e da Adolescência" link={WorkgroupsRoutes.GINECOLOGIA_INFANCIA_ADOLESCENCIA.path} />
					<Circle className={styles.item} label="Ginecologia Psicossomática" link={WorkgroupsRoutes.GINECOLOGIA_PSICOSSOMATICA.path} />
					<Circle className={styles.item} label="Mama" link={WorkgroupsRoutes.MAMA.path} />
					<Circle className={styles.item} label="Medicina Sexual" link={WorkgroupsRoutes.MEDICINA_SEXUAL.path} />
				</div>
			</Section>
			<Section>
				<Grid align="center" columns="aab" withGap>
					<div>
						<h2>Promover a excelência científica.</h2>
						<br />
						<p>Os Núcleos da Sociedade Portuguesa de Ginecologia, criados ao abrigo do Art. 8º dos seus Estatutos, asseguraram o apoio técnico à direcção da SPG em áreas especificas da Ginecologia de natureza multidisciplinar e com pontos em comum com outras especialidades. Assumem também um papel nos eventos organizados pela SPG.</p>
					</div>
					<Image alt="" height={10} src={AssetsSections.SECTION_ILLUSTRATION} style={{ height: 'auto', width: '100%' }} width={750} />
				</Grid>
			</Section>
		</>
	);
}
