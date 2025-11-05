export interface NewsItem {
  slug: string;
  name: string;
  imageUrl: string;
  longText: string;
  createdAt: string;
}

export interface SocialNetworks {
  [key: string]: string;
}

export interface BasicData {
  logoUrl?: string;
  projectDescription?: string;
}
