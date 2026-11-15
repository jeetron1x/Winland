import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which media players are compatible with Winland?',
      a: 'Winland hooks directly into Windows System Media Transport Controls (SMTC) and WASAPI loopback. It seamlessly integrates with Spotify, Apple Music, YouTube Music, Chrome, Edge, Firefox, Tidal, and native Lyriic with real-time waveform spectrum and album art extraction.'
    },
    {
      q: 'Will Winland slow down my PC or reduce gaming FPS?',
      a: 'No. Winland includes intelligent full-screen game detection. The moment a full-screen 3D DirectX, Vulkan, or OpenGL game is focused, Winland automatically suspends its rendering loops, dropping CPU and GPU consumption to 0.0%.'
    },
    {
      q: 'What are the minimum system requirements?',
      a: 'Windows 10 (version 2004 or later) or Windows 11 on 64-bit architecture (x64). Hardware-accelerated DirectX composition is recommended for 120 FPS high-refresh rate spring dynamics.'
    },
    {
      q: 'How does the Taskbar auto-hide feature work, and is it reversible?',
      a: 'Winland uses standard Win32 window-state messaging (`SW_HIDE` / `SW_SHOW`) rather than modifying Explorer system registry keys or patching Windows DLLs. When you exit Winland or toggle the option off, your native Windows taskbar restores immediately with all pins and settings untouched.'
    },
    {
      q: 'Is Winland open-source and free to use?',
      a: 'Yes, Winland is free and open-source under the MIT license. The full repository, issue tracker, and release binaries are hosted transparently on GitHub.'
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 max-w-4xl mx-auto">
      
      <div className="text-center mb-16">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-3 inline-block">
          Frequently Answered
        </span>
        <h2 className="font-display font-extrabold text-headline-lg tracking-tight text-secondary mb-4">
          Common questions.
        </h2>
        <p className="text-body-md text-tertiary">
          Real answers about system compatibility, gaming impact, and safety.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="bg-surface border border-border-subtle hover:border-border-strong rounded-2xl p-6 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="font-bold text-base text-secondary">{faq.q}</h4>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </div>

              {isOpen && (
                <p className="text-body-sm text-tertiary mt-3 leading-relaxed pt-2 border-t border-border-subtle">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
