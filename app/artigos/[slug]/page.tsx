import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import artigos from '../../../data/artigos.json';

interface Artigo {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
  conteudo: string;
  imagem: string;
}

const dadosArtigos = artigos as Artigo[];

interface Props {
  params: Promise<{ slug: string }>;
}

// SEO Dinâmico
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = dadosArtigos.find((a) => a.slug === slug);
  return {
    title: artigo ? `${artigo.titulo} | Blog` : 'Artigo não encontrado',
    description: artigo?.descricao,
  };
}

// Geração Estática das Rotas (SSG)
export async function generateStaticParams() {
  return dadosArtigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

// Página interna do Artigo
export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = dadosArtigos.find((a) => a.slug === slug);

  if (!artigo) {
    notFound();
  }

  return (
    <article style={{ 
      maxWidth: '700px', 
      margin: '0 auto', 
      padding: '40px 20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#333',
      lineHeight: '1.8'
    }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#111', lineHeight: '1.3' }}>
          {artigo.titulo}
        </h1>
        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
          <span>Por <strong>{artigo.autor}</strong></span> • <span>{artigo.data}</span>
        </div>
      </header>

      <div style={{ width: '100%', height: '400px', marginBottom: '30px', borderRadius: '12px', overflow: 'hidden' }}>
        <img 
          src={artigo.imagem} 
          alt={artigo.titulo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <section style={{ fontSize: '1.15rem', whiteSpace: 'pre-line', color: '#222' }}>
        {artigo.conteudo}
      </section>

      <footer style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: '600' }}>
          ← Voltar para a lista de artigos
        </a>
      </footer>
    </article>
  );
}