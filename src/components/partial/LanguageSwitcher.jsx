'use client';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { IconWorld } from '@tabler/icons-react';

// The following cookie name is important because it's Google-predefined for the translation engine purpose
const COOKIE_NAME = 'googtrans';

// Initialize translation engine
window.__GOOGLE_TRANSLATION_CONFIG__ = {
    languages: [
        { title: 'English', name: 'en' },
        { title: 'Hindi', name: 'hi' },
        { title: 'Gujarati', name: 'gu' },
    ],
    defaultLanguage: 'en',
};

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState();
    const [languageConfig, setLanguageConfig] = useState();

    // Initialize translation engine
    useEffect(() => {
        // 1. Read the cookie
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];

        let languageValue;
        if (existingLanguageCookieValue) {
            // 2. If the cookie is defined, extract a language nickname from there.
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2) {
                languageValue = sp[2];
            }
        }
        // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue - use default one
        if (window.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
            languageValue = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }
        if (languageValue) {
            // 4. Set the current language if we have a related decision.
            setCurrentLanguage(languageValue);
        }
        // 5. Set the language config.
        if (window.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    // Don't display anything if current language information is unavailable.
    if (!currentLanguage || !languageConfig) {
        return null;
    }

    // The following function switches the current language
    const switchLanguage = (lang) => {
        // We just need to set the related cookie and reload the page
        // "/auto/" prefix is Google's definition as far as a cookie name
        setCookie(null, COOKIE_NAME, '/auto/' + lang);
        window.location.reload();
    };

    return (
        <div className="relative group">
            <button className='xl:block hidden md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'>
                <IconWorld className='stroke-[1.5]' />
            </button>
            <div className='bg-card-color text-font-color rounded-xl overflow-auto max-h-[50svh] no-scrollbar w-[200px] shadow-shadow-lg absolute end-0 top-full origin-top-right rtl:origin-top-left z-[1] opacity-0 invisible scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:scale-100'>
                <ul>
                    {languageConfig.languages.map((ld, i) => (
                        <li key={i} className='py-2 px-3 border-b border-dashed border-border-color transition-all hover:bg-primary-10'>
                            {currentLanguage === ld.name ||
                            (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name) ? (
                                <span className="text-primary cursor-default">
                                    {ld.title}
                                </span>
                            ) : (
                                <button
                                    onClick={() => switchLanguage(ld.name)}
                                    className="text-font-color cursor-pointer hover:underline text-left w-full"
                                >
                                    {ld.title}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME };