import tailwindcssTypography from '@tailwindcss/typography';
import { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { getColorSpread } from './build-utils/getColorSpread';
// NOTE: It's not possible to export css modules on this stage
import { primaryColor, secondaryColor } from './src/config/themeColors';

// Core app color definitions
// UNUSED? Construct primary/secondary colors spread tables
// (with keys 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) from key colors.
const primaryColorSpread = getColorSpread('primary', primaryColor);
const secondaryColorSpread = getColorSpread('secondary', secondaryColor);

export default {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  prefix: '',
  theme: {
    extend: {
      colors: {
        margo: '#0f0',
        background: 'var(--backgroundColor)',
        foreground: 'var(--foregroundColor)',
        ...primaryColorSpread,
        ...secondaryColorSpread,
        border: 'var(--borderColor)',
        input: 'var(--inputColor)',
        ring: 'var(--ringColor)',
        'background-light': 'var(--backgroundLightColor)',
        'foreground-light': 'var(--foregroundLightColor)',
        'background-dark': 'var(--backgroundDarkColor)',
        'foreground-dark': 'var(--foregroundDarkColor)',
        destructive: {
          DEFAULT: 'var(--appDestructiveColor)',
          foreground: 'var(--appDestructiveForegroundColor)',
        },
        // Theme colors
        'theme-foreground': '#fff',
        theme: 'rgb(var(--theme-color-500-RGB))',
        'theme-50': 'rgb(var(--theme-color-50-RGB))',
        'theme-100': 'rgb(var(--theme-color-100-RGB))',
        'theme-200': 'rgb(var(--theme-color-200-RGB))',
        'theme-300': 'rgb(var(--theme-color-300-RGB))',
        'theme-400': 'rgb(var(--theme-color-400-RGB))',
        'theme-500': 'rgb(var(--theme-color-500-RGB))',
        'theme-600': 'rgb(var(--theme-color-600-RGB))',
        'theme-700': 'rgb(var(--theme-color-700-RGB))',
        'theme-800': 'rgb(var(--theme-color-800-RGB))',
        'theme-900': 'rgb(var(--theme-color-900-RGB))',
        'theme-950': 'rgb(var(--theme-color-950-RGB))',
        success: {
          DEFAULT: 'var(--appSuccessColor)',
          foreground: 'var(--appSuccessForegroundColor)',
        },
        error: {
          // DEFAULT: 'var(--backgroundColor)',
          DEFAULT: 'var(--errorColor)',
        },
        muted: {
          DEFAULT: 'var(--mutedColor)',
          foreground: 'var(--mutedForegroundColor)',
        },
        accent: {
          DEFAULT: 'var(--accentColor)',
          foreground: 'var(--accentForegroundColor)',
        },
        popover: {
          DEFAULT: 'var(--popoverColor)',
          foreground: 'var(--popoverForegroundColor)',
        },
        card: {
          DEFAULT: 'var(--cardColor)',
          foreground: 'var(--cardForegroundColor)',
        },
      },
      borderRadius: {
        lg: 'var(--borderRadiusSize)',
        md: 'calc(var(--borderRadiusSize) - 2px)',
        sm: 'calc(var(--borderRadiusSize) - 4px)',
      },
      fontFamily: {
        default: ['var(--font-default)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
        // sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        // urban: ['var(--font-urban)', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Fade up and down
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '80%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        // Fade in and out
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
        /* // EXAMPLE: Sonner toast rotating spinner
         * 'rotating-spin': {
         *   '100%': {
         *     transform: 'rotate(360deg)',
         *   },
         * },
         */
      },
      animation: {
        /* // EXAMPLE: Sonner toast rotating spinner
         * 'loading-wrapper': 'rotating-spin 4s linear infinite',
         */

        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        // Fade up and down
        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',

        // Fade in and out
        'fade-in': 'fade-in 0.4s',
        'fade-out': 'fade-out 0.4s',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config;
