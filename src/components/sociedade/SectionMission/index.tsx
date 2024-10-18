/* * */
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import Image from 'next/image';

/* * */

export default function Component() {
	return (
		<Section heading="A nossa missão" variant="primary">
			<Grid columns="ab" withGap>
				<div>
					<h2>O desenvolvimento de uma especialidade.</h2>
					<br />
					<p>A SPG é uma associação científica, sem fins lucrativos e de utilidade pública, comprometida com a promoção da Saúde em geral e da Mulher em particular e com a defesa e concertação de todos os Ginecologistas Portugueses.</p>
					<br />
					<p>Assumindo na plenitude o espírito empreendedor, dinâmico e seguramente inovador que sustentou a sua criação há já mais de 40 anos, a SPG mantém como missão o estímulo ao desenvolvimento da Especialidade nas suas diferentes e múltiplas facetas, como o exercício profissional, mas também com os aspectos relacionados com a dimensão ética, académica e social.</p>
				</div>
				<Image alt="Missão da SPG" height={10} src={"/placeholder.png"} style={{ height: 'auto', width: '80%' }} width={50} />
			</Grid>
			<div>
				<p>Assim tem como papel:</p>
				<ul>
					<li>Promover o desenvolvimento da Ginecologia ao serviço da saúde da mulher;</li>
					<li>Estimular a investigação no domínio da Ginecologia;</li>
					<li>Difundir ideias, promover a atualização de conhecimentos e trabalhos de Ginecologia;</li>
					<li>Promover contactos e o intercâmbio nacional e internacional entre os diversos profissionais ligados à especialidade;</li>
					<li>Desenvolver atividades educacionais no domínio da Ginecologia;</li>
					<li>Exercer atividades de consultadoria no campo da Ginecologia.</li>
				</ul>
			</div>
		</Section>
	);
}
