
import { News } from "@/api/models/News";
import { createContext, useContext, useState, ReactNode} from "react";

interface NewsContextType {
    news: News [];
    setNews: React.Dispatch<React.SetStateAction<News[]>>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
    const [news, setNews] = useState<News[]>([]);
    return (
        <NewsContext.Provider value={{ news, setNews }}>
        {children}
        </NewsContext.Provider>
    );
};

export const useNewsContext = () => {
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error("useNewsContext must be used within a NewsProvider");
    }
    return context;
};