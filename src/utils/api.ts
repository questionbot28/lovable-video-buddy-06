
/**
 * Extracts YouTube video ID from a URL
 */
export const extractVideoId = (url: string): string | null => {
  // Regular expressions for different YouTube URL formats
  const regexps = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^&?\/\s]{11})/,
    /(?:youtube\.com\/shorts\/)([^&?\/\s]{11})/
  ];

  for (const regex of regexps) {
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Fetches the transcript for a YouTube video
 */
export const fetchYouTubeTranscript = async (videoId: string): Promise<any> => {
  try {
    // This is a placeholder for the actual API call
    // In a real application, you would replace this with your actual API endpoint
    const response = await fetch(`https://api.example.com/youtube/transcript?videoId=${videoId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching YouTube transcript:", error);
    throw error;
  }
};

/**
 * Gets video information from YouTube's oEmbed API (publicly available)
 */
export const getVideoInfo = async (videoId: string): Promise<any> => {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video info: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching video info:", error);
    throw error;
  }
};

/**
 * Sends a message to the OpenRouter API and returns the response
 */
export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    // This is a placeholder for the actual API call
    // In a real application, you would replace this with your OpenRouter API endpoint
    const response = await fetch("https://api.openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add your API key here or use environment variables
        // "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};
