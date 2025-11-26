// ------------------------------------
// 1. ICreatedMessage: सर्वर से प्राप्त एक एकल संदेश (या जब संदेश बनाया जाता है)
// ------------------------------------
export interface ICreatedMessage {
  id: string;
  isRead: boolean;
  senderId: string;
  receiverId: string;
  chatId: string;
  content: string;
  createdAt: string | Date;
}

// ------------------------------------
// 2. IActiveChat: मुख्य चैट सूची में प्रदर्शित होने वाली प्रत्येक चैट (conversation)
// ------------------------------------
export interface IActiveChat {
  chatId: string;
  user: {
    id: string;
    fullName: string;
    image: string | null; // Profile picture URL
  };
  lastMessage: string;
  lastMessageTime: string | Date;
}

// ------------------------------------
// 3. IChatMessages: विस्तृत चैट व्यू के लिए संदेशों की इंटरफ़ेस
// ------------------------------------
export interface IChatMessages {
  id: string;
  content: string;
  isRead: boolean;
  chatId: string;
  senderId: string;
  receiverId: string;
  // Sender और Receiver objects को सीधे message payload में शामिल किया गया है
  sender: {
    id: string;
    fullName: string;
    image: string | null;
  };
  receiver?: {
    id: string;
    fullName: string;
    image: string | null;
  };
  createdAt: string | Date;
  updatedAt?: string | Date;
}

// ------------------------------------
// 4. SendMessagePayload: API को संदेश भेजने के लिए आवश्यक डेटा
// ------------------------------------
export interface SendMessagePayload {
  receiverId: string;
  content: string;
}