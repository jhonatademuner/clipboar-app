// utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


const DEFAULT_SETTINGS: Settings = {
  networkVisible: false, 
  expirationTime: 1800000, 
};

const DEFAULT_CLIPBOARD_DATA: ClipboardData = {
  content: "", 
  settings: DEFAULT_SETTINGS,
};


export interface Settings {
  networkVisible?: boolean;
  expirationTime?: number; // In milliseconds
}

export interface ClipboardData {
  content?: string;
  settings?: Settings;
}

export class LocalStorageUtil {
  // Initialize localStorage with default data if it doesn't exist
  static initializeClipboardData(key: string): void {
    try {
      const existingData = localStorage.getItem(key);
      if (!existingData) {
        // Initialize with default values if no data is found
        LocalStorageUtil.saveClipboardData(key, DEFAULT_CLIPBOARD_DATA);
      }
    } catch (error) {
      console.error("Failed to initialize localStorage data:", error);
    }
  }

  // Save data to localStorage
  static saveClipboardData(key: string, data: ClipboardData): void {
    try {
      const dataToSave = {
        ...DEFAULT_CLIPBOARD_DATA,
        ...data,
        settings: {
          ...DEFAULT_SETTINGS,
          ...data.settings,
        },
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }

  // Retrieve data from localStorage
  static getClipboardData(key: string): ClipboardData | null {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsedData: ClipboardData = JSON.parse(data);
        return {
          ...DEFAULT_CLIPBOARD_DATA,
          ...parsedData,
          settings: {
            ...DEFAULT_SETTINGS,
            ...parsedData.settings,
          },
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to retrieve data from localStorage:", error);
      return null;
    }
  }

  // Update specific fields in the data
  static updateClipboardData(key: string, updates: Partial<ClipboardData>): void {
    try {
      const currentData = LocalStorageUtil.getClipboardData(key);
      if (currentData) {
        const updatedSettings = currentData.settings ? {
          ...currentData.settings,
          ...updates.settings,
        } : DEFAULT_SETTINGS;

        const updatedData: ClipboardData = {
          ...currentData,
          ...updates,
          settings: updatedSettings,
        };

        LocalStorageUtil.saveClipboardData(key, updatedData);
      }
    } catch (error) {
      console.error("Failed to update data in localStorage:", error);
    }
  }

}
