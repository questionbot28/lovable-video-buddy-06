
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
 * Fetches the transcript for a YouTube video using the RapidAPI endpoint
 */
export const fetchYouTubeTranscript = async (videoId: string): Promise<any> => {
  try {
    const url = "https://youtube-video-summarizer-gpt-ai.p.rapidapi.com/api/v1/get-transcript-v2";
    
    const response = await fetch(`${url}?video_id=${videoId}&platform=youtube`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f12a24bbfamsh2ed8a5f6d386a88p121a3djsn480d5e99e5bf",
        "x-rapidapi-host": "youtube-video-summarizer-gpt-ai.p.rapidapi.com"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle the RapidAPI response format
    if (data && data.code === 100000 && data.data && data.data.transcripts) {
      // Extract transcript from the response
      const transcripts = data.data.transcripts;
      const language = Object.keys(transcripts)[0]; // Get first available language
      
      if (language && transcripts[language] && transcripts[language].custom) {
        // Combine all transcript segments
        const transcriptText = transcripts[language].custom
          .map((segment: any) => segment.text)
          .join(" ");
        
        return { transcript: transcriptText };
      }
    }
    
    // If we couldn't extract a transcript in the expected format
    return { transcript: null };
    
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
    const url = "https://openrouter.ai/api/v1/chat/completions";
    
    // Format the message as a proper chat instruction
    const formattedMessage = {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    };
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedMessage)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the response from the proper chat format
    return data.choices && data.choices[0] && data.choices[0].message 
      ? data.choices[0].message.content
      : "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};
