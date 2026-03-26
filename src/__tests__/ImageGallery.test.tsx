import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageGallery } from '@/src/features/products/components/ImageGallery'

const props = {
  thumbnail: 'https://example.com/thumb.jpg',
  images: [
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg',
    'https://example.com/img3.jpg',
  ],
  title: 'Producto de prueba',
}

describe('ImageGallery', () => {
  it('muestra la primera imagen como imagen principal', () => {
    render(<ImageGallery {...props} />)

    const mainImage = screen.getByAltText('Producto de prueba')
    expect(mainImage).toHaveAttribute('src', props.images[0])
  })

  it('muestra todos los thumbnails', () => {
    render(<ImageGallery {...props} />)

    const thumbs = screen.getAllByRole('img')
    // 1 imagen principal + 3 miniaturas = 4
    expect(thumbs).toHaveLength(4)
  })

  it('cambia la imagen principal al hacer click en una miniatura', async () => {
    render(<ImageGallery {...props} />)

    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[1]) // segunda miniatura

    const mainImage = screen.getByAltText('Producto de prueba')
    expect(mainImage).toHaveAttribute('src', props.images[1])
  })

  it('aplica borde orange a la miniatura seleccionada', async () => {
    render(<ImageGallery {...props} />)

    const buttons = screen.getAllByRole('button')

    // Por defecto el primero está activo
    expect(buttons[0].className).toContain('border-orange-400')
    expect(buttons[1].className).not.toContain('border-orange-400')

    // Al hacer click en el segundo se activa
    await userEvent.click(buttons[1])
    expect(buttons[1].className).toContain('border-orange-400')
    expect(buttons[0].className).not.toContain('border-orange-400')
  })

  it('usa el thumbnail si no hay imágenes', () => {
    render(<ImageGallery thumbnail={props.thumbnail} images={[]} title="Sin imágenes" />)

    const mainImage = screen.getByAltText('Sin imágenes')
    expect(mainImage).toHaveAttribute('src', props.thumbnail)
  })

  it('no muestra miniaturas si solo hay una imagen', () => {
    render(<ImageGallery thumbnail={props.thumbnail} images={['https://example.com/only.jpg']} title="Una imagen" />)

    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })
})
