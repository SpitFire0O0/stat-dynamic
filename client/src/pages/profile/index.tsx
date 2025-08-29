import React from "react";
import module from "./profile.module.css";
import {Avatar, Badge, Progress} from "@chakra-ui/react";
import {HorizontalSep} from "../../components/decors";
import {Trophy, BookOpen, Calendar, MessageCircle, Phone, Mail, MapPin, Award} from "lucide-react";

export const ProfilePage: React.FC = () => {
	const achievements = [
		{ id: 1, title: "Олимпиада по математике", description: "1 место в городской олимпиаде", grade: 95, date: "2024" },
		{ id: 2, title: "Конкурс программирования", description: "2 место в региональном конкурсе", grade: 88, date: "2024" },
		{ id: 3, title: "Научная конференция", description: "Лучший доклад на конференции", grade: 92, date: "2023" },
	];

	const contacts = [
		{ type: "Telegram", value: "@alexandrov_d", icon: MessageCircle },
		{ type: "Discord", value: "alexandrov#1234", icon: MessageCircle },
		{ type: "VK", value: "vk.com/alexandrov", icon: MessageCircle },
	];

	const stats = [
		{ label: "Посещаемость", value: 95, color: "green" },
		{ label: "Средний балл", value: 4.8, color: "blue" },
		{ label: "Домашние задания", value: 87, color: "orange" },
	];

	return (
		<div className={module.Container}>
			<div className={module.HeaderContainer}>
				<div className={module.Header}>
					<div className={module.MainInfo}>
						<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' width={150} height={150} />
						<div className="mt-[48px] leading-5 flex flex-col gap-2">
							<div className="
								bg-[var(--primary-color)] w-fit py-0.5 px-2 rounded-sm cursor-pointer
								font-[500] uppercase tracking-[2px] text-[var(--light-color)] text-[10px]
							">Студент
							</div>
						</div>
					</div>
					<div className="flex flex-col ml-[170px] py-[10px] px-[20px] leading-5">
						<div>
							<div className="text-[var(--primary-color)] font-[800] text-[22px]">
								Александров Дмитрий
							</div>
							<div className="text-[#aaa] font-[800] text-[14px]">10Б</div>
						</div>
						<HorizontalSep className={"mt-[10px]"}/>
						<table className={module.HeaderInfo}>
							<tr>
								<td><Phone size={14} /> телефон</td>
								<td>+7 (928) 738-32-12</td>
							</tr>
							<tr>
								<td><Mail size={14} /> почта</td>
								<td>alexandrov.d@example.com</td>
							</tr>
							<tr>
								<td><MapPin size={14} /> адрес</td>
								<td>Россия, г. Москва, ул. Ленина, д. 17, кв. 43</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-4">
				{/* Статистика */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h2 className="text-lg font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
						<Award size={22} />
						Статистика
					</h2>
					<div className="space-y-4">
						{stats.map((stat, index) => (
							<div key={index}>
								<div className="flex justify-between text-sm mb-1">
									<span>{stat.label}</span>
									<span className="font-semibold">{stat.value}%</span>
								</div>
								<Progress value={stat.value} colorScheme={stat.color} size="sm" />
							</div>
						))}
					</div>
				</div>

				{/* Контакты */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h2 className="text-lg font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
						<MessageCircle size={20} />
						Контакты
					</h2>
					<div className="space-y-3">
						{contacts.map((contact, index) => (
							<div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
								<contact.icon size={16} className="text-[var(--primary-color)]" />
								<div>
									<div className="text-xs text-gray-500">{contact.type}</div>
									<div className="text-sm font-medium">{contact.value}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Достижения */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h2 className="text-lg font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
						<Trophy size={20} />
						Достижения
					</h2>
					<div className="space-y-3">
						{achievements.map((achievement) => (
							<div key={achievement.id} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border-l-4 border-[var(--primary-color)]">
								<div className="flex justify-between items-start mb-1">
									<h3 className="font-semibold text-sm">{achievement.title}</h3>
									<Badge colorScheme="green" variant="subtle" fontSize="xs">
										{achievement.grade}%
									</Badge>
								</div>
								<p className="text-xs text-gray-600 mb-1">{achievement.description}</p>
								<span className="text-xs text-gray-500">{achievement.date}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
