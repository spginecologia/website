/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { HomeEvents } from '@/components/home/HomeEvents';
import { HomeGuidelines } from '@/components/home/HomeGuidelines';
import { HomeNews } from '@/components/home/HomeNews';
import { HomeSlider } from '@/components/home/HomeSlider';
import { SocietyMission } from '@/components/society/SocietyMission';

/* * */

export function HomeMain() {
	return (
		<ContentWrapper>
			<HomeSlider />
			<HomeNews />
			<SocietyMission />
			<HomeEvents />
			{/* <HomeSections /> */}
			{/* <HomeAcademia /> */}
			<HomeGuidelines />
		</ContentWrapper>
	);
}
