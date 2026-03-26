import { renderHook } from '@testing-library/react'
import { useIsMounted } from '@/src/shared/hooks/useIsMounted'

describe('useIsMounted', () => {
  it('retorna true en el cliente (jsdom)', () => {
    const { result } = renderHook(() => useIsMounted())
    // En jsdom (entorno de test), useSyncExternalStore usa el snapshot del cliente
    expect(result.current).toBe(true)
  })
})
