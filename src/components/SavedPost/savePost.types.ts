import { Post } from "../CardPost/CardPost.types";
export interface UseSavePost {
  savePosts: Post[];
  setSavePosts: (posts: Post[]) => void;
  loading: boolean;
  error: string | null;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  showModal: boolean;
  setShowModal: (open: boolean) => void;
}
