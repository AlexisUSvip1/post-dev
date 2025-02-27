import {  useState } from "react";
import { usePostModal } from "../Navbar/NavbarTop/NavbarTop.hooks";
import { useAppSelector } from "../../hook/useAppSelector";
import { PostHook } from "./Post.types";

export const usePostHook = (): PostHook => {
  const [localContent, setLocalContent] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");
  const [addTags, setAddTags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [contFiles, setContFiles] = useState(0);

  const { handleCloseModal, handleSetPostContent } = usePostModal();
  const user = useAppSelector((state) => state.user);

  const techOptions = [
    "React", "Backend", "Frontend", "Node.js", "Python", "JavaScript", "TypeScript",
    "GraphQL", "Docker", "Kubernetes", "C++", "Java", "PHP", "Ruby", "Swift", 
    "Go", "Rust", "Angular", "Vue.js", "SQL"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles(prevFiles => [...prevFiles, ...newFiles]);

    const newPreviews = [...imagePreviews];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string);
          setImagePreviews([...newPreviews]);
          setContFiles(newPreviews.length);
          setFileSelected(true);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  
  const handleSubmit = async (): Promise<void> => {
    try {
      if (!user?.id) throw new Error("User ID is undefined");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found, please log in.");

      const formData = new FormData();
      formData.append("user_id", user.id.toString());
      formData.append("title", localContent);
      formData.append("body", textContent);
      addTags.forEach(tag => formData.append("tags", tag));
      imageFiles.forEach(file => formData.append("files", file));

      console.log("FormData being sent:", [...formData.entries()]);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw server response:", responseText);

      if (!response.ok) throw new Error("Failed to create post");
      handleSetPostContent(localContent);
      handleCloseModal();
      setLocalContent("");
      setTextContent("");
      setAddTags([]);
      setImageFiles([]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return {
    localContent, setLocalContent, textContent, setTextContent,
    addTags, setAddTags, handleSubmit, techOptions, fileSelected,
    contFiles, imagePreviews, handleFileChange
  };
};