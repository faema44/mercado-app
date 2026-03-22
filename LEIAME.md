# 🛒 Mercado — PWA (Progressive Web App)

## Como instalar no celular Android

### Opção A: Via Google Drive (mais fácil)
1. Suba a pasta `mercado-pwa` para o Google Drive
2. Abra o Google Drive no celular
3. Baixe e extraia os arquivos

### Opção B: Via cabo USB
1. Conecte o celular ao computador via USB
2. Copie a pasta `mercado-pwa` para o celular (ex: pasta Downloads)
3. No celular, abra o gerenciador de arquivos
4. Navegue até a pasta e toque em `index.html`
5. Escolha abrir com **Chrome**

### Opção C: Via servidor local (recomendado para editar)
Se tiver Python instalado no computador:
```bash
cd mercado-pwa
python -m http.server 8080
```
Acesse no celular (mesma rede Wi-Fi): `http://SEU-IP:8080`

---

## Instalar como App Android (tela cheia, sem barra do navegador)

1. Abra o `index.html` no **Chrome** do Android
2. Toque no menu **⋮** (três pontos, canto superior direito)
3. Toque em **"Adicionar à tela inicial"** ou **"Instalar app"**
4. Confirme — o app aparecerá na sua tela inicial com ícone próprio!

> 💡 A partir daí, abre direto como app, sem barra do Chrome, funciona offline!

---

## Como fazer alterações futuras

Abra o arquivo `index.html` em qualquer editor de texto. As partes mais fáceis de editar:

### Mudar cores do app
Procure por `:root {` e edite as variáveis CSS:
```css
--accent: #ff7043;        /* cor principal (laranja) */
--bg: #f5f0eb;            /* fundo */
--surface: #fffdf9;       /* cards */
```

### Mudar categorias padrão
Procure por `DEFAULT_CATS` no JavaScript:
```javascript
const DEFAULT_CATS = [
  {id:'c1', name:'Frutas', icon:'🍎', color:'#ffd6e0'},
  ...
];
```

### Mudar ícones disponíveis
Procure por `const ICONS = [` e adicione/remova emojis.

### Mudar cores disponíveis
Procure por `const COLORS = [` e adicione/remova cores em formato hex.

---

## Arquivos do projeto

```
mercado-pwa/
├── index.html      ← O app todo (HTML + CSS + JavaScript)
├── manifest.json   ← Configuração do PWA (nome, ícone, cores)
├── sw.js           ← Service Worker (modo offline)
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-192.png
    └── icon-512.png
```

> 💾 Todos os dados (categorias, produtos, listas) ficam salvos **no próprio celular**, no armazenamento local do Chrome. Não precisa de internet nem servidor!

---

## ☁️ Firebase — Configuração das Regras de Segurança

Após 30 dias o modo de teste expira. Para não perder o acesso, configure as regras:

1. Acesse o console Firebase → **Firestore Database** → aba **Regras**
2. Substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /grupos/{grupoId} {
      allow read, write: if true;
      match /listas/{listaId} {
        allow read, write: if true;
      }
    }
  }
}
```

3. Clique em **Publicar**

> Para mais segurança no futuro, adicione autenticação e restrinja por usuário.

## ☁️ Grupos de sincronização

- **Grupo `default`**: público, qualquer pessoa com o app acessa
- **Grupo personalizado** (ex: `familia-silva`): só quem souber o nome acessa
- Troque o grupo em 💾 → "Grupo de sincronização"
