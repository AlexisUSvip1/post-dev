import { Dispatch, SetStateAction } from 'react';

export interface Post {
  _id: string;
  title: string;
  body: string;
  type: string;  
  user_id: string;
  user_avatar: string;
  usernameUser: string;
  created_at: string;
  media: { url: string; type: string }[];
  loading: boolean;
  error: string | null;
  viewPost: boolean;
  setViewPost: boolean;
  total_likes: number;
  likedBy?: string[];
  savedPost?: boolean;
  tags: string[];
}

export interface UseNewPostHook {
  posts: Post[];
  loading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
  likedPosts: { [key: string]: boolean };
  savedPosts: { [key: string]: boolean };
  handleLikePost: (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => Promise<void>;
  handleOpenCommentModal: (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string,
    open: boolean
  ) => void;
  handleSavePost: (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => Promise<void>;
  showModal: boolean;
  postId: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setOpenCommentsPost: Dispatch<SetStateAction<boolean>>;
  openCommentsPost: boolean;
  addTags: string;
  currentIndex: number
  handlePrevClick: () => void 
  handleNextClick: () => void
  handleTechSelect: (tech: string) => void
  selectedTechs: string[]
  setAddTags: Dispatch<SetStateAction<string>>;
}
