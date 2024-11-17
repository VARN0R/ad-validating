export interface User {
  id: string;
  role: "user" | "admin" | "client";
}

export interface Ad {
  adId: string;
  views: number;
  clicks: number;
  centsPerClick: string;
  centsPerView: string;
  viewGoal: string;
}

export interface AdForNews {
  forwardUrl: string;
  mediaUrl: string;
}

export interface Statistics {
  views: number;
  clicks: number;
  earnings: number;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
}
