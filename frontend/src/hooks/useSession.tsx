import { useEffect, useState } from "react";
import { getSessionStorageItem } from "../utils/getSesstion";

export const useSession = () => {
  const [currentModeInSession, setCurrentModeInSession] = useState<"Dark" | "Light" | undefined>(
    getSessionStorageItem<"Dark" | "Light">("currentMode")
  );
  const [currentColorInSession, setCurrentColorInSession] = useState<string | undefined>(
    getSessionStorageItem<string>("currentColor")
  );
  const [currentLanguageInSession, setCurrentLanguageInSession] = useState<
    "English" | "Thai" | undefined
  >(getSessionStorageItem<"English" | "Thai">("currentLanguage"));

  useEffect(() => {
    setCurrentModeInSession(getSessionStorageItem<"Dark" | "Light">("currentMode"));
    setCurrentColorInSession(getSessionStorageItem<string>("currentColor"));
    setCurrentLanguageInSession(getSessionStorageItem<"English" | "Thai">("currentLanguage"));
  }, []);

  return { currentColorInSession, currentModeInSession, currentLanguageInSession };
};
