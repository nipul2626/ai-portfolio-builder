'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Check, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'

interface ResumeIslandProps {
  onResumeUpload: (data: any) => void
  onBack: () => void
}

type UploadState = 'idle' | 'uploading' | 'scanning' | 'extracting' | 'filling' | 'success' | 'error'

export function ResumeIsland({ onResumeUpload, onBack }: ResumeIslandProps) {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [extractedData, setExtractedData] = useState<any>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processResume(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  })

  const processResume = async (file: File) => {
    // Simulate upload and processing
    setUploadState('uploading')
    setUploadProgress(0)

    // Upload animation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    // Scanning phase
    setUploadState('scanning')
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Extracting phase
    setUploadState('extracting')
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Filling phase with mock data
    setUploadState('filling')
    const mockData = {
      name: 'John Doe',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'TypeScript', 'Python'],
      experience: 3,
      projects: 5
    }
    setExtractedData(mockData)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Success
    setUploadState('success')
  }

  const handleContinue = () => {
    onResumeUpload(extractedData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white/60 hover:text-white"
          disabled={uploadState !== 'idle' && uploadState !== 'success'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Title */}
        <motion.h1 className="text-5xl font-bold text-center mb-4">
          {['Upload', 'Your', 'Resume'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block mr-3 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <AnimatePresence mode="wait">
          {uploadState === 'idle' && (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-12"
            >
              {/* Upload zone */}
              <div
                {...getRootProps()}
                className={`relative w-full h-96 rounded-3xl border-4 border-dashed transition-all duration-300 cursor-pointer ${
                  isDragActive
                    ? 'border-purple-500 bg-purple-500/10 scale-105'
                    : 'border-purple-500/30 bg-slate-900/40 hover:border-purple-500/60 hover:bg-slate-900/60'
                }`}
              >
                <input {...getInputProps()} />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{
                      y: isDragActive ? -10 : [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: isDragActive ? 0 : Infinity,
                      ease: 'easeInOut'
                    }}
                    className={`mb-8 p-6 rounded-full ${
                      isDragActive ? 'bg-purple-500/20 scale-125' : 'bg-slate-800/60'
                    } transition-all duration-300`}
                  >
                    <Upload className={`w-16 h-16 ${isDragActive ? 'text-purple-400' : 'text-purple-400/60'}`} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isDragActive ? 'Drop to upload' : 'Drag and drop your resume here'}
                  </h3>
                  <p className="text-white/60 mb-4">or click to browse</p>
                  <p className="text-white/40 text-sm">Supports PDF, DOC, DOCX</p>
                </div>

                {/* Animated border glow */}
                {isDragActive && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 40px rgba(168, 85, 247, 0.6)',
                        '0 0 20px rgba(168, 85, 247, 0.3)'
                      ]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          )}

          {(uploadState === 'uploading' || uploadState === 'scanning' || uploadState === 'extracting' || uploadState === 'filling') && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 space-y-8"
            >
              {/* Document preview with scan line */}
              <div className="relative mx-auto w-80 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
                {uploadState === 'scanning' && (
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                    animate={{ y: [0, 384, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute inset-0 blur-md bg-purple-500/50" />
                  </motion.div>
                )}

                {/* Matrix-style data streams */}
                {uploadState === 'extracting' && (
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -100 }}
                        animate={{ y: 500 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: 'linear'
                        }}
                        className="absolute text-green-500 text-xs font-mono opacity-60"
                        style={{ left: `${i * 10}%` }}
                      >
                        {Array.from({ length: 20 }).map(() => String.fromCharCode(33 + Math.random() * 94)).join('')}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Form fields filling animation */}
                {uploadState === 'filling' && extractedData && (
                  <div className="absolute inset-0 p-8 space-y-4">
                    {Object.entries(extractedData).map(([key, value], i) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="bg-slate-900 rounded-lg p-4"
                      >
                        <div className="text-purple-400 text-xs uppercase mb-2">{key}</div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5, delay: i * 0.3 + 0.2 }}
                          className="text-white font-medium"
                        >
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.3 + 0.7 }}
                          className="absolute right-4 top-4"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status text */}
              <div className="text-center">
                <motion.p
                  key={uploadState}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl text-white font-medium mb-2"
                >
                  {uploadState === 'uploading' && 'Uploading resume...'}
                  {uploadState === 'scanning' && 'Scanning document...'}
                  {uploadState === 'extracting' && 'Extracting data...'}
                  {uploadState === 'filling' && 'Filling your portfolio...'}
                </motion.p>
                
                {uploadState === 'uploading' && (
                  <div className="w-64 mx-auto h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {uploadState === 'success' && extractedData && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 text-center"
            >
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="mx-auto w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mb-8"
              >
                <Check className="w-12 h-12 text-green-500" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-4">Resume analyzed successfully!</h3>
              
              {/* Data preview cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(extractedData).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4"
                  >
                    <div className="text-purple-400 text-sm mb-2">{key}</div>
                    <div className="text-white font-bold">
                      {Array.isArray(value) ? value.length : value}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={handleContinue}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg"
              >
                Continue to Customize
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
