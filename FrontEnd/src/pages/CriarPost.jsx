
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';
import MarkdownPreview from '../components/MarkdownPreview/MarkdownPreview.jsx';

import {
  criarPost,
  buscarPost,
  editarPost,
  listarCategorias,
  uploadCapa,
  obterUrlCapa,
} from '../services/PostsService.js';

import { logoutBlog } from '../services/BlogAuthService.js';

import './Styles/CriarPostStyles.css';

import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
} from 'lucide-react';

import { actions } from '../utils/markdownActions.js';

const USER_EMAIL = 'usuario@exemplo.com';

const PLACEHOLDER = `Escreva o artigo em Markdown.

## Subtítulo
### Subtítulo menor

**negrito**, *itálico*, [link](https://exemplo.com)

- item de lista
1. item numerado

> citação

![legenda da imagem](https://url-da-imagem.jpg)`;

// Ícones SVG
function Icon({ children }) {
  return (
    <svg
      className="criar-post-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const KeyIcon = () => (
  <Icon>
    <circle cx="8" cy="15" r="4" />
    <path d="M11 12l9-9M17 6l3 3M14 9l3 3" />
  </Icon>
);

const EyeIcon = () => (
  <Icon>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
);

const ImageIcon = () => (
  <Icon>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" />
    <path d="M3 17l5-5 4 4M17 3v6M14 6h6" />
  </Icon>
);

// Cartão Publicar
function PublishCard({
  canPublish,
  onDraft,
  onPublish,
  saving,
  scheduling,
  onSchedulingChange,
  scheduledDate,
  onScheduledDateChange,
  modoEdicao,
  statusAtual,
  disabled,
}) {
  return (
    <section className="criar-post-card">
      <h2 className="criar-post-card-title">
        Publicar
      </h2>

      <div className="criar-post-card-body">
        <button
          type="button"
          className="criar-post-btn-draft"
          onClick={onDraft}
          disabled={saving || disabled}
        >
          {saving ? 'Salvando...' : 'Salvar como rascunho'}
        </button>

        <p className="criar-post-meta-row">
          <KeyIcon />
          Status: <strong>{modoEdicao ? (statusAtual === 'agendado' ? 'Agendado' : statusAtual === 'publicado' ? 'Publicado' : 'Rascunho') : 'Rascunho'}</strong>
        </p>

        <p className="criar-post-meta-row">
          <EyeIcon />
          Visibilidade: <strong>Público após publicação</strong>
        </p>

        <p className="criar-post-meta-row">
          <CalendarIcon />
          Publicação
        </p>

        <div style={{ marginBottom: '12px' }}>
          <label className="criar-post-radio">
            <input
              type="radio"
              name="tipo-publicacao"
              checked={!scheduling}
              onChange={() => onSchedulingChange(false)}
              disabled={saving || disabled}
            />
            Imediatamente
          </label>

          <label className="criar-post-radio">
            <input
              type="radio"
              name="tipo-publicacao"
              checked={scheduling}
              onChange={() => onSchedulingChange(true)}
              disabled={saving || disabled}
            />
            Agendar publicação
          </label>
        </div>

        {scheduling && (
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="criar-post-data-publicacao"
              style={{
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Data e horário da publicação
            </label>

            <input
              id="criar-post-data-publicacao"
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) =>
                onScheduledDateChange(e.target.value)
              }
              disabled={saving || disabled}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        )}

        <div className="criar-post-publish-actions">
          <button
            type="button"
            className="criar-post-btn-publish"
            disabled={!canPublish || saving || disabled}
            onClick={onPublish}
          >
            {saving
              ? 'Salvando...'
              : scheduling
                ? 'Agendar publicação'
                : modoEdicao ? 'Salvar e publicar' : 'Publicar'}
          </button>
        </div>
      </div>
    </section>
  );
}

// Cartão Categorias
function CategoriesCard({
  categories,
  selectedCategories,
  onChange,
  loading,
  error,
  disabled,
}) {
  return (
    <section className="criar-post-card">
      <h2 className="criar-post-card-title">
        Categorias
      </h2>

      <fieldset
        className="criar-post-fieldset"
        disabled={disabled || loading || Boolean(error)}
      >
        <legend className="criar-post-sr-only">
          Categorias
        </legend>

        {loading ? (
          <p>Carregando categorias...</p>
        ) : error ? (
          <p role="alert" style={{ color: '#dc2626' }}>
            {error}
          </p>
        ) : categories.length === 0 ? (
          <p>Nenhuma categoria disponível.</p>
        ) : (
          categories.map((category) => (
            <label
              key={category.id}
              className="criar-post-radio"
            >
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategories.includes(
                  category.id
                )}
                onChange={() => onChange(category.id)}
              />

              {category.nome}
            </label>
          ))
        )}
      </fieldset>
    </section>
  );
}

// Cartão Imagem de capa
function CoverImageCard({
  arquivo,
  capa,
  onArquivoChange,
  onRemover,
  disabled,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!arquivo) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(arquivo);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [arquivo]);

  const imagemUrl = preview || obterUrlCapa(capa);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(
        file.type
      )
    ) {
      window.alert('Escolha uma imagem JPG, PNG ou WebP.');
      event.target.value = '';
      return;
    }

    if (!file.size || file.size > 5 * 1024 * 1024) {
      window.alert('A imagem deve ter no máximo 5 MB.');
      event.target.value = '';
      return;
    }

    onArquivoChange(file);
    event.target.value = '';
  };

  return (
    <section className="criar-post-card">
      <h2 className="criar-post-card-title">
        Imagem de capa
      </h2>

      <div className="criar-post-card-body">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          id="cover-image-input"
          disabled={disabled}
        />

        {imagemUrl && (
          <img
            src={imagemUrl}
            alt="Pré-visualização da capa"
            style={{
              width: '100%',
              maxHeight: 220,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 12,
            }}
          />
        )}

        <button
          type="button"
          className="criar-post-link-btn criar-post-upload"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <ImageIcon />
          {imagemUrl
            ? 'Trocar imagem'
            : 'Selecionar imagem'}
        </button>

        {imagemUrl && (
          <button
            type="button"
            className="criar-post-link-btn"
            onClick={onRemover}
            disabled={disabled}
            style={{ marginLeft: 8 }}
          >
            Remover capa
          </button>
        )}

        {arquivo && (
          <p style={{ fontSize: 12 }}>
            Selecionada: {arquivo.name}
          </p>
        )}

        <p style={{ fontSize: 12, opacity: 0.7 }}>
          JPG, PNG ou WebP. Máximo de 5 MB.
          A imagem será enviada ao salvar.
        </p>
      </div>
    </section>
  );
}

// Ferramentas Markdown
const TOOLS = [
  {
    id: 'h2',
    label: 'Subtítulo',
    hint: '##',
    icon: Heading2,
  },
  {
    id: 'h3',
    label: 'Subtítulo menor',
    hint: '###',
    icon: Heading3,
  },
  {
    id: 'bold',
    label: 'Negrito',
    hint: '**texto**',
    icon: Bold,
  },
  {
    id: 'italic',
    label: 'Itálico',
    hint: '*texto*',
    icon: Italic,
  },
  {
    id: 'ul',
    label: 'Lista com marcadores',
    hint: '-',
    icon: List,
  },
  {
    id: 'ol',
    label: 'Lista numerada',
    hint: '1.',
    icon: ListOrdered,
  },
  {
    id: 'quote',
    label: 'Citação',
    hint: '>',
    icon: Quote,
  },
  {
    id: 'link',
    label: 'Link',
    hint: '[texto](url)',
    icon: LinkIcon,
  },
];

function EditorToolbar({ onAction }) {
  return (
    <div
      className="criar-post-toolbar"
      role="toolbar"
      aria-label="Formatação do texto"
    >
      {TOOLS.map(
        ({ id, label, hint, icon: ToolIcon }) => (
          <button
            key={id}
            type="button"
            className="criar-post-tool"
            aria-label={label}
            title={`${label} (${hint})`}
            onClick={() => onAction(id)}
          >
            <ToolIcon
              size={18}
              aria-hidden="true"
            />
          </button>
        )
      )}
    </div>
  );
}

// Página principal
export default function CriarPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const modoEdicao = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');

  const [capa, setCapa] = useState(null);
  const [arquivoCapa, setArquivoCapa] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [categoriesError, setCategoriesError] =
    useState('');

  const [tab, setTab] = useState('escrever');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loadingPost, setLoadingPost] = useState(Boolean(id));
  const [statusAtual, setStatusAtual] = useState('rascunho');

  const [scheduling, setScheduling] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      try {
        const resultado = await listarCategorias();

        if (ativo) {
          setCategories(resultado);
          setCategoriesError('');
        }
      } catch (err) {
        if (ativo) {
          setCategoriesError(
            err.message ||
              'Não foi possível carregar as categorias.'
          );
        }
      } finally {
        if (ativo) {
          setLoadingCategories(false);
        }
      }
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  function paraDataLocal(valor) {
    if (!valor) return '';

    const data = new Date(valor);

    if (!Number.isFinite(data.getTime())) return '';

    const local = new Date(
      data.getTime() -
        data.getTimezoneOffset() * 60000
    );

    return local.toISOString().slice(0, 16);
  }

  useEffect(() => {
    if (!modoEdicao) return;

    let ativo = true;

    async function carregarPost() {
      setLoadingPost(true);
      setError('');

      try {
        const post = await buscarPost(id);

        if (!ativo) return;

        setTitle(post.titulo ?? '');
        setSlug(post.pontoChave ?? '');
        setAuthor(post.autor ?? '');
        setContent(post.conteudo ?? '');
        setSummary(post.resumo ?? '');
        setStatusAtual(post.status ?? 'rascunho');

        setCapa(post.capa ?? null);
        setArquivoCapa(null);

        const agendado = post.status === 'agendado';

        setScheduling(agendado);

        setScheduledDate(
          agendado
            ? paraDataLocal(post.dataPublicacao)
            : ''
        );

        const ids = (post.POST_CATEGORIA ?? [])
          .map((relacao) => relacao.CATEGORIA?.id)
          .filter(Boolean);

        setSelectedCategories(ids);
      } catch (err) {
        if (ativo) {
          setError(
            err.message ||
              'Não foi possível carregar o post.'
          );
        }
      } finally {
        if (ativo) {
          setLoadingPost(false);
        }
      }
    }

    carregarPost();

    return () => {
      ativo = false;
    };
  }, [id, modoEdicao]);

  const words = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  const canPublish =
    title.trim().length > 0 &&
    slug.trim().length > 0 &&
    author.trim().length > 0 &&
    content.trim().length > 0 &&
    summary.trim().length > 0 &&
    !saving &&
    !loadingPost;

  function toggleCategory(idCategoria) {
    const categoria = categories.find(
      (item) => item.id === idCategoria
    );

    const semCategoria = categories.find(
      (item) =>
        item.nome.trim().toLowerCase() ===
        'sem categoria'
    );

    setSelectedCategories((atual) => {
      if (atual.includes(idCategoria)) {
        return atual.filter(
          (item) => item !== idCategoria
        );
      }

      if (
        semCategoria &&
        categoria?.id === semCategoria.id
      ) {
        return [semCategoria.id];
      }

      return [
        ...atual.filter(
          (item) => item !== semCategoria?.id
        ),
        idCategoria,
      ];
    });
  }

  function applyAction(actionId) {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const action = actions[actionId];

    if (!action) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end);

    const result = action(selectedText);

    const newContent =
      content.slice(0, start) +
      result +
      content.slice(end);

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start,
        start + result.length
      );
    });
  }

  function removerCapa() {
    setArquivoCapa(null);
    setCapa(null);
  }

  async function save(status) {
    if (saving || loadingPost) return;

    setError('');

    if (!canPublish) {
      setError(
        'Preencha todos os campos obrigatórios.'
      );
      return;
    }

    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        slug.trim()
      )
    ) {
      setError(
        'O slug deve conter apenas letras minúsculas, números e hífens.'
      );
      return;
    }

    let dataPublicacao = null;

    if (status === 'agendado') {
      if (!scheduledDate) {
        setError(
          'Informe uma data e horário para o agendamento.'
        );
        return;
      }

      const data = new Date(scheduledDate);

      if (
        !Number.isFinite(data.getTime()) ||
        data.getTime() <= Date.now()
      ) {
        setError(
          'A data de agendamento deve ser futura.'
        );
        return;
      }

      dataPublicacao = data.toISOString();
    }

    setSaving(true);

    try {
      let caminhoCapa = capa;

      if (arquivoCapa) {
        const resultadoUpload = await uploadCapa(
          arquivoCapa
        );

        if (!resultadoUpload?.caminho) {
          throw new Error(
            'Não foi possível obter o caminho da imagem.'
          );
        }

        caminhoCapa = resultadoUpload.caminho;
      }

      const dados = {
        autor: author.trim(),
        titulo: title.trim(),
        slug: slug.trim(),
        conteudo: content,
        resumo: summary.trim(),
        status,
        dataPublicacao,
        categorias: selectedCategories,
        capa: caminhoCapa,
      };

      if (modoEdicao) {
        await editarPost(id, dados);
      } else {
        await criarPost(dados);
      }

      navigate('/geral-posts');
    } catch (err) {
      setError(
        err.message ||
          'Não foi possível salvar o post.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="criar-post-page">
      <Sidebar />

      <main className="criar-post-main">
        <header className="criar-post-header">
          <h1 className="criar-post-heading">
        {modoEdicao ? 'Editar post' : 'Criar novo post'}
          </h1>
        </header>

        {error && (
          <div
            role="alert"
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        {loadingPost ? (
          <p>Carregando post...</p>
        ) : (
          <div className="criar-post-grid">
            <div className="criar-post-form">
              <div className="criar-post-field">
                <label
                  htmlFor="criar-post-heading"
                  className="criar-post-label"
                >
                  Título do post
                </label>

                <input
                  id="criar-post-heading"
                  type="text"
                  className="criar-post-tittle-input"
                  placeholder="Digite o título do artigo"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  disabled={saving}
                />
              </div>

              <div className="criar-post-field">
                <label
                  htmlFor="criar-post-slug"
                  className="criar-post-label"
                >
                  Slug
                </label>

                <input
                  id="criar-post-slug"
                  type="text"
                  className="criar-post-slug-input"
                  placeholder="exemplo-de-titulo"
                  value={slug}
                  onChange={(e) =>
                    setSlug(e.target.value)
                  }
                  disabled={saving}
                />

              </div>

              <div className="criar-post-field">
                <label
                  htmlFor="criar-post-author"
                  className="criar-post-label"
                >
                  Autor
                </label>

                <input
                  id="criar-post-author"
                  type="text"
                  className="criar-post-input"
                  placeholder="Nome do autor"
                  value={author}
                  onChange={(e) =>
                    setAuthor(e.target.value)
                  }
                  disabled={saving}
                />
              </div>

              <section className="criar-post-editor">
                <div className="criar-post-editor-header">
                  <h2>Conteúdo do post</h2>

                  <div
                    className="criar-post-tabs"
                    role="tablist"
                    aria-label="Modo de edição"
                  >
                    <button
                      type="button"
                      id="tab-escrever"
                      role="tab"
                      aria-selected={tab === 'escrever'}
                      aria-controls="panel-escrever"
                      className={
                        tab === 'escrever'
                          ? 'criar-post-tab active'
                          : 'criar-post-tab'
                      }
                      onClick={() =>
                        setTab('escrever')
                      }
                    >
                      Escrever
                    </button>

                    <button
                      type="button"
                      id="tab-visualizar"
                      role="tab"
                      aria-selected={tab === 'visualizar'}
                      aria-controls="panel-visualizar"
                      className={
                        tab === 'visualizar'
                          ? 'criar-post-tab active'
                          : 'criar-post-tab'
                      }
                      onClick={() =>
                        setTab('visualizar')
                      }
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
                    <EditorToolbar
                      onAction={applyAction}
                    />

                    <label
                      className="criar-post-sr-only"
                      htmlFor="criar-post-form"
                    >
                      Conteúdo
                    </label>

                    <textarea
                      ref={textareaRef}
                      id="criar-post-form"
                      className="criar-post-textarea"
                      placeholder={PLACEHOLDER}
                      value={content}
                      onChange={(e) =>
                        setContent(e.target.value)
                      }
                      disabled={saving}
                    />
                  </div>
                ) : (
                  <div
                    id="panel-visualizar"
                    role="tabpanel"
                    aria-labelledby="tab-visualizar"
                    className="criar-post-preview"
                  >
                    {content.trim() ? (
                      <MarkdownPreview
                        value={content}
                      />
                    ) : (
                      'Nada para visualizar'
                    )}
                  </div>
                )}

                <div className="criar-post-editor-footer">
                  <p>
                    Aceita Markdown:{' '}
                    <code>##</code> subtítulo,{' '}
                    <code>**negrito**</code>,{' '}
                    <code>*itálico*</code>, - lista,{' '}
                    <code>1.</code> numerada,{' '}
                    <code>[texto](link)</code>, &gt;
                    citação, tabelas e imagens.
                  </p>

                  <p>Palavras: {words}</p>
                </div>
              </section>

              <label
                className="criar-post-summary-label"
                htmlFor="criar-post-summary"
              >
                Resumo (aparece na lista do blog)
              </label>

              <textarea
                id="criar-post-summary"
                className="criar-post-summary"
                value={summary}
                onChange={(e) =>
                  setSummary(e.target.value)
                }
                disabled={saving}
              />
            </div>

            <div className="criar-post-side">
              <PublishCard
                canPublish={canPublish}
                modoEdicao={modoEdicao}
                statusAtual={statusAtual}
                disabled={loadingPost}
                saving={saving}
                scheduling={scheduling}
                onSchedulingChange={setScheduling}
                scheduledDate={scheduledDate}
                onScheduledDateChange={setScheduledDate}
                onDraft={() => save('rascunho')}
                onPublish={() =>
                  save(
                    scheduling
                      ? 'agendado'
                      : 'publicado'
                  )
                }
              />

              <CategoriesCard
                categories={categories}
                selectedCategories={selectedCategories}
                onChange={toggleCategory}
                loading={loadingCategories}
                error={categoriesError}
                disabled={saving || loadingPost}
              />

              <CoverImageCard
                arquivo={arquivoCapa}
                capa={capa}
                onArquivoChange={setArquivoCapa}
                onRemover={removerCapa}
                disabled={saving || loadingPost}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
