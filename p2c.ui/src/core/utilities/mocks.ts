import { faker } from "@faker-js/faker";

const generateNigeriaPhoneNumber = (): string => {
  const prefix = faker.helpers.arrayElement([
    "701",
    "702",
    "703",
    "704",
    "705",
    "706",
    "707",
    "708",
    "709",
    "802",
    "803",
    "804",
    "805",
    "806",
    "807",
    "808",
    "809",
    "810",
    "811",
  ]);
  const middle = faker.string.numeric(3); // Random 3 digits
  const last = faker.string.numeric(4); // Random 4 digits
  return `0${prefix}${middle}${last}`;
};

export const fakeUser = (): User => {
  return {
    userId: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: generateNigeriaPhoneNumber(),
    lastSeen: faker.date.recent().toISOString(),
    isOnline: faker.datatype.boolean(),
  };
};

export const generateFakeUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => fakeUser());
};

// Generate fake messages with optional senderUserId
const generateFakeMessages = (
  user1Id: string,
  user2Id: string,
  count: number,
): Message[] => {
  const messages: Message[] = [];
  for (let i = 0; i < count; i++) {
    // Determine sender and receiver
    const sender = faker.helpers.arrayElement([user1Id, user2Id]);
    const receiver = sender === user1Id ? user2Id : user1Id;

    messages.push({
      messageId: faker.string.uuid(),
      senderUserId: sender,
      receiverUserId: receiver,
      content: faker.lorem.sentence(),
      timestamp: faker.date.recent().toISOString(),
      isRead: faker.datatype.boolean(),
      isEncrypted: faker.datatype.boolean(),
      encryptionKey: faker.datatype.boolean() ? faker.string.uuid() : undefined,
    });
  }
  return messages;
};

export const generateFakeChat = (
  user1Id?: string,
  user2Id?: string,
  count?: number,
): Chat => {
  // Generate random user IDs if not provided
  const user1 = user1Id || faker.string.uuid();
  const user2 = user2Id || faker.string.uuid();

  // Generate messages
  const messages = generateFakeMessages(user1, user2, count!);

  return {
    chatId: faker.string.uuid(),
    user1Id: user1,
    user2Id: user2,
    messages,
    lastMessageTimestamp: messages[messages.length - 1].timestamp,
    isActive: faker.datatype.boolean(),
  };
};
