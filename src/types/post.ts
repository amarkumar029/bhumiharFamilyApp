// ------------------------------------
// 1. IRandomPost: मुख्य फ़ीड या डिस्कवरी सेक्शन के लिए पोस्ट डेटा
// ------------------------------------
export interface IRandomPost {
  id: string;
  userId: string;
  content: string;
  image: string | null; // Main post image URL
  
  // Metadata for linked content (e.g., if the post contains a URL)
  metaImage: string | null;
  metaCaption: string | null;
  socialMediaLinks: string | null;
  
  // Interaction counts
  likesCount: number;
  commentsCount: number;
  
  // Timestamps
  createdAt: string | Date;
  updatedAt: string | Date;
  
  // Author details embedded
  author: {
    id: string;
    fullName: string;
    image: string | null; // Author's profile picture URL
  };
}

// ------------------------------------
// 2. IRecentChat: चैट लिस्ट या होम स्क्रीन पर प्रदर्शित हाल की चैट
// ------------------------------------
export interface IRecentChat {
  chatId: string;
  // Other user's details
  otherUser: {
    id: string;
    fullName: string;
    image: string | null; // Other user's profile picture URL
  };
  // Last message content snippet
  lastMessage: string;
  // Timestamp of the last message
  lastMessageTime: string | null; 
}