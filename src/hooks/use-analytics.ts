import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Only track dashboard page visits
        if (!pathname.includes('/dashboard')) {
          await fetch('/api/analytics/track', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              page: 'dashboard',
              userAgent: navigator.userAgent,
              referrer: document.referrer
            })
          })
        }
      } catch (error) {
        console.error('Error tracking analytics:', error)
      }
    }

    trackPageView()
  }, [pathname])
} 