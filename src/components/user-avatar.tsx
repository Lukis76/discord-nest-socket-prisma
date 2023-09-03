"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib";
import { FC } from "react";

interface UserAvatarProps {
	src: string;
	className?: string;
	// Define prop types here
}

export const UserAvatar: FC<UserAvatarProps> = ({ src, className }) => {
	return (
		<Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
			<AvatarImage src={src} />
		</Avatar>
	);
};
