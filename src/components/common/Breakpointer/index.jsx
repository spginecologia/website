/* * */

/**
 * Use to show children only when desktop theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in desktop theme.
 * @returns {JSX.Element} The rendered BreakpointerDesktop component.
 */

export function BreakpointerDesktop({ children }) {
	return (
		<format-desktop>
			{children}
		</format-desktop>
	);
}

/**
 * Use to show children only when mobile theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in mobile theme.
 * @returns {JSX.Element} The rendered BreakpointerMobile component.
 */

export function BreakpointerMobile({ children }) {
	return (
		<format-mobile>
			{children}
		</format-mobile>
	);
}

/**
 * BreakpointerSwitch component to automatically toggle children components between mobile and desktop themes.
 * @param {ReactNode} mobile The content to display in mobile theme.
 * @param {ReactNode} desktop The content to display in desktop theme.
 * @returns {JSX.Element} The rendered BreakpointerSwitch component.
 */

export function BreakpointerSwitch({ desktop, mobile }) {
	return (
		<>
			<BreakpointerDesktop>
				{desktop}
			</BreakpointerDesktop>
			<BreakpointerMobile>
				{mobile}
			</BreakpointerMobile>
		</>
	);
}
