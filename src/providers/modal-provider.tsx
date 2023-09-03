"use client";

import { FC, useEffect, useState } from "react";
import { CreateServerModal, InviteModal, EditServerModal, MembersModal } from "@/components/modals";

interface ModalProviderProps {
	// Define prop types here
}

export const ModalProvider: FC<ModalProviderProps> = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<CreateServerModal />
			<InviteModal />
			<EditServerModal />
			<MembersModal />
		</>
	);
};
