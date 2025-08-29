import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { ProfileBarBtn } from "./profile-bar-btn";
import { useSidebarStatus } from "../../../store/sidebar-status.slice";

export const ProfileBar: React.FC = () => {
	const { user, logout, isLogoutLoading } = useAuth();
	const { isMinimalistic } = useSidebarStatus();

	if (!user) return null;

	return (
		<div className="flex flex-col gap-2 p-4 border-t border-[var(--second-light-color)]">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-semibold">
					{user.firstName.charAt(0)}{user.lastName.charAt(0)}
				</div>
				{!isMinimalistic && (
					<div className="flex flex-col">
						<span className="text-sm font-medium text-[var(--primary-color)]">
							{user.firstName} {user.lastName}
						</span>
						<span className="text-xs text-gray-500 capitalize">
							{user.permissions.toLowerCase()}
						</span>
					</div>
				)}
			</div>
			
			{!isMinimalistic && (
				<ProfileBarBtn
					onClick={logout}
					isLoading={isLogoutLoading}
					text="Выйти"
					variant="danger"
				/>
			)}
		</div>
	);
};