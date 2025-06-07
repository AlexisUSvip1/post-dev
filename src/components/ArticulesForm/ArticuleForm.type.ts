export interface ArticulePreviewObject {
    title: string;
    image: string;
    description: string;
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    previewObject: ArticulePreviewObject;
    body: string;
    setBody: React.Dispatch<React.SetStateAction<string>>;
    handlePostArticule: () => Promise<void>;
};