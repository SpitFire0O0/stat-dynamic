import React from "react";
import { 
	Card, 
	CardBody, 
	CardHeader, 
	Heading, 
	Text, 
	Badge, 
	HStack, 
	VStack,
	Grid,
	GridItem,
	Button,
	Progress,
	Box,
	Avatar,
	Divider
} from "@chakra-ui/react";
import { 
	Calendar, 
	BookOpen, 
	MessageCircle, 
	Bell, 
	TrendingUp, 
	Clock, 
	MapPin, 
	User,
	CheckCircle,
	AlertCircle,
	Star
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const HomePage: React.FC = () => {
	const { user } = useAuth();
	
	const upcomingLessons = [
		{
			id: 1,
			subject: "Алгебра",
			teacher: "Иванов А.Д.",
			time: "08:30 - 09:15",
			room: "204",
			type: "Урок"
		},
		{
			id: 2,
			subject: "Физика",
			teacher: "Петров В.С.",
			time: "09:25 - 10:10",
			room: "301",
			type: "Лабораторная"
		},
		{
			id: 3,
			subject: "История",
			teacher: "Сидорова Е.М.",
			time: "10:20 - 11:05",
			room: "105",
			type: "Урок"
		}
	];

	const recentGrades = [
		{ subject: "Алгебра", grade: "5", type: "Контрольная", date: "15.01.2025" },
		{ subject: "Физика", grade: "4", type: "Лабораторная", date: "14.01.2025" },
		{ subject: "История", grade: "5", type: "Доклад", date: "13.01.2025" }
	];

	const homework = [
		{ subject: "Алгебра", task: "№15-20 стр. 45", due: "16.01.2025", status: "pending" },
		{ subject: "Физика", task: "Лабораторная работа №3", due: "17.01.2025", status: "completed" },
		{ subject: "Химия", task: "Подготовить доклад", due: "18.01.2025", status: "pending" }
	];

	const notifications = [
		{ id: 1, text: "Новое домашнее задание по алгебре", time: "5 мин назад", type: "homework" },
		{ id: 2, text: "Оценка за контрольную работу", time: "1 час назад", type: "grade" },
		{ id: 3, text: "Изменение в расписании", time: "2 часа назад", type: "schedule" }
	];

	const stats = [
		{ label: "Средний балл", value: 4.6, icon: Star, color: "green" },
		{ label: "Посещаемость", value: 95, icon: CheckCircle, color: "blue" },
		{ label: "Домашние задания", value: 87, icon: BookOpen, color: "orange" },
		{ label: "Контрольные работы", value: 92, icon: TrendingUp, color: "purple" }
	];

	return (
		<div className="p-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[var(--primary-color)]">
					Добро пожаловать, {user?.firstName || 'Пользователь'}!
				</h1>
				<p className="text-gray-600">Вот что происходит сегодня</p>
			</div>

			{/* Статистика */}
			<Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
				{stats.map((stat, index) => (
					<Card key={index}>
						<CardBody>
							<HStack spacing={4}>
								<Box
									w={12}
									h={12}
									bg={`${stat.color}.100`}
									borderRadius="lg"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<stat.icon size={24} className={`text-${stat.color}-600`} />
								</Box>
								<VStack align="start" spacing={1}>
									<Text fontSize="2xl" fontWeight="bold">
										{stat.value}{stat.label === "Средний балл" ? "" : "%"}
									</Text>
									<Text fontSize="sm" color="gray.600">
										{stat.label}
									</Text>
								</VStack>
							</HStack>
						</CardBody>
					</Card>
				))}
			</Grid>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Ближайшие занятия */}
				<Card>
					<CardHeader>
						<HStack>
							<Calendar size={20} className="text-[var(--primary-color)]" />
							<Heading size="md">Ближайшие занятия</Heading>
						</HStack>
					</CardHeader>
					<CardBody>
						<VStack spacing={4} align="stretch">
							{upcomingLessons.map(lesson => (
								<Box
									key={lesson.id}
									p={4}
									border="1px solid"
									borderColor="gray.200"
									borderRadius="md"
									_hover={{ bg: "gray.50" }}
								>
									<HStack justify="space-between">
										<VStack align="start" spacing={1}>
											<HStack spacing={2}>
												<Text fontWeight="semibold">{lesson.subject}</Text>
												<Badge colorScheme="blue" size="sm">
													{lesson.type}
												</Badge>
											</HStack>
											<HStack spacing={4} fontSize="sm" color="gray.600">
												<HStack spacing={1}>
													<User size={14} />
													<span>{lesson.teacher}</span>
												</HStack>
												<HStack spacing={1}>
													<MapPin size={14} />
													<span>каб. {lesson.room}</span>
												</HStack>
											</HStack>
										</VStack>
										<VStack align="end" spacing={1}>
											<Text fontWeight="semibold" fontSize="sm">
												{lesson.time}
											</Text>
											<Text fontSize="xs" color="gray.500">
												Сегодня
											</Text>
										</VStack>
									</HStack>
								</Box>
							))}
						</VStack>
					</CardBody>
				</Card>

				{/* Последние оценки */}
				<Card>
					<CardHeader>
						<HStack>
							<Star size={20} className="text-[var(--primary-color)]" />
							<Heading size="md">Последние оценки</Heading>
						</HStack>
					</CardHeader>
					<CardBody>
						<VStack spacing={4} align="stretch">
							{recentGrades.map((grade, index) => (
								<HStack key={index} justify="space-between" p={3} bg="gray.50" borderRadius="md">
									<VStack align="start" spacing={1}>
										<Text fontWeight="semibold">{grade.subject}</Text>
										<Text fontSize="sm" color="gray.600">{grade.type}</Text>
									</VStack>
									<VStack align="end" spacing={1}>
										<Badge 
											colorScheme={grade.grade === "5" ? "green" : grade.grade === "4" ? "blue" : "orange"}
											size="lg"
										>
											{grade.grade}
										</Badge>
										<Text fontSize="xs" color="gray.500">{grade.date}</Text>
									</VStack>
								</HStack>
							))}
						</VStack>
					</CardBody>
				</Card>

				{/* Домашние задания */}
				<Card>
					<CardHeader>
						<HStack>
							<BookOpen size={20} className="text-[var(--primary-color)]" />
							<Heading size="md">Домашние задания</Heading>
						</HStack>
					</CardHeader>
					<CardBody>
						<VStack spacing={4} align="stretch">
							{homework.map((task, index) => (
								<Box
									key={index}
									p={4}
									border="1px solid"
									borderColor={task.status === "completed" ? "green.200" : "orange.200"}
									borderRadius="md"
									bg={task.status === "completed" ? "green.50" : "orange.50"}
								>
									<HStack justify="space-between">
										<VStack align="start" spacing={1}>
											<HStack spacing={2}>
												<Text fontWeight="semibold">{task.subject}</Text>
												{task.status === "completed" ? (
													<CheckCircle size={16} className="text-green-600" />
												) : (
													<AlertCircle size={16} className="text-orange-600" />
												)}
											</HStack>
											<Text fontSize="sm">{task.task}</Text>
										</VStack>
										<VStack align="end" spacing={1}>
											<Text fontSize="sm" fontWeight="semibold">
												Сдать до: {task.due}
											</Text>
											<Badge 
												colorScheme={task.status === "completed" ? "green" : "orange"}
												size="sm"
											>
												{task.status === "completed" ? "Выполнено" : "В работе"}
											</Badge>
										</VStack>
									</HStack>
								</Box>
							))}
						</VStack>
					</CardBody>
				</Card>

				{/* Уведомления */}
				<Card>
					<CardHeader>
						<HStack>
							<Bell size={20} className="text-[var(--primary-color)]" />
							<Heading size="md">Уведомления</Heading>
						</HStack>
					</CardHeader>
					<CardBody>
						<VStack spacing={4} align="stretch">
							{notifications.map(notification => (
								<Box
									key={notification.id}
									p={3}
									border="1px solid"
									borderColor="gray.200"
									borderRadius="md"
									cursor="pointer"
									_hover={{ bg: "gray.50" }}
								>
									<HStack justify="space-between">
										<VStack align="start" spacing={1}>
											<Text fontSize="sm">{notification.text}</Text>
											<Text fontSize="xs" color="gray.500">
												{notification.time}
											</Text>
										</VStack>
										<Badge 
											colorScheme={
												notification.type === "homework" ? "orange" :
												notification.type === "grade" ? "green" : "blue"
											}
											size="sm"
										>
											{notification.type === "homework" ? "ДЗ" :
											 notification.type === "grade" ? "Оценка" : "Расписание"}
										</Badge>
									</HStack>
								</Box>
							))}
						</VStack>
					</CardBody>
				</Card>
			</div>

			{/* Быстрые действия */}
			<Card>
				<CardHeader>
					<Heading size="md">Быстрые действия</Heading>
				</CardHeader>
				<CardBody>
					<Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
						<Button
							leftIcon={<Calendar size={16} />}
							colorScheme="blue"
							variant="outline"
							size="lg"
							onClick={() => window.location.href = '/schedule'}
						>
							Посмотреть расписание
						</Button>
						<Button
							leftIcon={<BookOpen size={16} />}
							colorScheme="green"
							variant="outline"
							size="lg"
							onClick={() => window.location.href = '/docs'}
						>
							Библиотека
						</Button>
						<Button
							leftIcon={<MessageCircle size={16} />}
							colorScheme="purple"
							variant="outline"
							size="lg"
							onClick={() => window.location.href = '/profile'}
						>
							Профиль и сообщения
						</Button>
						<Button
							leftIcon={<User size={16} />}
							colorScheme="orange"
							variant="outline"
							size="lg"
							onClick={() => window.location.href = '/settings'}
						>
							Настройки
						</Button>
					</Grid>
				</CardBody>
			</Card>
		</div>
	);
};
