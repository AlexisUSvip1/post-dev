export interface Post {
  _id: string;
  title: string;
  body: string;
  user_id: string;
  user_avatar: string;
  usernameUser: string;
  created_at: string;
  media: { url: string; type: string }[];
  loading: boolean;
  error: string | null;
  viewPost: boolean;
  setViewPost: boolean;
}

export interface UseNewPostHook {
  posts: Post[];
  loading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
}
