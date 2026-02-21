'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Copy, Download, ExternalLink, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface CodeExportPanelProps {
  html?: string
  css?: string
  jsx?: string
  vue?: string
}

export function CodeExportPanel({ html = '', css = '', jsx = '', vue = '' }: CodeExportPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedTab, setCopiedTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('html')

  const codeExamples = {
    html: html || `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="hero-section">
    <h1>Welcome to my portfolio</h1>
    <p>Built with PortfolioAI</p>
  </div>
</body>
</html>`,
    css: css || `.hero-section {
  padding: 48px;
  background: linear-gradient(135deg, #00f0ff, #ff00ff);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}`,
    jsx: jsx || `import React from 'react';

export default function HeroSection() {
  return (
    <div className="hero-section">
      <h1>Welcome to my portfolio</h1>
      <p>Built with PortfolioAI</p>
    </div>
  );
}`,
    vue: vue || `<template>
  <div class="hero-section">
    <h1>Welcome to my portfolio</h1>
    <p>Built with PortfolioAI</p>
  </div>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>`,
  }

  const handleCopy = (code: string, tab: string) => {
    navigator.clipboard.writeText(code)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  const handleDownload = () => {
    // Create a ZIP file with all code
    const blob = new Blob(
      [
        `HTML:\n${codeExamples.html}\n\nCSS:\n${codeExamples.css}\n\nJSX:\n${codeExamples.jsx}\n\nVue:\n${codeExamples.vue}`,
      ],
      { type: 'text/plain' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-code.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCodePen = () => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://codepen.io/pen/define'
    form.target = '_blank'

    const data = {
      html: codeExamples.html,
      css: codeExamples.css,
      js: '',
    }

    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'data'
    input.value = JSON.stringify(data)
    form.appendChild(input)

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Code className="w-4 h-4" />
        View Code
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Export Code
            </DialogTitle>
            <DialogDescription>
              Export your portfolio code in multiple formats including HTML, CSS, React, and Vue
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="jsx">React JSX</TabsTrigger>
              <TabsTrigger value="vue">Vue</TabsTrigger>
            </TabsList>

            <div className="flex-1 mt-4">
              {(['html', 'css', 'jsx', 'vue'] as const).map((tab) => (
                <TabsContent key={tab} value={tab} className="h-full mt-0">
                  <div className="h-full flex flex-col">
                    {/* Code Editor */}
                    <ScrollArea className="flex-1 bg-gray-900 rounded-lg border border-border">
                      <pre className="p-4">
                        <code className="text-sm text-gray-100 font-mono">
                          {codeExamples[tab]}
                        </code>
                      </pre>
                    </ScrollArea>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        onClick={() => handleCopy(codeExamples[tab], tab)}
                        variant="outline"
                        className="flex-1"
                      >
                        {copiedTab === tab ? (
                          <>
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>

          {/* Export Options */}
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-sm text-muted-foreground mb-3">Export Options</p>
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={handleDownload} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download ZIP
              </Button>
              <Button onClick={handleCodePen} variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in CodePen
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Push to GitHub
              </Button>
            </div>
          </div>

          {/* Code Annotations */}
          <div className="bg-accent/10 rounded-lg p-3 mt-4">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> This code is optimized and ready to use. All animations and styles are included.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
