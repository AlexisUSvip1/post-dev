import { useState } from "react";
import { usePostModal } from "../Navbar/NavbarTop/NavbarTop.hooks";

export const usePostHook = () => {
  const [localContent, setLocalContent] = useState<string>("");
  const { handleCloseModal, handleSetPostContent } = usePostModal();

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
  };

  return {
    localContent,
    setLocalContent,
    handleSubmit,
    techOptions,
  };
};
