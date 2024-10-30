
import { Video } from "@/payload-types";

export async function incrementViewCount(video: Video) {
    try {
        const req = await fetch(`/api/videos/${video.id}`, {
          method: "PATCH", 
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            views: video ? video.views + 1 : undefined,
          }),
        })
        const data = await req.json()
        return data;
      } catch (err) {
        console.log(err)
    }
  }
  