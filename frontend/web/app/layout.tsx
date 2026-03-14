import type { ReactNode } from "react";
import Providers from "./providers";
import { ChatWidget } from "@organisms";

type RootLayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<Providers>{children}</Providers>
				<ChatWidget />
			</body>
		</html>
	);
}
