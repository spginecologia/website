/* * */

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { HomeEvents } from '@/src/components/home/HomeEvents';
import { HomeGuidelines } from '@/src/components/home/HomeGuidelines';
import { HomeNews } from '@/src/components/home/HomeNews';
import { HomeSlider } from '@/src/components/home/HomeSlider';
import { SocietyMission } from '@/src/components/society/SocietyMission';

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
