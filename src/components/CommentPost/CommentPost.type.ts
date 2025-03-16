import { Dispatch, SetStateAction } from "react";

export interface useReplayHook {
  user_id: string;
  body: string;
  comment_id: string;
  timestamps: number;
}
export interface UseCommentsHook {
  user_id: string;
  body: string;
  post_id: string;
  timestamps: number;
  replay: useReplayHook[];
  setResponseComment: Dispatch<SetStateAction<string>>;
  getCommentsPost: () => Promise<void>;
  postNewComment: () => Promise<void>;
}
