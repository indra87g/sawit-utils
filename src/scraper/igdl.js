export async function igdl(url) {
  try {
    const reelCode = (() => {
      const patterns = [
        /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
        /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
        /instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
      ];
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) return match[1];
      }
      return null;
    })();

    if (!reelCode) {
      throw new Error("URL Instagram tidak valid");
    }

    const formData = new URLSearchParams();
    formData.append("id", url);
    formData.append("locale", "id");
    formData.append("cf-turnstile-response", "");
    formData.append("tt", "a66b23d8bfa4878536d788ac3d33d1a6");
    formData.append("ts", "1771729612");

    const response = await fetch(`https://reelsvideo.io/reel/${reelCode}/`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "HX-Request": "true",
        Origin: "https://reelsvideo.io",
        Referer: "https://reelsvideo.io/id",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: formData,
    });

    const html = await response.text();

    const usernameMatch = html.match(
      /<span[^>]*class="text-400-16-18"[^>]*>([^<]+)<\/span>/,
    );
    const username = usernameMatch ? usernameMatch[1].trim() : null;

    const thumbMatch = html.match(
      /data-bg="([^"]+)"|style="background-image: url\(([^)]+)\)/,
    );
    const thumbnail = thumbMatch ? thumbMatch[1] || thumbMatch[2] : null;

    const videoLinks = html.matchAll(
      /<a[^>]*href="(https:\/\/ssscdn\.io\/reelsvideo\/[^"]+)"[^>]*class="[^"]*(?:download_link|type_videos|type_audio)[^"]*"[^>]*>/g,
    );

    const videoUrls = new Set();
    for (const match of videoLinks) {
      if (match[1]) videoUrls.add(match[1]);
    }

    const videos = Array.from(videoUrls).map((url) => ({
      url: url,
      quality: "HD",
    }));

    return {
      success: true,
      data: {
        username: username,
        thumbnail: thumbnail,
        videos: videos,
        videoUrl: videos.length > 0 ? videos[0].url : null,
        alternativeUrl: videos.length > 1 ? videos[1].url : null,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}