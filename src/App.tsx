import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ImageToCaption from './components/ImageToCaption';
import TextToImage from './components/TextToImage';
import ApiKeySetup from './components/ApiKeySetup';

function App() {
  const isApiConfigured = import.meta.env.VITE_OPENROUTER_API_KEY && 
    import.meta.env.VITE_OPENROUTER_API_KEY !== 'your-openrouter-api-key-here';
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Image Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate captions from images or create stunning visuals from text descriptions. <br/>
            <i>AI can make mistakes while generating</i>
          </p>
        </div>
        {!isApiConfigured && <ApiKeySetup />}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ImageToCaption />
          <TextToImage />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Choose Captional?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🔒</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Privacy First</h4>
              <p className="text-gray-600 text-sm">
                No data storage, no tracking. Your images and prompts are processed and immediately discarded.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Analysis</h4>
              <p className="text-gray-600 text-sm">
                Advanced AI reads text content in images and analyzes visual elements for comprehensive captions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">💫</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Your API Key</h4>
              <p className="text-gray-600 text-sm">
                Use your own OpenRouter API key for unlimited access to premium AI models and features.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Powered by OpenRouter AI</h3>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Access cutting-edge AI models including GPT-4 Vision for image analysis and DALL-E for image generation. 
              Configure your own API key for unlimited usage and premium features.
            </p>
          </div>
        </div>
        <footer className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Built with ❤️ for creators everywhere. 
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;