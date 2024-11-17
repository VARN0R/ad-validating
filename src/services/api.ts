import { Ad, AdForNews } from "../types/types";

export const BASE_URL = "http://localhost:3000";

export const uploadMediaFile = async (formData: FormData) => {
  const response = await fetch("/api/v1/media/upload", {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const uploadAd = async (
  forwardUrl: string,
  mediaUrl: string,
  centsPerView: number,
  centsPerClick: number,
  viewGoal: number
) => {
  const formData = new FormData();
  formData.append("forwardUrl", forwardUrl);
  formData.append("mediaUrl", mediaUrl);
  formData.append("centsPerView", String(centsPerView));
  formData.append("centsPerClick", String(centsPerClick));
  formData.append("viewGoal", String(viewGoal));

  try {
    const response = await fetch(`${BASE_URL}/api/v1/ad`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to upload ad");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchAds = async (limit: number): Promise<AdForNews[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ad?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch ads");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
};

export const getAdsId = async (): Promise<number[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ad/all`);
    if (!response.ok) {
      throw new Error("Failed to fetch client ads id");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching client ads id:", error);
    return [];
  }
};

export const getClientAdStat = async (id: number): Promise<Ad | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/stat/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch client ad stats");
    }
    const ad: Ad = await response.json();
    return ad;
  } catch (error) {
    console.error(`Error fetching client ad stats for ID ${id}:`, error);
    return null;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    await fetch(`${BASE_URL}/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch (error) {
    console.error("Failed to register user:", error);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    // Предположим, что сервер возвращает токен или информацию о пользователе при успешном входе
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to log in user:", error);
    throw error; // можно пробросить ошибку, чтобы обработать её в компоненте
  }
};

export const validateAd = async (adId: string) => {
  try {
    await fetch(`${BASE_URL}/ads/${adId}/validate`, { method: "POST" });
  } catch (error) {
    console.error("Failed to validate ad:", error);
  }
};

export const deleteAd = async (adId: string) => {
  try {
    await fetch(`${BASE_URL}/ads/${adId}`, { method: "DELETE" });
  } catch (error) {
    console.error("Failed to delete ad:", error);
  }
};

export const createBlogPost = async (title: string, content: string) => {
  try {
    await fetch(`${BASE_URL}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
  } catch (error) {
    console.error("Failed to create blog post:", error);
  }
};
