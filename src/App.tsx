/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OfferingsSection } from './components/OfferingsSection';
import { ProofAndTeamSection } from './components/ProofAndTeamSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection, type ContactPreset } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [contactPreset, setContactPreset] = useState<ContactPreset | null>(null);

  const navigateToContact = (inquiryType: string, subject: string) => {
    setContactPreset({
      inquiryType,
      subject,
      nonce: Date.now(),
    });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        onNavigateContact={(subject = 'New Project Discovery') =>
          navigateToContact('Custom IT Services', subject)
        }
      />

      <main className="flex-1">
        <HeroSection
          onScheduleCall={() =>
            navigateToContact('Custom IT Services', 'Discovery Call — 2026 Project')
          }
        />

        <OfferingsSection
          onInquireOffering={(inquiryType, subject) =>
            navigateToContact(inquiryType, subject)
          }
        />

        <ProofAndTeamSection
          onApplyRole={(roleTitle, track) =>
            navigateToContact(
              track === 'Freshers 2026' ? 'Freshers 2026 Cohort' : 'Experienced Roles',
              `Application: ${roleTitle}`
            )
          }
        />

        <BlogSection
          onDiscussTopic={(topicTitle) =>
            navigateToContact('General Partnership', `Article Discussion: ${topicTitle}`)
          }
        />

        <ContactSection preset={contactPreset} />
      </main>

      <Footer />
    </div>
  );
}
