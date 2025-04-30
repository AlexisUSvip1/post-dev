export interface SavePost {
  title: string;
  body: string;
  user_id: string;
  user_avatar: string;
  usernameUser: string;
  status: "draft" | "published";
  total_likes: number;
  savePost: boolean;
  media: any[];
  tags: string[];
  created_at: string;
}

export interface UseSavePost {
  savePosts: SavePost[];
  setSavePosts: (posts: SavePost[]) => void;
}
