// Every button on the site: OpenAI's Apps SDK UI Button at size xl (40px, fully rounded).
// Rendered to plain HTML at build time. Extra data-* props pass through for our small scripts,
// which restyle a button by changing its data-color and data-variant.
import { Button, ButtonLink } from '@openai/apps-sdk-ui/components/Button';

type Props = {
	label: string;
	href?: string;
	/** solid = the main action on screen; outline = everything else. */
	kind?: 'solid' | 'outline';
	arrow?: 'left' | 'right';
	/** Show only the arrow, in a circle. The label becomes its accessible name. */
	iconOnly?: boolean;
	className?: string;
	[attr: `data-${string}`]: unknown;
};

const Arrow = ({ left }: { left?: boolean }) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d={left ? 'M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' : 'M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'} />
	</svg>
);

export default function Btn({ label, href, kind = 'solid', arrow, iconOnly = false, ...rest }: Props) {
	const look = {
		color: kind === 'solid' ? 'primary' : 'secondary',
		variant: kind,
		size: 'xl',
		...(iconOnly ? {} : { gutterSize: 'xl' }),
	} as const;
	const inner = (
		<>
			{arrow === 'left' && <Arrow left />}
			<span data-label>{label}</span>
			{arrow === 'right' && <Arrow />}
		</>
	);
	if (iconOnly) {
		return (
			<Button {...look} uniform aria-label={label} {...rest}>
				<Arrow left={arrow === 'left'} />
			</Button>
		);
	}
	return href ? (
		<ButtonLink {...look} href={href} {...rest}>
			{inner}
		</ButtonLink>
	) : (
		<Button {...look} {...rest}>
			{inner}
		</Button>
	);
}
