export interface FollowetsType {
  users: UserRequest[];
  sendFriendRequest: (userId: string) => Promise<void>;
}
export interface UserRequest {
  _id: string;
  display_name: string;
  avatar_url?: string;
}
