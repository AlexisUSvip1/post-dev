import { useEffect, useState } from "react";
import { usePostModal } from "../Navbar/NavbarTop/NavbarTop.hooks";
import { validateTextLength } from "./Post.utils";

export const usePostHook = () => {
  const [localContent, setLocalContent] = useState<string>("");
  const [textContent, setTextContentState] = useState<string>("");
  const { handleCloseModal, handleSetPostContent } = usePostModal();
  const setTextContent = (text: string) => {
    setTextContentState(text);
  };

  const techOptions = [
    "React",
    "Backend",
    "Frontend",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "C++",
    "Java",
    "PHP",
    "Ruby",
    "Swift",
    "Go",
    "Rust",
    "Angular",
    "Vue.js",
    "SQL",
  ];
  
  const handleSubmit = (): void => {
    handleSetPostContent(localContent);
    handleCloseModal();
    setLocalContent("");
    setTextContent("");
  };

  useEffect(() => {
    setTextContentState(validateTextLength(textContent));
  }, [textContent]);

  return {
    localContent,
    setLocalContent,
    setTextContent,
    textContent,
    handleSubmit,
    techOptions,
  };
};