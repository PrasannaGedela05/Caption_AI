import React, { useState } from 'react';
import { Sparkles, Download, AlertCircle } from 'lucide-react';
import { generateImage } from '../utils/api';
import { LoadingState } from '../types';

const TextToImage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false, error: null });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setLoadingState({ isLoading: false, error: 'Please enter a description' });
      return;
    }

    setLoadingState({ isLoading: true, error: null });
    
    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      setLoadingState({ isLoading: false, error: 'Failed to generate image. Please try again.' });
    }
  };

  const handleDownload = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `captional-generated-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-3 rounded-lg mr-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Text to Image</h2>
          <p className="text-gray-600 text-sm">Describe what you want to create</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Prompt Input */}
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate... (e.g., 'A serene mountain landscape at sunset with a crystal clear lake')"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            rows={4}
          />
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">{prompt.length}/500</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loadingState.isLoading || !prompt.trim()}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {loadingState.isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Image...
            </div>
          ) : (
            'Generate Image'
          )}
        </button>

        {/* Error Display */}
        {loadingState.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{loadingState.error}</p>
          </div>
        )}

        {/* Generated Image */}
        {generatedImage && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={generatedImage}
                alt="Generated artwork"
                className="w-full rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </button>
          </div>
        )}

        {/* Example Prompts */}
        {!generatedImage && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Example prompts:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• "A futuristic city skyline at night with neon lights"</p>
              <p>• "A cozy coffee shop interior with warm lighting"</p>
              <p>• "An abstract painting with vibrant blues and golds"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImage;