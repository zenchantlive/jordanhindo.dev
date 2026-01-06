export interface HashnodePost {
    _id: string;
    title: string;
    slug: string;
    contentMarkdown: string;
    content?: string;
    dateAdded: string;
    brief: string;
    coverImage?: string;
    readTime: number;
    tags: string[];
    series?: string;
}

export interface BlogSeries {
    id: string;
    title: string;
    description: string;
    itemCount: number;
    lastUpdated: string;
    slug: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
    description: string;
    coverImage?: string;
    readingTime: number;
    tags: string[];
    part?: number;
}
