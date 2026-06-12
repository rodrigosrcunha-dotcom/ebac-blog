import Link from 'next/link';
import artigos from '../data/artigos.json';

interface Artigo {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
  imagem: string;
}

export default function HomePage() {
  const dadosArtigos = artigos as Artigo[];

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.8rem', color: '#111' }}>
        Meu Blog Tech
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {dadosArtigos.map((artigo) => (
          <Link href={`/artigos/${artigo.slug}`} key={artigo.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              backgroundColor: '#fff',
              border: '1px solid #eee', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              cursor: 'pointer'
            }}>
              <img 
                src={artigo.imagem} 
                alt={artigo.titulo}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '1.3rem', margin: '0 0 10px 0', color: '#111' }}>{artigo.titulo}</h2>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{artigo.descricao}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}