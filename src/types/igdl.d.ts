export interface IgdlVideo {
  url: string;
  quality: string;
}

export interface IgdlData {
  username: string | null;
  thumbnail: string | null;
  videos: IgdlVideo[];
  videoUrl: string | null;
  alternativeUrl: string | null;
}

export interface IgdlSuccessResult {
  success: true;
  data: IgdlData;
}

export interface IgdlErrorResult {
  success: false;
  error: string;
}

export type IgdlResult = IgdlSuccessResult | IgdlErrorResult;