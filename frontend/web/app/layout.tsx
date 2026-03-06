import type { ReactNode } from "react";
import Providers from "./providers";
import { ChatWidget } from "@organisms";
import { roboto } from "../styles/fonts";

type RootLayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="pt" className={roboto.variable} suppressHydrationWarning>
			<body suppressHydrationWarning>
				<Providers>{children}</Providers>
				<ChatWidget />
			</body>
		</html>
	);
}
