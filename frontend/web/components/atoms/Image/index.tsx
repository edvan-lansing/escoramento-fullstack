import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export default function Image(props: ImageProps) {
	return <img {...props} style={{ display: "block", width: "100%", height: "auto" }} />;
}
