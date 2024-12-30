/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { HomeEvents } from '@/components/home/HomeEvents';
import { HomeGuidelines } from '@/components/home/HomeGuidelines';
import { HomeMission } from '@/components/home/HomeMission';
import { HomeNews } from '@/components/home/HomeNews';
import { HomeSlider } from '@/components/home/HomeSlider';

/* * */

export function HomeMain() {
	return (
		<ContentWrapper>
			<HomeSlider />
			<HomeNews />
			<HomeMission />
			<HomeEvents />
			{/* <HomeSections /> */}
			{/* <HomeAcademia /> */}
			<HomeGuidelines />
		</ContentWrapper>
	);
}
