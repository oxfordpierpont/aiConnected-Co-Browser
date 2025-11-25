import React, { useState } from 'react';
import { FloatingChat } from './components/FloatingChat';

interface AppProps {
  isWidget?: boolean;
}

/**
 * The App component acts as the router between "Demo Mode" and "Widget Mode".
 * 
 * @param isWidget - If true, implies the app is embedded on a 3rd party site.
 *                   We strictly render the FloatingChat overlay and nothing else.
 */
function App({ isWidget = false }: AppProps) {
  const [viewMode, setViewMode] = useState<'simulation' | 'live'>('simulation');

  // WIDGET MODE: Render only the overlay
  if (isWidget) {
    return <FloatingChat />;
  }

  // SIMULATION MODE: Render the VendorMP demo site + Overlay
  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-500/20">
      
      {/* Navigation (Visual only) */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">V</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">VendorMP</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
             {/* Mode Toggle for Demo Purposes */}
             <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button 
                    onClick={() => setViewMode('simulation')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'simulation' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Simulation
                </button>
                <button 
                    onClick={() => setViewMode('live')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'live' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Live Website
                </button>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">Log in</button>
            <button className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {viewMode === 'live' ? (
        <div className="w-full h-[calc(100vh-80px)] relative">
            <iframe 
                src="https://vendormp.com" 
                className="w-full h-full border-0"
                title="VendorMP Live"
            />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg text-xs font-medium shadow-lg z-10 opacity-90 hover:opacity-100 transition-opacity">
                Note: AI context reading is disabled in Iframe mode due to browser security.
            </div>
        </div>
      ) : (
          <main>
            {/* Hero Section */}
            <section id="hero" className="pt-24 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
              <div className="max-w-5xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                  <span>New Feature</span>
                  <span className="w-1 h-1 rounded-full bg-blue-300"></span>
                  <span>AI Contract Analysis 2.0</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                  Simplify your entire <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vendor Ecosystem</span>
                </h1>
                
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  VendorMP is the all-in-one platform to onboard, track, and manage your external workforce. 
                  Reduce risk, save time, and gain total visibility into your supply chain.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-900/10">
                    Start Free Trial
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Watch Demo
                  </button>
                </div>
              </div>
            </section>

            {/* Dashboard Preview */}
            <div id="dashboard" className="max-w-6xl mx-auto px-6 -mt-12 mb-24 relative z-10">
                <div className="rounded-2xl bg-slate-900 p-2 shadow-2xl shadow-slate-400/20 ring-1 ring-slate-900/5">
                    <div className="rounded-xl bg-slate-800 aspect-[16/9] overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">
                            [Interactive Dashboard Mockup: Spend Analysis Graph]
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to manage suppliers</h2>
                  <p className="text-lg text-slate-500">
                    Stop using spreadsheets. Upgrade to a system designed for modern procurement teams.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  {/* Feature 1 */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Automated Onboarding</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Send a single link to new vendors. They upload W-9s, insurance certs, and banking info directly into your portal. We validate documents automatically.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Performance Tracking</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Rate vendors on delivery speed, quality, and communication. Visualize trends over time to make data-driven renewal decisions.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Risk & Compliance</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Get alerts when vendor insurance expires or if they appear on government watchlists. Keep your organization compliant effortlessly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-slate-50">
               <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Simple Pricing</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Starter */}
                        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900">Starter</h3>
                            <div className="my-4"><span className="text-4xl font-bold">$0</span><span className="text-slate-500">/mo</span></div>
                            <p className="text-sm text-slate-500 mb-6">For small teams tracking under 10 vendors.</p>
                            <button className="w-full py-2 rounded-lg border border-slate-200 font-semibold text-slate-600 hover:border-slate-400">Get Started</button>
                        </div>
                         {/* Growth */}
                         <div className="p-8 bg-slate-900 rounded-3xl border border-slate-900 shadow-xl relative">
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">Popular</div>
                            <h3 className="text-lg font-bold text-white">Growth</h3>
                            <div className="my-4"><span className="text-4xl font-bold text-white">$49</span><span className="text-slate-400">/mo</span></div>
                            <p className="text-sm text-slate-400 mb-6">Up to 100 vendors + Automated compliance alerts.</p>
                            <button className="w-full py-2 rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-500">Start Free Trial</button>
                        </div>
                         {/* Enterprise */}
                         <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                            <div className="my-4"><span className="text-4xl font-bold">Custom</span></div>
                            <p className="text-sm text-slate-500 mb-6">Unlimited vendors, API access, and dedicated support.</p>
                            <button className="w-full py-2 rounded-lg border border-slate-200 font-semibold text-slate-600 hover:border-slate-400">Contact Sales</button>
                        </div>
                    </div>
               </div>
            </section>

            <div className="h-48"></div> {/* Spacer for scroll testing */}
          </main>
      )}

      {/* Floating Chat Interface */}
      <FloatingChat />

    </div>
  );
}

export default App;