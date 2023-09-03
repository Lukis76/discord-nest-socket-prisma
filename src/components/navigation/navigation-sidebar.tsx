import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import { NavigationAction } from "./navigation-action";
import { Separator, ScrollArea } from "@/components/ui";
import { NavigationItem } from "./navigation-item";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "../swich-theme";

interface NavigationSidebarProps {
	// Define prop types here
}

export const NavigationSidebar: FC<NavigationSidebarProps> = async () => {
	const profile = await currentProfile();
	if (!profile) {
		return redirect("/");
	}

	const servers = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	return (
		<div className="space-y-4 flex flex-col items-center h-screen text-primary w-full dark:bg-[#1E1F22] py-3">
			<NavigationAction />
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
			<ScrollArea className=" flex-1 w-full ">
				{servers.map((server) => {
					return (
						<div key={server.id} className="mb-4">
							<NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
						</div>
					);
				})}
			</ScrollArea>
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
			<div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
				<ThemeSwitcher />
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: "h-12 w-12 rounded-full",
						},
					}}
				/>
			</div>
		</div>
	);
};
