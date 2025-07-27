import axios from "axios";

export interface TistoryPost {
  title: string;
  content: string;
  visibility?: "0" | "1" | "2" | "3"; // 0: 비공개, 1: 보호, 2: 발행, 3: 예약
  category?: string;
  tag?: string;
}

export interface TistoryAuthResponse {
  access_token: string;
  state?: string;
}

class TistoryApiService {
  private readonly baseUrl = "https://www.tistory.com/apis";
  private readonly clientId = process.env.REACT_APP_TISTORY_CLIENT_ID;
  private readonly clientSecret = process.env.REACT_APP_TISTORY_CLIENT_SECRET;
  private readonly redirectUri = process.env.REACT_APP_TISTORY_REDIRECT_URI;
  private readonly blogName = process.env.REACT_APP_TISTORY_BLOG_NAME;

  // 1. 인증 URL 생성
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId!,
      redirect_uri: this.redirectUri!,
      response_type: "code",
      state: "tistory-auto-poster",
    });

    return `https://www.tistory.com/oauth/authorize?${params.toString()}`;
  }

  // 2. 인증 코드로 액세스 토큰 획득
  async getAccessToken(code: string): Promise<string> {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId!,
        client_secret: this.clientSecret!,
        redirect_uri: this.redirectUri!,
        code: code,
        grant_type: "authorization_code",
      });

      const response = await axios.post(
        `${this.baseUrl}/oauth/access_token`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // 응답이 URL 형식으로 올 수 있음: access_token=xxx&state=yyy
      const urlParams = new URLSearchParams(response.data);
      return urlParams.get("access_token") || response.data.access_token;
    } catch (error) {
      console.error("토큰 획득 실패:", error);
      throw new Error("액세스 토큰을 획득할 수 없습니다.");
    }
  }

  // 3. 블로그 정보 조회
  async getBlogInfo(accessToken: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/blog/info`, {
        params: {
          access_token: accessToken,
          output: "json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("블로그 정보 조회 실패:", error);
      throw error;
    }
  }

  // 4. 카테고리 목록 조회
  async getCategories(accessToken: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/category/list`, {
        params: {
          access_token: accessToken,
          output: "json",
          blogName: this.blogName,
        },
      });
      return response.data;
    } catch (error) {
      console.error("카테고리 조회 실패:", error);
      throw error;
    }
  }

  // 5. 포스트 작성
  async createPost(accessToken: string, post: TistoryPost) {
    try {
      const formData = new FormData();
      formData.append("access_token", accessToken);
      formData.append("output", "json");
      formData.append("blogName", this.blogName!);
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("visibility", post.visibility || "2"); // 기본값: 발행

      if (post.category) {
        formData.append("category", post.category);
      }

      if (post.tag) {
        formData.append("tag", post.tag);
      }

      const response = await axios.post(
        `${this.baseUrl}/post/write`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("포스트 작성 실패:", error);
      throw error;
    }
  }

  // 6. 포스트 목록 조회
  async getPosts(accessToken: string, page: number = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/post/list`, {
        params: {
          access_token: accessToken,
          output: "json",
          blogName: this.blogName,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      console.error("포스트 목록 조회 실패:", error);
      throw error;
    }
  }
}

export default new TistoryApiService();
