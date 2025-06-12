// API Configuration
const API_BASE_URL = 'https://openrouter.ai/api/v1';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Check if API key is configured
const isApiConfigured = () => {
  return API_KEY && API_KEY !== 'your-openrouter-api-key-here';
};

// Helper function to analyze image content for better mock responses
const analyzeImageForMockCaption = (imageSource: File | string): string => {
  // In a real implementation, this would use AI vision
  // For now, we'll create contextual responses based on common image types
  
  let fileName = '';
  if (typeof imageSource === 'string') {
    fileName = imageSource.toLowerCase();
  } else {
    fileName = imageSource.name.toLowerCase();
  }

  // Check for common keywords in filename or URL to provide relevant captions
  if (fileName.includes('ui') || fileName.includes('interface') || fileName.includes('component') || fileName.includes('design')) {
    return "A clean and modern user interface design showcasing component-based architecture. The layout demonstrates excellent UX principles with intuitive navigation, consistent styling, and well-organized information hierarchy. Perfect example of contemporary web design trends. #UI #WebDesign #UserExperience #ComponentDesign";
  }
  
  if (fileName.includes('code') || fileName.includes('programming') || fileName.includes('developer')) {
    return "Clean, well-structured code displayed on screen showing modern programming practices. The syntax highlighting and organized formatting demonstrate professional development standards. A great example of readable and maintainable code architecture. #Programming #Code #Development #TechLife";
  }
  
  if (fileName.includes('business') || fileName.includes('office') || fileName.includes('meeting')) {
    return "Professional business environment capturing the essence of modern workplace collaboration. The image reflects productivity, teamwork, and corporate excellence in today's dynamic business landscape. #Business #Professional #Teamwork #Success";
  }
  
  if (fileName.includes('food') || fileName.includes('restaurant') || fileName.includes('meal')) {
    return "Delicious and beautifully presented dish that's as pleasing to the eye as it is to the palate. The careful plating and vibrant colors showcase culinary artistry at its finest. A feast for both the senses and the soul! #Foodie #Delicious #CulinaryArt #FoodPhotography";
  }
  
  if (fileName.includes('nature') || fileName.includes('landscape') || fileName.includes('outdoor')) {
    return "Breathtaking natural landscape that captures the raw beauty of our world. The composition showcases nature's incredible artistry with stunning colors, textures, and lighting that inspire wanderlust and appreciation for the great outdoors. #Nature #Landscape #Adventure #NaturalBeauty";
  }
  
  if (fileName.includes('tech') || fileName.includes('gadget') || fileName.includes('device')) {
    return "Cutting-edge technology showcasing innovation and modern design. The sleek aesthetics and advanced features represent the pinnacle of contemporary tech development, blending functionality with style. #Technology #Innovation #TechLife #Gadgets";
  }
  
  if (fileName.includes('art') || fileName.includes('creative') || fileName.includes('design')) {
    return "Stunning artistic creation that demonstrates exceptional creativity and skill. The use of color, composition, and technique creates a visually captivating piece that speaks to the viewer's emotions and imagination. #Art #Creative #Design #Inspiration";
  }
  
  if (fileName.includes('fitness') || fileName.includes('gym') || fileName.includes('workout')) {
    return "Motivational fitness moment capturing dedication to health and wellness. The energy and determination shown here inspire others to pursue their fitness goals and embrace an active lifestyle. #Fitness #Motivation #HealthyLifestyle #WorkoutGoals";
  }
  
  if (fileName.includes('travel') || fileName.includes('vacation') || fileName.includes('destination')) {
    return "Amazing travel destination that showcases the beauty and diversity of our world. This incredible location offers unforgettable experiences and memories that last a lifetime. Wanderlust at its finest! #Travel #Adventure #Wanderlust #Explore";
  }
  
  // Default contextual captions for common scenarios
  const contextualCaptions = [
    "Capturing life's beautiful moments with perfect timing and composition. The image tells a compelling story through its visual elements, lighting, and subject matter. A testament to the power of photography to freeze time and emotion. #Photography #Moments #Life #Storytelling",
    "Professional quality image showcasing excellent technical execution and artistic vision. The careful attention to detail, lighting, and composition creates a visually striking result that engages and inspires viewers. #Professional #Quality #ArtisticVision #Excellence",
    "Beautifully composed shot that demonstrates mastery of photographic principles. The balance of elements, use of light, and creative perspective combine to create an image that's both technically sound and emotionally resonant. #Composition #Photography #Creative #Artistic"
  ];
  
  return contextualCaptions[Math.floor(Math.random() * contextualCaptions.length)];
};

// Helper function to generate relevant images based on prompt keywords
const generateRelevantMockImage = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Night/Evening scenes
  if (lowerPrompt.includes('night') || lowerPrompt.includes('neon') || lowerPrompt.includes('lights') || lowerPrompt.includes('dark')) {
    const nightImages = [
      'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg', // City at night with neon
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg', // Neon lights
      'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg', // Night cityscape
      'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg', // Night street with lights
      'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg'  // Night sky with stars
    ];
    return nightImages[Math.floor(Math.random() * nightImages.length)];
  }
  
  // Sky/Space scenes
  if (lowerPrompt.includes('sky') || lowerPrompt.includes('space') || lowerPrompt.includes('stars') || lowerPrompt.includes('galaxy')) {
    const skyImages = [
      'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg', // Starry night sky
      'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg', // Night sky
      'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg', // Galaxy
      'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',     // Space
      'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg'  // Milky way
    ];
    return skyImages[Math.floor(Math.random() * skyImages.length)];
  }
  
  // Futuristic/Tech scenes
  if (lowerPrompt.includes('futuristic') || lowerPrompt.includes('tech') || lowerPrompt.includes('cyber') || lowerPrompt.includes('digital')) {
    const techImages = [
      'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg', // Futuristic city
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg', // Tech/digital
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg', // Cyber aesthetic
      'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg', // Digital art
      'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg'  // Tech background
    ];
    return techImages[Math.floor(Math.random() * techImages.length)];
  }
  
  // Coffee/Cozy scenes
  if (lowerPrompt.includes('coffee') || lowerPrompt.includes('cozy') || lowerPrompt.includes('warm') || lowerPrompt.includes('cafe')) {
    const cozyImages = [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',  // Coffee shop
      'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg', // Cozy cafe
      'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg', // Coffee cup
      'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg', // Warm interior
      'https://images.pexels.com/photos/1251177/pexels-photo-1251177.jpeg'  // Coffee atmosphere
    ];
    return cozyImages[Math.floor(Math.random() * cozyImages.length)];
  }
  
  // Abstract/Art scenes
  if (lowerPrompt.includes('abstract') || lowerPrompt.includes('art') || lowerPrompt.includes('painting') || lowerPrompt.includes('colorful')) {
    const abstractImages = [
      'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg', // Abstract art
      'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg', // Colorful abstract
      'https://images.pexels.com/photos/1183999/pexels-photo-1183999.jpeg', // Artistic pattern
      'https://images.pexels.com/photos/1183994/pexels-photo-1183994.jpeg', // Abstract design
      'https://images.pexels.com/photos/1183997/pexels-photo-1183997.jpeg'  // Color splash
    ];
    return abstractImages[Math.floor(Math.random() * abstractImages.length)];
  }
  
  // Nature/Landscape scenes
  if (lowerPrompt.includes('mountain') || lowerPrompt.includes('nature') || lowerPrompt.includes('landscape') || lowerPrompt.includes('forest')) {
    const natureImages = [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',  // Mountains
      'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg', // Mountain landscape
      'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',  // Forest
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg', // Nature scene
      'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg'  // Landscape
    ];
    return natureImages[Math.floor(Math.random() * natureImages.length)];
  }
  
  // Ocean/Water scenes
  if (lowerPrompt.includes('ocean') || lowerPrompt.includes('water') || lowerPrompt.includes('beach') || lowerPrompt.includes('sea')) {
    const oceanImages = [
      'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg', // Ocean waves
      'https://images.pexels.com/photos/1032649/pexels-photo-1032649.jpeg', // Beach scene
      'https://images.pexels.com/photos/1032651/pexels-photo-1032651.jpeg', // Seascape
      'https://images.pexels.com/photos/1032652/pexels-photo-1032652.jpeg', // Water reflection
      'https://images.pexels.com/photos/1032653/pexels-photo-1032653.jpeg'  // Ocean view
    ];
    return oceanImages[Math.floor(Math.random() * oceanImages.length)];
  }
  
  // Architecture/Building scenes
  if (lowerPrompt.includes('building') || lowerPrompt.includes('architecture') || lowerPrompt.includes('city') || lowerPrompt.includes('urban')) {
    const architectureImages = [
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg', // Modern architecture
      'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg', // City buildings
      'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg', // Urban architecture
      'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg', // Building design
      'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg'   // City skyline
    ];
    return architectureImages[Math.floor(Math.random() * architectureImages.length)];
  }
  
  // Default fallback - use a random high-quality image
  const fallbackImages = [
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
  ];
  
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

export const generateCaption = async (imageFile: File | string): Promise<string> => {
  // Check API configuration
  if (!isApiConfigured()) {
    throw new Error('OpenRouter API key not configured. Please add your API key to the .env file.');
  }

  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (Math.random() < 0.05) { // 5% chance of simulated error for testing
    throw new Error('API request failed');
  }
  
  // Generate contextual caption based on image content
  return analyzeImageForMockCaption(imageFile);
};

export const generateImage = async (prompt: string): Promise<string> => {
  // Check API configuration
  if (!isApiConfigured()) {
    throw new Error('OpenRouter API key not configured. Please add your API key to the .env file.');
  }

  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  if (Math.random() < 0.05) { // 5% chance of simulated error for testing
    throw new Error('Image generation failed');
  }
  
  // Generate relevant image based on prompt content
  return generateRelevantMockImage(prompt);
};

/* 
PRODUCTION API IMPLEMENTATION EXAMPLE:

For actual OpenRouter API integration, replace the mock functions above with:

export const generateCaption = async (imageFile: File | string): Promise<string> => {
  if (!isApiConfigured()) {
    throw new Error('OpenRouter API key not configured');
  }

  let imageData: string;
  
  if (typeof imageFile === 'string') {
    // Handle URL
    const response = await fetch(imageFile);
    const blob = await response.blob();
    imageData = await blobToBase64(blob);
  } else {
    // Handle File
    imageData = await fileToBase64(imageFile);
  }

  const response = await fetch(`${API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and create an engaging Instagram-style caption. Include relevant hashtags and describe both the visual content and any text you can read. Make it social media friendly and engaging.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageData}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate caption');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export const generateImage = async (prompt: string): Promise<string> => {
  if (!isApiConfigured()) {
    throw new Error('OpenRouter API key not configured');
  }

  const response = await fetch(`${API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/dall-e-3',
      messages: [
        {
          role: 'user',
          content: `Create a high-quality image based on this description: ${prompt}. Make it visually appealing and match the description as closely as possible.`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  const data = await response.json();
  return data.choices[0].message.content; // This would contain the image URL
};

// Helper functions
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};
*/