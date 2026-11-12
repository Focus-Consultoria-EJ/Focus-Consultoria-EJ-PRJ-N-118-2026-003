import { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import './Styles/CriarPostStyles.css';
import MarkdownPreview from '../components/MarkdownPreview/MarkdownPreview.jsx';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote,
  Link as LinkIcon, Image as PictureIcon
} from 'lucide-react';
import { actions } from '../utils/markdownActions.js';

const USER_EMAIL = 'usuario@exemplo.com';
const CATEGORIES = ['Comércio Exterior', 'Cultura e RI', 'Geopolítica', 'Notícias', 'Sem categoria'];
const PLACEHOLDER = `Escreva o artigo em Markdown.

## Subtítulo
### Subtítulo menor

**negrito**, *itálico*, [link](https://exemplo.com)

- item de lista
1. item numerado

> citação

![legenda da imagem](https://url-da-imagem.jpg)`;

/* ---------- Ícones SVG inline (decorativos) ---------- */
function Icon({ children }) {
  return (
    <svg className="criar-post-icon" viewBox="0 0 24 24" width="18" height="18" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const KeyIcon = () => (<Icon><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M17 6l3 3M14 9l3 3" /></Icon>);
const EyeIcon = () => (<Icon><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>);
const CalendarIcon = () => (<Icon><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>);
const ImageIcon = () => (<Icon><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" /><path d="M3 17l5-5 4 4M17 3v6M14 6h6" /></Icon>);

/* ---------- Cartão "Publicar" ---------- */
function PublishCard({ canPublish, onDraft, onPublish }) {
  return (
    <section className="criar-post-card">
      <h2 className="criar-post-card-title">Publicar</h2>
      <div className="criar-post-card-body">
        <button type="button" className="criar-post-btn-draft" onClick={onDraft}>Salvar como rascunho</button>
        <p className="criar-post-meta-row"><KeyIcon />Status: <strong>Rascunho</strong></p>
        <p className="criar-post-meta-row"><EyeIcon />Visibilidade: <strong>Público</strong></p>
        <p className="criar-post-meta-row">
          <CalendarIcon />Publicar <strong>imediatamente</strong>
         <button type="button" className="criar-post-link-btn" onClick={() => console.log('Editar data')}>Editar</button>
        </p>
        <div className="criar-post-publish-actions">
          <button type="button" className="criar-post-btn-publish" disabled={!canPublish} onClick={onPublish}>
            Publicar
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Cartão "Categorias" ---------- */
function CategoriesCard({ category, onChange }) {
  return (
    <section className="criar-post-card">
      <h2 className="criar-post-card-title">Categorias</h2>
      <fieldset className="criar-post-fieldset">
        <legend className="criar-post-sr-only">Categorias</legend>
        {CATEGORIES.map((name) => (
          <label key={name} className="criar-post-radio">
            <input type="radio" name="categoria" value={name}
              checked={category === name} onChange={() => onChange(name)} />
            {name}
          </label>
        ))}
      </fieldset>
    </section>
  );
}

/* ---------- Cartão "Imagem de capa" ---------- */
function CoverImageCard() {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Imagem selecionada:', file);
    }
  };

  return (
    <section className="criar-post-card">
      <h2 className="criar-post-card-title">Imagem de capa</h2>
      <div className="criar-post-card-body">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
          id="cover-image-input"
        />
        <button
          type="button"
          className="criar-post-link-btn criar-post-upload"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon /> Enviar imagem
        </button>
      </div>
    </section>
  )
}

/* ---------- Barra de formatação ---------- */
const TOOLS = [
  { id: 'h2', label: 'Subtítulo', hint: '##', icon: Heading2 },
  { id: 'h3', label: 'Subtítulo menor', hint: '###', icon: Heading3 },
  { id: 'bold', label: 'Negrito', hint: '**texto**', icon: Bold },
  { id: 'italic', label: 'Itálico', hint: '*texto*', icon: Italic },
  { id: 'ul', label: 'Lista com marcadores', hint: '-', icon: List },
  { id: 'ol', label: 'Lista numerada', hint: '1.', icon: ListOrdered },
  { id: 'quote', label: 'Citação', hint: '>', icon: Quote },
  { id: 'link', label: 'Link', hint: '[texto](url)', icon: LinkIcon },
  { id: 'image', label: 'Imagem', hint: '![legenda](url)', icon: PictureIcon },
];

function EditorToolbar({ onAction }) {
  return (
    <div className="criar-post-toolbar" role="toolbar" aria-label="Formatação do texto">
      {TOOLS.map(({ id, label, hint, icon: ToolIcon }) => (
        <button key={id} type="button" className="criar-post-tool"
          aria-label={label} title={`${label} (${hint})`} onClick={() => onAction(id)}>
          <ToolIcon size={18} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

/* ---------- Página ---------- */
export default function CriarPost() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Sem categoria');
  const [tab, setTab] = useState('escrever'); // 'escrever' | 'visualizar'
  const textareaRef = useRef(null);

 // 1. Remove marcadores comuns de Markdown e caracteres especiais isolados
const cleanContent = content
  .replace(/^#{1,6}\s+/gm, '') 
  .replace(/[*_~`>#\-+]/g, ' ') 
  .trim();

// 2. Contagem de palavras sobre o texto limpo
const words = cleanContent === '' ? 0 : cleanContent.split(/\s+/).filter(word => word.length > 0).length;

const canPublish = title.trim() !== '';

const save = (status) => console.log({ status, title, slug, content, summary, category, words });
function applyAction(id) {
  const el = textareaRef.current;
  if (!el) return;
  const result = actions[id](content, el.selectionStart, el.selectionEnd);
  setContent(result.text);
  requestAnimationFrame(() => {
    el.focus();
    el.setSelectionRange(result.selStart, result.selEnd);
  });
}
  return (
    <div className="criar-post-page">
      <Sidebar userEmail={USER_EMAIL} onLogout={() => console.log('Sair')} />
      <main className="criar-post-main">
        <h1 className="criar-post-heading">Adicionar post</h1>
        <div className="criar-post-grid">
          <div className="criar-post-form">
            <label className="criar-post-sr-only" htmlFor="criar-post-title">Adicionar título</label>
            <input id="criar-post-title" className="criar-post-title-input" type="text"
              placeholder="Adicionar título" value={title} onChange={(e) => setTitle(e.target.value)} />

            <div className="criar-post-slug-row">
              <label htmlFor="criar-post-slug">Endereço: /blog/</label>
              <input id="criar-post-slug" className="criar-post-slug-input" type="text"
                value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>

            <section className="criar-post-editor">
              <div className="criar-post-editor-header">
                <span>Conteúdo</span>
                <div className="criar-post-tabs" role="tablist" aria-label="Modo do Editor">
                  <button
                    type="button"
                    role="tab"
                    id="tab-escrever"
                    aria-selected={tab === 'escrever'}
                    aria-controls="panel-escrever"
                    className="criar-post-tab"
                    onClick={() => setTab('escrever')}
                  >
                    Escrever
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-visualizar"
                    aria-selected={tab === 'visualizar'}
                    aria-controls="panel-visualizar"
                    className="criar-post-tab"
                    onClick={() => setTab('visualizar')}
                  >
                    Visualizar
                  </button>
                </div>
              </div>
              {tab === 'escrever' ? (
                <div
                  id="panel-escrever"
                  role="tabpanel"
                  aria-labelledby="tab-escrever"
                >
                  <EditorToolbar onAction={applyAction} />
                  <label className="criar-post-sr-only" htmlFor="criar-post-content">Conteúdo</label>
                  <textarea ref={textareaRef} id="criar-post-content" className="criar-post-textarea"
                    placeholder={PLACEHOLDER} value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
              ) : (
                <div
                  id="panel-visualizar"
                  role="tabpanel"
                  aria-labelledby="tab-visualizar"
                  className="criar-post-preview"
                >
                  {content.trim() ? <MarkdownPreview value={content} /> : 'Nada para visualizar'}
                </div>
              )}
              <div className="criar-post-editor-footer">
                <p>Aceita Markdown: <code>##</code> subtítulo, <code>**negrito**</code>, <code>*itálico*</code>, - lista, <code>1.</code> numerada, <code>[texto](link)</code>, &gt; citação, tabelas e imagens.</p>
                <p>Palavras: {words}</p>
              </div>
            </section>

            <label className="criar-post-summary-label" htmlFor="criar-post-summary">
              Resumo (aparece na lista do blog)
            </label>
            <textarea id="criar-post-summary" className="criar-post-summary"
              value={summary} onChange={(e) => setSummary(e.target.value)} />
          </div>

          <div className="criar-post-side">
            <PublishCard canPublish={canPublish} onDraft={() => save('rascunho')} onPublish={() => save('publicado')} />
            <CategoriesCard category={category} onChange={setCategory} />
            <CoverImageCard />
          </div>
        </div>
      </main>
    </div>
  );
}
