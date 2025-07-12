/* * */

import { BrandAssetsMain } from '@/src/components/brand/BrandAssetsMain';
import { BrandColors } from '@/src/components/brand/BrandColors';
import { BrandTypography } from '@/src/components/brand/BrandTypography';

/* * */

export default function Page() {
	return (
		<div>
			<BrandAssetsMain />
			<BrandColors />
			<BrandTypography />
		</div>
	);
}
