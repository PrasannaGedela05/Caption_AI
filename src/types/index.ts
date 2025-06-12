export interface ApiError {
  message: string;
  status?: number;
}

export interface CaptionResponse {
  caption: string;
}

export interface ImageResponse {
  imageUrl: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}