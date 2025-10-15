'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SleekDescription = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-zinc-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(113,113,122,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(113,113,122,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main headline */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-800 leading-tight mb-6">
              We help you{' '}
              <span className="relative inline-block">
                <span className="text-blue-600">propel</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform scale-x-0 animate-[scaleX_0.8s_ease-out_0.5s_forwards] origin-left"></div>
              </span>{' '}
              process improvement
            </h1>
            <div className="text-2xl md:text-3xl text-zinc-600 mb-4">
              Across your entire organization. At{' '}
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">
                  SPEED
                </span>
            </div>
          </div>

          {/* Problem statement cards */}
          <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left column - Problem description */}
            <div className="space-y-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 mb-3">The Current Reality</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Most businesses use multiple programs for sales, property measurement, proposals, 
                      scheduling, and field team communication. These programs don&apos;t play nice together 
                      and often cause broken workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-amber-500 rounded-full animate-pulse delay-500"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 mb-3">The Impact</h3>
                    <p className="text-zinc-600 leading-relaxed">
                      Broken workflows cause process inefficiencies. Process inefficiencies have a 
                      negative impact on your business performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Solution */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-3xl p-12 border border-blue-200/30 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-800 mb-4">It&apos;s time to change that.</h3>
                  <p className="text-zinc-600 text-lg leading-relaxed mb-6">
                    Transform your disconnected processes into a unified, efficient system that accelerates your business growth.
                  </p>
                  <Link href="/login" className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Let&apos;s get started</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 right-8 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-1/4 left-8 w-3 h-3 bg-zinc-400 rounded-full animate-bounce delay-2000"></div>
      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-3000"></div>
    </div>
  );
};

export default SleekDescription;