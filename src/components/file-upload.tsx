"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
	onChange: (url?: string) => void;
	value: string;
	endpoint: "messageFile" | "serverImage";
	// Define prop types here
}

export const FileUpload: FC<FileUploadProps> = ({ endpoint, onChange, value }) => {
	const fileType = value?.split(".").pop();

	if (value && fileType !== "pdf") {
		return (
			<div className="relative h-20 w-20">
				<Image fill src={value} alt="Upload" className="rounded-full" />
				<button
					onClick={() => {
						onChange("");
					}}
					className="bg-rose-500 text-white p-1 rounded-full  absolute top-0 right-0 shadow-md"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url);
			}}
			onUploadError={(error: Error) => {
				console.log("Error upload drop zone => ", error);
			}}
		/>
	);
};
