import React from 'react';
import { Header } from '@/components/public/header';
import { Footer } from '@/components/public/footer';
import AboutPageContent from '@/components/about/about-page-content';
import type { Metadata } from 'next';

// Meta data pro SSR optimalizaci
export const metadata: Metadata = {
  title: 'O nás - MadZone.cz | Tým paranormálních vyšetřovatelů',
  description: 'Seznamte se s týmem MadZone - skupinou, která se věnuje pátrání po nevysvětlitelných úkazech a paranormálních jevech. Založeno 2022.',
  keywords: 'MadZone, paranormální vyšetřování, tým, Patrik Horyna, Matěj Zlatev, YouTube',
  openGraph: {
    title: 'O nás - MadZone.cz',
    description: 'Tým, který se zajímá o nevysvětlitelné úkazy',
    type: 'website',
    locale: 'cs_CZ',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <AboutPageContent />
      <Footer />
    </div>
  );
}
