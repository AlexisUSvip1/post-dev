import { useState } from "react";
import { usePostModal } from "../Navbar/NavbarTop/NavbarTop.hooks";

export const usePostHook = () => {
  const [localContent, setLocalContent] = useState<string>("");
  const { handleCloseModal, handleSetPostContent } = usePostModal();

  const handleSubmit = (): void => {
    handleSetPostContent(localContent);
    handleCloseModal();
    setLocalContent("");
  };

  return {
    localContent,
    setLocalContent,
    handleSubmit,
  };
};
