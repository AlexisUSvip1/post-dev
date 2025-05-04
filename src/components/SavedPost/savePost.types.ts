import { Post } from "../CardPost/CardPost.types";

export interface UseSavePost {
  savePosts: Post[];
  setSavePosts: (posts: Post[]) => void;
  loading: boolean;
  error: string | null;
  setGetPostId: (posts: Post[]) => void;
  selectedPost: Post;
  getPostId: Post[];
  handleSetPostId: (post: Post) => void;
}
