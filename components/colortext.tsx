export default function ColorText({color, children}: {color: string, children: React.ReactNode} ){
	return (
		<span style={{ color: color }}>{children}</span>
	);
}