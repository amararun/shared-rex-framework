import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Maximize2, Minimize2, Maximize } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, HelpCircle, Menu } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useHelpContent } from '@/hooks/useHelpContent'
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TrackerUpdater from './pages/TrackerUpdater'
import { AppSidebar } from '@/components/app-sidebar'

// Update the navigationItems type
type NavigationItem = {
  title: string;
  items?: {
    title: string;
    description: string;
    href: string;
    helpContentId: string;
  }[];
  href?: string;
}

// Update the navigationItems array
const navigationItems: NavigationItem[] = [
  {
    title: "Analyze with AI",
    items: [
      {
        title: "Analyzer AI",
        description: "Connect to any PostGreSQL & MySQL anywhere.\nUpload and analyze any TXT-CSV file.\nBYOW - Bring your own Warehouse- connect to your Data Warehouse on the fly;\nPush data to Rex Warehouse or your own",
        href: "https://rexdb.tigzig.com/",
        helpContentId: "analyzer-multitasker"
      }
    ]
  },
  {
    title: "AI Analytics Agents",
    items: [
      {
        title: "Realtime Analytics Agent",
        description: "Analytics Agents with OpenAI's Realtime Voice API implementation. \nAll round agent:Text-to-SQL • AWS MySQL • Python • Statistics • Analytics • Charts • Automation • Web Scraping • Equities • Yahoo Finance",
        href: "https://rex-wo-headers.tigzig.com/",
        helpContentId: "realtime-analytics-agent"
      },
      {
        title: "Analyzer Agent",
        description: "The workhorse. Supports text & voice inputs, but no realtime voice.\nCapabilities same as the Realtime agent above.",
        href: "https://flowise.tigzig.com/chatbot/a5cde057-9994-4383-8c3b-32ac46d9bacf",
        helpContentId: "analyzer-agent"
      },
      {
        title: "Yahoo Finance Agent",
        description: "Data pull and analysis from Yahoo Finance...",
        href: "https://flowise.tigzig.com/chatbot/c79f754a-cd47-4b6a-bac6-fb7a8abd3b4d",
        helpContentId: "yahoo-finance-agent"
      },
      {
        title: "File/Database/Tracker Updater",
        description: "Demonstrates a GenAI Tracker Updater. Use this to update with new Gen AI projects. The AI Agent will format entries into the correct columns and add three relevant Gen AI use cases for each item.",
        href: "/tracker-updater",
        helpContentId: "tracker-updater"
      }
    ]
  },
  {
    title: "Data Pulls",
    items: [
      {
        title: "Convert PDF to Text",
        description: "Convert complex PDF including tables to dot TXT file \nUses Llama Parse",
        href: "https://parse.tigzig.com",
        helpContentId: "pdf-converter"
      },
      {
        title: "YouTube Transcript Extractor",
        description: "Provide a YouTube URL and get the transcript",
        href: "https://ytget.tigzig.com",
        helpContentId: "youtube-extractor"
      }
    ]
  },
  {
    title: "Automate & Analyze AI",
    items: [
      {
        title: "RBI Cards / ATM / POS",
        description: "Convert RBI monthly cards excel file to database format csv and analyze with AI on the fly",
        href: "https://rbicc.tigzig.com",
        helpContentId: "rbi-cards-analyzer"
      }
    ]
  }
]

// Add capability items
const capabilities = [
  "Text-to-SQL",
  "AWS MySQL",
  "Python",
  "Statistics",
  "Analytics",
  "Charts",
  "Automation",
  "Web Scraping",
  "Equities"
]

// Increase default width by approximately 1 inch (96 pixels)
const DEFAULT_PANEL_WIDTH = 396

function App() {
  const navigate = useNavigate()

  // Add this state for tracking fullscreen mode
  const [isFullScreen, setIsFullScreen] = React.useState(false)
  const [selectedContent, setSelectedContent] = React.useState<string>("https://rexdb.tigzig.com/")
  const [showWelcomePopup, setShowWelcomePopup] = React.useState(false)
  const [showHelpPanel, setShowHelpPanel] = React.useState(false)
  const [isHelpMaximized, setIsHelpMaximized] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Fix the defaultHelpId type issue by providing null as fallback
  const defaultHelpId = navigationItems[0].items?.[0]?.helpContentId || null

  // Add state for current help ID
  const [currentHelpId, setCurrentHelpId] = React.useState<string | null>(defaultHelpId)

  // Use the currentHelpId in the hook
  const { content: currentHelpContent, isLoading } = useHelpContent(currentHelpId)

  const [currentItemTitle, setCurrentItemTitle] = React.useState<string>(
    navigationItems[0].items?.[0]?.title || ""
  )

  // Add toggle function
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  // Modify handleContentClick to remove overlay logic
  const handleContentClick = (href: string, _: string, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedContent(href)
    if (href.startsWith('http')) {
      navigate('/external')
    } else {
      navigate(href)
    }

    const selectedItem = navigationItems.flatMap(item => item.items || [])
      .find(item => item.href === href)
    if (selectedItem) {
      setCurrentHelpId(selectedItem.helpContentId)
      setCurrentItemTitle(selectedItem.title)
    }
  }

  React.useEffect(() => {
    const lastShownTime = localStorage.getItem('welcomeMessageLastShown')
    const daysSinceLastShown = lastShownTime
      ? (Date.now() - parseInt(lastShownTime)) / (1000 * 60 * 60 * 24)
      : Infinity

    if (
      sessionStorage.getItem('hasShownWelcomeMessage') !== 'true' ||
      !lastShownTime ||
      daysSinceLastShown > 3
    ) {
      setShowWelcomePopup(true)
      sessionStorage.setItem('hasShownWelcomeMessage', 'true')
      localStorage.setItem('welcomeMessageLastShown', Date.now().toString())
    }
  }, [])

  // Modify handleHomeClick to remove overlay logic
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedContent("https://rexdb.tigzig.com/")
    setCurrentHelpId("analyzer-multitasker")
    setCurrentItemTitle(navigationItems[0].items?.[0]?.title || "")
    navigate('/')
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Main Header */}
      <div className={`border-b w-full transition-all duration-300 ${isFullScreen ? 'hidden' : ''} relative z-50`}>
        <div className="h-12 px-4 flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <div
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleHomeClick}
          >
            <img
              src="/images/FXISLOGO.png"
              alt="FXIS Logo"
              className="h-16 w-16 mr-3 object-contain p-0 m-0 [line-height:0] block"
              style={{
                padding: 0,
                margin: 0,
                marginRight: '10px',
                display: 'block',
                lineHeight: 0,
                fontSize: 0
              }}
            />
            <h1 className="text-xl text-slate-800 md:text-2xl font-semibold">
              REX-2: AI Decision Intelligence Toolkit
            </h1>
          </div>

          <div className="flex items-center gap-32">
            <span className="text-md text-violet-900 font-semibold">
            Realtime AI Analytics Agent System
            </span>
            <button
              onClick={toggleFullScreen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors duration-200"
              title={isFullScreen ? "Show Interface" : "Hide Interface"}
            >
              {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              <span className="text-sm font-medium">{isFullScreen ? "Show Interface" : "Hide Interface"}</span>
            </button>
          </div>
        </div>

        {/* Rest of the header components with isFullScreen conditional */}
        <div className="border-t border-border/40 bg-background">
          <div className="max-w-[1400px] mx-auto w-full px-4 py-0">
            <div className="flex flex-wrap gap-3 items-center">
              {capabilities.map((capability) => (
                <Badge
                  key={capability}
                  variant="outline"
                  className="px-3.5 py-1 text-base font-medium bg-indigo-50 hover:bg-indigo-100 border-indigo-100 text-indigo-700 transition-colors duration-200"
                >
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Add z-index */}
      <div className={`border-b w-full bg-background transition-all duration-300 ${isFullScreen ? 'hidden' : ''} relative z-50`}>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="h-[35px] px-4 flex items-center w-full">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-1.5 hover:bg-slate-100 rounded-md transition-colors mr-4"
              title="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>

            <NavigationMenu>
              <NavigationMenuList className="flex justify-start gap-6">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="h-8 px-3 text-lg font-medium text-blue-600 hover:text-blue-700">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 w-[80vw]">
                            {item.items.map((subItem) => (
                              <li key={subItem.title} className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <a
                                    href={subItem.href}
                                    onClick={(e) => handleContentClick(subItem.href, subItem.title, e)}
                                    className="block select-none space-y-2 rounded-md p-4 no-underline outline-none transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900"
                                  >
                                    <div className="text-lg font-medium mb-2 leading-none text-blue-600">
                                      {subItem.title}
                                    </div>
                                    <p className="text-sm leading-relaxed text-stone-700 whitespace-pre-line">
                                      {subItem.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden w-full">
        {showSidebar && (
          <AppSidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        )}
        <main className="flex-1 flex flex-col w-full relative">
          {isFullScreen && (
            <button
              onClick={toggleFullScreen}
              className="absolute top-2 right-2 z-50 p-2 rounded-md bg-white/90 hover:bg-white shadow-sm border transition-colors duration-200"
              title="Show Interface"
            >
              <Minimize2 size={16} />
            </button>
          )}

          <div className="flex-1 w-full relative overflow-hidden flex">
            {/* Main iframe content */}
            <div className={`flex-1 relative ${showHelpPanel
              ? isHelpMaximized
                ? 'hidden'
                : `pr-[${DEFAULT_PANEL_WIDTH}px]`
              : ''
              }`}>
              <Routes>
                <Route path="/" element={
                  <div className="relative w-full h-full">
                    <iframe
                      src={selectedContent}
                      className="w-full h-full absolute inset-0"
                      title="Content"
                      allow="microphone; camera; display-capture; autoplay; clipboard-read; clipboard-write; fullscreen"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                    />
                  </div>
                } />
                <Route path="/tracker-updater" element={<TrackerUpdater />} />
                <Route path="/external" element={
                  <div className="relative w-full h-full">
                    <iframe
                      src={selectedContent}
                      className="w-full h-full absolute inset-0"
                      title="Content"
                      allow="microphone; camera; display-capture; autoplay; clipboard-read; clipboard-write; fullscreen"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                    />
                  </div>
                } />
                <Route path="*" element={
                  <div className="p-8">
                    <h2 className="text-xl font-semibold text-red-600">Page Not Found</h2>
                    <p className="mt-2 text-gray-600">The requested page could not be found.</p>
                  </div>
                } />
              </Routes>
            </div>

            {/* Help Panel */}
            {showHelpPanel && (
              <div
                className={`border-l bg-white absolute right-0 top-0 bottom-0 flex flex-col overflow-hidden transition-all duration-200 ${isHelpMaximized ? 'w-full' : ''
                  }`}
                style={{
                  width: isHelpMaximized ? '100%' : `${DEFAULT_PANEL_WIDTH}px`
                }}
              >
                <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={20} className="text-blue-600" />
                    <span className="font-medium text-slate-700">Help & Build Guide</span>
                  </div>
                  <div className="flex items-center gap-2 mr-24">
                    <button
                      onClick={() => setIsHelpMaximized(!isHelpMaximized)}
                      className="p-1 hover:bg-slate-100 rounded"
                      title={isHelpMaximized ? "Restore" : "Maximize"}
                    >
                      <Maximize size={20} />
                    </button>
                    <button
                      onClick={() => setShowHelpPanel(false)}
                      className="p-1 hover:bg-slate-100 rounded"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <Tabs defaultValue="quickStart" className="w-full flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 pt-2 flex-shrink-0">
                    <TabsList className="w-full">
                      <TabsTrigger value="quickStart" className="flex-1">Quick Start</TabsTrigger>
                      <TabsTrigger value="tips" className="flex-1">Build It</TabsTrigger>
                    </TabsList>
                  </div>

                  <ScrollArea className="flex-1 h-full">
                    <div className="px-4">
                      <div className="border-l-4 border-blue-500 pl-3 py-2 mb-4 mt-2">
                        <h2 className="text-sm font-medium text-blue-800 tracking-wide">
                          {currentItemTitle}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Help & Build Documentation
                        </p>
                      </div>

                      {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="text-sm text-slate-500">Loading help content...</div>
                        </div>
                      ) : (
                        <>
                          <TabsContent value="quickStart" className="prose prose-sm max-w-none pb-8 data-[state=active]:block">
                            <ReactMarkdown>
                              {currentHelpContent?.quickStart || "No quick start guide available."}
                            </ReactMarkdown>
                          </TabsContent>
                          <TabsContent value="tips" className="prose prose-sm max-w-none pb-8 data-[state=active]:block">
                            <ReactMarkdown>
                              {currentHelpContent?.tips || "No tips available."}
                            </ReactMarkdown>
                          </TabsContent>
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </Tabs>
              </div>
            )}

            {/* Toggle button when panel is hidden */}
            {!showHelpPanel && (
              <button
                onClick={() => setShowHelpPanel(true)}
                className="absolute right-[60px] top-0 p-2 bg-white border rounded-md shadow-sm hover:bg-slate-50 flex items-center gap-2"
                style={{
                  padding: '4px 8px',  // Reduce padding to make it narrower
                  top: '7px',         // Adjust this value to move it higher (smaller number = higher position)
                  height: '25px'      // Reduce the height
                }}
              >
                <HelpCircle size={16} />
                <span className="font-medium text-sm text-slate-700">Help & Build Guide</span>
                <ChevronLeft size={16} />
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Footer - Add isFullScreen conditional */}
      <footer className={`border-t w-full bg-background transition-all duration-300 ${isFullScreen ? 'hidden' : ''}`}>
        <div className="max-w-[1400px] mx-auto w-full px-4 py-0">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <span className="text-lg text-bold -foreground text-center">
              Amar Harolikar | Applied Gen AI for Data Science, Analytics and Business
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs text-muted-foreground">
                © 2024 Amar Harolikar. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800 text-center">
              Welcome to REX!
            </DialogTitle>
            <DialogDescription className="text-base text-slate-700 text-center space-y-4 pt-4">
              <p>
                Realtime Voice feature: needs your OpenAI API key to work
              </p>
              <p>
                All others features : free to use
              </p>
              <p>
                Quick tip 1 : ask Rex / Agents what all they can do
              </p>
              <p>
                Quick tip 2 : check help for examples and guide
              </p>
              <div className="pt-4">
                <Button
                  className="w-32 bg-blue-800 hover:bg-blue-700 text-white font-semibold"
                  onClick={() => setShowWelcomePopup(false)}
                >
                  Got it!
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
