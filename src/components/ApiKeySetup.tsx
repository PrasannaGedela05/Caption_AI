import React from 'react';
import { Key, ExternalLink, AlertCircle } from 'lucide-react';

const ApiKeySetup: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
          <Key className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            API Key Configuration Required
          </h3>
          <p className="text-gray-700 mb-4">
            To use the AI features, you need to configure your OpenRouter API key. This enables access to advanced AI models for image analysis and generation.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Setup Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>
                Get your API key from{' '}
                <a 
                  href="https://openrouter.ai/keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  OpenRouter.ai
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>Create a <code className="bg-gray-100 px-1 rounded">.env</code> file in your project root</li>
              <li>Add: <code className="bg-gray-100 px-2 py-1 rounded text-xs">VITE_OPENROUTER_API_KEY=your_actual_api_key_here</code></li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium">Security Note:</p>
              <p className="text-yellow-700">
                Never commit your API key to version control. The .env file should be added to your .gitignore file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;