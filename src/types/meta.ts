// ------------------------------------
// 1. OpenGraph Metadata (Facebook, LinkedIn, general social sharing)
// ------------------------------------
export interface OpenGraphMetadata {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    imageWidth?: string;
    imageHeight?: string;
    type?: string; // e.g., 'website', 'article', 'video'
    url?: string;
    siteName?: string;
    locale?: string;
    video?: string;
    videoType?: string;
    videoWidth?: string;
    videoHeight?: string;
}

// ------------------------------------
// 2. Twitter Metadata (Twitter Cards)
// ------------------------------------
export interface TwitterMetadata {
    card?: string; // e.g., 'summary', 'summary_large_image', 'player'
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    site?: string; // @username of website
    creator?: string; // @username of content creator
    player?: string; // Video URL for player card
    playerWidth?: string;
    playerHeight?: string;
}

// ------------------------------------
// 3. Article Metadata (Specific to article content)
// ------------------------------------
export interface ArticleMetadata {
    author?: string;
    published?: string;
    modified?: string;
    section?: string;
    tags?: string[];
}

// ------------------------------------
// 4. Platform-Specific Metadata
// ------------------------------------
export interface YouTubeMetadata {
    duration?: string;
    channelName?: string;
    viewCount?: string;
    datePublished?: string;
    uploadDate?: string;
    genre?: string;
    paid?: string;
    channelId?: string;
    videoId?: string;
}

export interface LinkedInMetadata {
    title?: string;
    author?: string;
    company?: string;
}

export interface InstagramMetadata {
    authorName?: string;
    authorUrl?: string;
}

export interface FacebookMetadata {
    appId?: string; // Facebook App ID for insights
    pages?: string;
}

// ------------------------------------
// 5. General Metadata (Web-specific, but types are reusable)
// ------------------------------------
export interface GeneralMetadata {
    favicon?: string;
    themeColor?: string;
    canonical?: string;
    keywords?: string;
    author?: string;
    robots?: string;
    viewport?: string;
    generator?: string;
    alternateUrls?: string[];
}

// ------------------------------------
// 6. Root Metadata Interfaces
// ------------------------------------

export interface Metadata {
    title?: string;
    description?: string;
    og?: OpenGraphMetadata;
    twitter?: TwitterMetadata;
    article?: ArticleMetadata;
    youtube?: YouTubeMetadata;
    linkedin?: LinkedInMetadata;
    instagram?: InstagramMetadata;
    facebook?: FacebookMetadata;
    general?: GeneralMetadata;
}
 
export interface IMetaData {
    // This interface enforces that certain fields must be present
    description: string;
    facebook: FacebookMetadata;
    general: GeneralMetadata;
    og: OpenGraphMetadata;
    title: string;
    twitter: TwitterMetadata;
    youtube: YouTubeMetadata;
    // Note: If you don't need 'article', 'linkedin', 'instagram' here, 
    // you should check if they were truly optional in the original code.
    // Based on the provided interface, they are not present here.
}