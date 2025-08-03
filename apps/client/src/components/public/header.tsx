'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Instagram, Youtube, Mail, User } from 'lucide-react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Madnews', href: '/madnews' },
    { name: 'O nás', href: '/o-nas' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Lokace', href: '/lokace' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'SHOP', href: '/shop' },
  ]

  const socialLinks = [
    { name: 'YouTube', href: 'https://yt.madzone.cz/', icon: Youtube },
    { name: 'Instagram', href: 'https://ig.madzone.cz/', icon: Instagram },
    { name: 'E-Mail', href: 'mailto:info@madzone.cz', icon: Mail },
  ]

  return (
    <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-red-900/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-red-500 font-bold text-xl">MADZONE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Links + Auth - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-red-500 transition-colors"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
            
            {/* Authentication */}
            <div className="border-l border-gray-700 pl-4 ml-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Přihlásit
                  </Button>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center space-x-2">
                  <Link href="/team-panel">
                    <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      Team Panel
                    </Button>
                  </Link>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-red-500"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-red-500 block px-3 py-2 text-base font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center space-x-4">
                    {socialLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Mobile Authentication */}
                  <div>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          <User className="h-4 w-4 mr-2" />
                          Přihlásit
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    
                    <SignedIn>
                      <div className="flex items-center space-x-2">
                        <Link href="/team-panel">
                          <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                            Team Panel
                          </Button>
                        </Link>
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-8 h-8"
                            }
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
