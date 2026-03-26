import { dummyjson } from '@/src/shared/api/dummyjson'

describe('dummyjson (cliente axios)', () => {
  it('tiene la baseURL correcta cuando BASE_URL no está definida', () => {
    // En el entorno de test BASE_URL no está definida, así que debe usar el fallback
    expect(dummyjson.defaults.baseURL).toBe('https://dummyjson.com')
  })

  it('tiene el header Content-Type: application/json', () => {
    const contentType = dummyjson.defaults.headers?.['Content-Type']
      ?? (dummyjson.defaults.headers as Record<string, unknown>)?.common?.['Content-Type']

    expect(contentType).toBe('application/json')
  })

  it('usa BASE_URL del entorno cuando está definida', () => {
    const originalEnv = process.env.BASE_URL

    // Simulamos que la variable de entorno está definida
    process.env.BASE_URL = 'https://custom-api.com'

    // Re-importamos el módulo para obtener la instancia con la nueva variable
    jest.resetModules()
    const { dummyjson: freshInstance } = require('@/src/shared/api/dummyjson')

    expect(freshInstance.defaults.baseURL).toBe('https://custom-api.com')

    // Restauramos el entorno original
    process.env.BASE_URL = originalEnv
    jest.resetModules()
  })
})
