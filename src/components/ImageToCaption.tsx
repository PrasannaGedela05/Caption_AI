import React, { useState, useRef } from 'react';
import { Upload, Link, Copy, Check, AlertCircle, Eye, Sparkles } from 'lucide-react';
import { generateCaption } from '../utils/api';
import { LoadingState } from '../types';

const ImageToCaption: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false, error: null });
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl('');
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setCaption('');
      setShowPreview(true);
    }
  };
  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);
    if (url) {
      setImageFile(null);
      setPreviewUrl(url);
      setCaption('');
      setShowPreview(true);
    }
  };
  const handleGenerate = async () => {
    if (!imageFile && !imageUrl) {
      setLoadingState({ isLoading: false, error: 'Please upload an image or provide a URL' });
      return;
    }
    setLoadingState({ isLoading: true, error: null });
    try {
      const result = await generateCaption(imageFile || imageUrl);
      setCaption(result);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      setLoadingState({ isLoading: false, error: 'Failed to generate caption. Please check your API key configuration.' });
    }
  };
  const handleCopy = async () => {
    if (caption) {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const clearImage = () => {
    setImageFile(null);
    setImageUrl('');
    setPreviewUrl('');
    setCaption('');
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <Upload className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Image to Caption</h2>
          <p className="text-gray-600 text-sm">Upload an image to generate AI captions</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Click to upload an image</p>
            <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlInput}
            placeholder="Or paste image URL here..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        {showPreview && previewUrl && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-medium text-gray-800">Image Preview</h3>
              </div>
              <button
                onClick={clearImage}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
              >
                Clear
              </button>
            </div>
            
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-64 object-contain rounded-lg border border-gray-200 bg-white"
              />
            </div>           
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                <strong>Review your image:</strong> The AI will analyze this image and generate a descriptive caption based on what it sees, including text content if present.
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={loadingState.isLoading || (!imageFile && !imageUrl)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center"
        >
          {loadingState.isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing Image & Generating Caption...
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI Caption
            </>
          )}
        </button>
        {loadingState.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-700 text-sm">{loadingState.error}</p>
              {loadingState.error.includes('API key') && (
                <p className="text-red-600 text-xs mt-1">
                  Make sure to add your OpenRouter API key to the .env file
                </p>
              )}
            </div>
          </div>
        )}
        {caption && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium text-gray-800">AI Generated Caption:</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-white p-3 rounded border">{caption}</p>
            <button
              onClick={handleCopy}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Caption
                </>
              )}
            </button>
          </div>
        )}
        {!showPreview && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">How it works:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Upload an image or paste a URL</p>
              <p>• Review the image preview</p>
              <p>• AI will read text content and analyze visual elements</p>
              <p>• Get an intelligent, descriptive caption</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToCaption;