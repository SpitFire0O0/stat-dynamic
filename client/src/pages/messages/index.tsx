import React, { useState } from "react";
import { 
	Card, 
	CardBody, 
	CardHeader, 
	Heading, 
	Text, 
	Badge, 
	HStack, 
	VStack,
	Input,
	Button,
	Avatar,
	Box,
	Divider,
	Flex,
	InputGroup,
	InputRightElement,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Select,
	Textarea,
	FormControl
} from "@chakra-ui/react";
import { 
	Send, 
	Search, 
	User, 
	MessageCircle, 
	MoreVertical, 
	Phone, 
	Video, 
	Paperclip,
	Smile,
	Edit,
	Trash2
} from "lucide-react";

interface Message {
	id: number;
	text: string;
	sender: string;
	timestamp: Date;
	isOwn: boolean;
}

interface Contact {
	id: number;
	name: string;
	avatar: string;
	lastMessage: string;
	lastMessageTime: Date;
	unreadCount: number;
	status: 'online' | 'offline' | 'away';
	role: string;
}

export const MessagesPage: React.FC = () => {
	const [messageText, setMessageText] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newMessageText, setNewMessageText] = useState("");

	const contacts: Contact[] = [
		{
			id: 1,
			name: "Иванов А.Д.",
			avatar: "https://bit.ly/dan-abramov",
			lastMessage: "Доброе утро! Как дела с домашним заданием?",
			lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
			unreadCount: 2,
			status: 'online',
			role: 'Преподаватель математики'
		},
		{
			id: 2,
			name: "Петров В.С.",
			avatar: "https://bit.ly/ryan-florence",
			lastMessage: "Лабораторная работа готова",
			lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
			unreadCount: 0,
			status: 'away',
			role: 'Преподаватель физики'
		},
		{
			id: 3,
			name: "Сидорова Е.М.",
			avatar: "https://bit.ly/prosper-baba",
			lastMessage: "Отличная работа на контрольной!",
			lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
			unreadCount: 1,
			status: 'offline',
			role: 'Преподаватель истории'
		},
		{
			id: 4,
			name: "Козлов И.П.",
			avatar: "https://bit.ly/code-beast",
			lastMessage: "Подготовьтесь к завтрашнему уроку",
			lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 дня назад
			unreadCount: 0,
			status: 'offline',
			role: 'Преподаватель химии'
		}
	];
	const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);


	const messages: Message[] = [
		{
			id: 1,
			text: "Доброе утро! Как дела с домашним заданием?",
			sender: "Иванов А.Д.",
			timestamp: new Date(Date.now() - 1000 * 60 * 30),
			isOwn: false
		},
		{
			id: 2,
			text: "Доброе утро! Почти закончил, осталось решить последние 2 задачи",
			sender: "Вы",
			timestamp: new Date(Date.now() - 1000 * 60 * 25),
			isOwn: true
		},
		{
			id: 3,
			text: "Отлично! Если будут вопросы, обращайтесь",
			sender: "Иванов А.Д.",
			timestamp: new Date(Date.now() - 1000 * 60 * 20),
			isOwn: false
		},
		{
			id: 4,
			text: "Спасибо! Обязательно",
			sender: "Вы",
			timestamp: new Date(Date.now() - 1000 * 60 * 15),
			isOwn: true
		}
	];

	const filteredContacts = contacts.filter(contact =>
		contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		contact.role.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSendMessage = () => {
		if (messageText.trim() && selectedContact) {
			// Здесь будет логика отправки сообщения
			console.log('Отправка сообщения:', messageText);
			setMessageText("");
		}
	};

	const handleContactSelect = (contact: Contact) => {
		setSelectedContact(contact);
	};

	const formatTime = (date: Date) => {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / (1000 * 60));
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (minutes < 60) return `${minutes} мин`;
		if (hours < 24) return `${hours} ч`;
		return `${days} дн`;
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'online': return 'green';
			case 'away': return 'yellow';
			case 'offline': return 'gray';
			default: return 'gray';
		}
	};

	return (
		<div className="h-full flex gap-4">
			{/* Список контактов */}
			<div className="w-80 border-r border-gray-200 flex flex-col">
				<Card>
					<CardHeader pb={4}>
						<HStack justify="space-between">
							<Heading size="md">Сообщения</Heading>
							<Button size="sm" variant="ghost" onClick={onOpen}>
								<MessageCircle size={16} />
							</Button>
						</HStack>
						<InputGroup mt={4}>
							<Input
								placeholder="Поиск контактов..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<InputRightElement>
								<Search size={16} className="text-gray-400" />
							</InputRightElement>
						</InputGroup>
					</CardHeader>

					<CardBody pt={0} flex={1} overflowY="auto">
					<VStack spacing={2} align="stretch">
						{filteredContacts.map(contact => (
							<Box
								key={contact.id}
								p={3}
								borderRadius="md"
								cursor="pointer"
								bg={selectedContact?.id === contact.id ? "blue.50" : "transparent"}
								border={selectedContact?.id === contact.id ? "1px solid" : "1px solid transparent"}
								borderColor={selectedContact?.id === contact.id ? "blue.200" : "transparent"}
								onClick={() => handleContactSelect(contact)}
								_hover={{ bg: "gray.50" }}
							>
								<HStack spacing={3}>
									<Box position="relative">
										<Avatar size="md" src={contact.avatar} name={contact.name} />
										<Box
											position="absolute"
											bottom="0"
											right="0"
											w={3}
											h={3}
											bg={getStatusColor(contact.status)}
											borderRadius="full"
											border="2px solid white"
										/>
									</Box>
									<VStack align="start" spacing={1} flex={1} minW={0}>
										<HStack justify="space-between" w="full">
											<Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
												{contact.name}
											</Text>
											<Text fontSize="xs" color="gray.500">
												{formatTime(contact.lastMessageTime)}
											</Text>
										</HStack>
										<Text fontSize="xs" color="gray.600" noOfLines={1}>
											{contact.role}
										</Text>
										<Text fontSize="sm" color="gray.600" noOfLines={1}>
											{contact.lastMessage}
										</Text>
									</VStack>
									{contact.unreadCount > 0 && (
										<Badge colorScheme="blue" borderRadius="full" minW={5} h={5} display="flex" alignItems="center" justifyContent="center">
											{contact.unreadCount}
										</Badge>
									)}
								</HStack>
							</Box>
						))}
					</VStack>
				</CardBody>
				</Card>
			</div>

			{/* Чат */}
			<div className="flex-1 flex flex-col">
				{selectedContact ? (
					<>
						<Card>
							{/* Заголовок чата */}
							<CardHeader pb={4}>
								<HStack justify="space-between">
									<HStack spacing={3}>
										<Box position="relative">
											<Avatar size="md" src={selectedContact.avatar} name={selectedContact.name} />
											<Box
												position="absolute"
												bottom="0"
												right="0"
												w={3}
												h={3}
												bg={getStatusColor(selectedContact.status)}
												borderRadius="full"
												border="2px solid white"
											/>
										</Box>
										<VStack align="start" spacing={0}>
											<Text fontWeight="semibold">{selectedContact.name}</Text>
											<Text fontSize="sm" color="gray.600">{selectedContact.role}</Text>
										</VStack>
									</HStack>
									<HStack spacing={2}>
										<Button size="sm" variant="ghost">
											<Phone size={16} />
										</Button>
										<Button size="sm" variant="ghost">
											<Video size={16} />
										</Button>
										<Button size="sm" variant="ghost">
											<MoreVertical size={16} />
										</Button>
									</HStack>
								</HStack>
							</CardHeader>

							{/* Сообщения */}
							<CardBody flex={1} overflowY="auto" pt={0}>
							<VStack spacing={4} align="stretch">
								{messages.map(message => (
									<Box
										key={message.id}
										alignSelf={message.isOwn ? "flex-end" : "flex-start"}
										maxW="70%"
									>
										<Box
											bg={message.isOwn ? "blue.500" : "gray.100"}
											color={message.isOwn ? "white" : "black"}
											p={3}
											borderRadius="lg"
											borderBottomRightRadius={message.isOwn ? "sm" : "lg"}
											borderBottomLeftRadius={message.isOwn ? "lg" : "sm"}
										>
											<Text fontSize="sm">{message.text}</Text>
										</Box>
										<Text fontSize="xs" color="gray.500" mt={1} textAlign={message.isOwn ? "right" : "left"}>
											{message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
										</Text>
									</Box>
								))}
							</VStack>
						</CardBody>
						</Card>

						{/* Поле ввода */}
						<Card mt={4}>
							<CardBody pt={4}>
								<HStack spacing={3}>
									<Button size="sm" variant="ghost">
										<Paperclip size={16} />
									</Button>
									<Input
										placeholder="Введите сообщение..."
										value={messageText}
										onChange={(e) => setMessageText(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
									/>
									<Button size="sm" variant="ghost">
										<Smile size={16} />
									</Button>
									<Button
										colorScheme="blue"
										onClick={handleSendMessage}
										isDisabled={!messageText.trim()}
									>
										<Send size={16} />
									</Button>
								</HStack>
							</CardBody>
						</Card>
					</>
				) : (
					/* Пустое состояние */
					<div className="flex-1 flex items-center justify-center">
						<VStack spacing={4}>
							<MessageCircle size={64} className="text-gray-300" />
							<Text fontSize="lg" color="gray.500">Выберите контакт для начала чата</Text>
						</VStack>
					</div>
				)}
			</div>

			{/* Модальное окно нового сообщения */}
			<Modal isOpen={isOpen} onClose={onClose} size="md">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Новое сообщение</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<VStack spacing={4}>
							<FormControl>
								<Text mb={2} fontWeight="semibold">Кому:</Text>
								<Select placeholder="Выберите получателя">
									{contacts.map(contact => (
										<option key={contact.id} value={contact.id}>
											{contact.name} - {contact.role}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<Text mb={2} fontWeight="semibold">Сообщение:</Text>
								<Textarea
									placeholder="Введите текст сообщения..."
									value={newMessageText}
									onChange={(e) => setNewMessageText(e.target.value)}
									rows={4}
								/>
							</FormControl>
							<HStack spacing={3} w="full">
								<Button variant="outline" flex={1} onClick={onClose}>
									Отмена
								</Button>
								<Button colorScheme="blue" flex={1} isDisabled={!newMessageText.trim()}>
									Отправить
								</Button>
							</HStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};
