// Invoice DApp Theme Configuration
// Developer: ahmetsagdasli
// Date: 2025-08-03

export const theme = {
  colors: {
    primary: '#3B82F6',     // Blue
    secondary: '#10B981',   // Green
    accent: '#F59E0B',      // Amber
    danger: '#EF4444',      // Red
    warning: '#F59E0B',     // Orange
    success: '#10B981',     // Green
    info: '#3B82F6',        // Blue
    
    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      dark: '#1F2937'
    },
    
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      light: '#9CA3AF',
      white: '#FFFFFF'
    },
    
    // Border colors
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF'
    }
  },
  
  fonts: {
    primary: 'Inter, system-ui, -apple-system, sans-serif',
    secondary: 'Georgia, serif',
    mono: 'Fira Code, Monaco, monospace'
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      ease: 'ease',
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
  }
};

export default theme;

// CSS Variables export için
export const cssVariables = {
  '--color-primary': theme.colors.primary,
  '--color-secondary': theme.colors.secondary,
  '--color-accent': theme.colors.accent,
  '--color-success': theme.colors.success,
  '--color-danger': theme.colors.danger,
  '--color-warning': theme.colors.warning,
  '--font-primary': theme.fonts.primary,
  '--border-radius': theme.borderRadius.md,
  '--shadow-md': theme.shadows.md
};
