"use client";

import * as z from "zod";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
	Input,
	Button,
	FormItem,
} from "@/components/ui";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";

interface InitialModalProps {
	// Define prop types here
}

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Server name is required",
	}),
	imageUrl: z.string().min(1, {
		message: " Server image is required",
	}),
});

type FormType = z.infer<typeof formSchema>;

export const InitialModal: FC<InitialModalProps> = () => {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			imageUrl: "",
		},
	});

	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (values: FormType) => {
		try {
			await axios.post("/api/servers", values);

			form.reset();
			router.refresh();
			window.location.reload();
		} catch (error) {
			console.log("Error on submit created server =>", error);
		}
	};

	if (!isMounted) {
		return null;
	}

	return (
		<Dialog open={isMounted}>
			<DialogContent className="bg-[#f5f5f5] text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Customize your server
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						Give your server a personality with a name and an image. You can always change it later.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-8 px-6">
							<div className="flex items-center justify-center text-center">
								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint="serverImage"
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
											Server name
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
												placeholder="Enter server name"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="bg-gray-100 px-6 py-4">
							<Button variant={"primary"} disabled={isLoading}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
