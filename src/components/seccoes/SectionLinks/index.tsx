/* * */

import Button from '@/components/common/Button';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Media, Member, Section as SectionItem } from '@/payload-types';
import MemberCard from '@/components/common/MemberCard';

import styles from './styles.module.css';
import Link from 'next/link';

/* * */

export default function Component({ section }: { section: SectionItem }) {
	return (
		<>
			<Section variant="secondary">
				<Grid columns="ab" withGap>
					{section.members && (
						<div className={styles.content}>
							<h2>Órgãos Sociais</h2>
							{section.members.map(member => (
								<MemberCard key={member.name} member={member as Member} />
							))}
						</div>
					)}
					<div className={styles.content}>
						{(section.buttons?.length! > 0 || section.useful_links?.length! > 0) && (
							<div className={styles.content}>
								<h2>Links Úteis</h2>
								{section.useful_links?.length! > 0 && (
									<div className={styles.links}>
										{section.useful_links?.map(link => (
											<Link key={link.id} href={link.url} target="_blank"> {link.title} </Link>
										))}
									</div>
								)}
								{section.buttons?.length! > 0 && (
									<div className={styles.buttons}>
										{section.buttons?.map(button => (
											<Button
												key={button.id}
												link={button.type === 'url' ? button.url ?? undefined : (button.file as Media)?.url ?? undefined}
											>
												{button.title}
											</Button>
										))}
									</div>
								)}
							</div>
						)}
						{section.workshops?.length! > 0 && (
							<div className={styles.content}>
								<h2>Workshops</h2>
								<div className={styles.links}>
									{section.workshops?.map(item => (
										<Link key={item.id} href={item.url ?? ''} target="_blank"> {item.title} </Link>
									))}
								</div>
							</div>
						)}
						{section.contacts?.length! > 0 && (
							<div className={styles.content}>
								<h2>Contactos</h2>
								<div className={styles.links}>
									{section.contacts?.map(item => (
										item.type === 'email' ? (
											<Link key={item.id} href={`mailto:${item.email}`} target="_blank"> {item.email} </Link>
										) : (
											<Link key={item.id} href={`tel:${item.phone}`} target="_blank"> {item.phone} </Link>
										)
									))}
								</div>
							</div>
						)}
					</div>
				</Grid>
			</Section>
		</>
	);
}
