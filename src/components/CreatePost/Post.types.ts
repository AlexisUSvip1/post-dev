// types/PostTypes.ts

export interface PostModalProps {
    openPostModal: boolean;
    handleCloseModal: () => void;
  }
  
  export interface PostHook {
    localContent: string;
    setLocalContent: (content: string) => void;
    textContent: string;
    setTextContent: (text: string) => void;
    addTags: string[];
    setAddTags: (tags: string[]) => void;
    handleSubmit: () => void;
    techOptions: string[];
    fileSelected: boolean;
    contFiles: number;
    imagePreviews: string[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  }
  

  
  export interface TechButtonProps {
    option: string;
    isSelected: boolean;
    toggleTag: (tag: string) => void;
  }
  