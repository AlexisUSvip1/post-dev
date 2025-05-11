import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import {
  clearPostContent,
  closeModal,
  openModal,
  setPostContent,
} from "../../../../features/Post/postSlice";

export const usePostModal = () => {
  const dispatch = useDispatch();

  const { openPostModal, postContent } = useSelector(
    (state: RootState) => state.post
  );

  const handleOpenModal = () => dispatch(openModal());
  const handleCloseModal = () => dispatch(closeModal());
  const handleSetPostContent = (content: string) =>
    dispatch(setPostContent(content));
  const handleClearPostContent = () => dispatch(clearPostContent());

  return {
    openPostModal,
    postContent,
    handleOpenModal,
    handleCloseModal,
    handleSetPostContent,
    handleClearPostContent,
  };
};
