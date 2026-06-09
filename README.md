# 🐦 Twitter Clone - Projeto Final EBAC

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Deploy Frontend](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Deploy Backend](https://img.shields.io/badge/Deploy-Render-blue?logo=render)

Este é um projeto Full Stack desenvolvido como trabalho de conclusão do curso de Engenharia de Software da EBAC (Escola Britânica de Artes Criativas e Tecnologia). Trata-se de um clone funcional das principais mecânicas do Twitter (X), construído com Django no Back-end e React no Front-end.

## 🚀 Links de Produção (Deploy)

- **Front-end (Aplicação Web):** [https://twitter-clone-bybruno.vercel.app](https://twitter-clone-bybruno.vercel.app)
- **Back-end (Painel Admin/API):** [https://twitter-clone-api-3s3p.onrender.com/admin/](https://twitter-clone-api-3s3p.onrender.com/admin/)

---

## 🛠️ Tecnologias Utilizadas

### Back-end (API Restful)

- **Python & Django:** Framework principal.
- **Django REST Framework (DRF):** Construção e roteamento da API.
- **PostgreSQL:** Banco de dados de produção (hospedado no Render).
- **SQLite:** Banco de dados de desenvolvimento local.
- **Autenticação:** JWT (JSON Web Tokens).
- **CI/CD:** GitHub Actions configurado para rodar testes automatizados.
- **Whitenoise & Gunicorn:** Servidor e arquivos estáticos em produção.

### Front-end (Interface Visual)

- **React (com Vite):** Framework principal para construção da UI.
- **Axios:** Integração com a API do Django.
- **Hospedagem:** Vercel.

---

## ⚙️ Como rodar o projeto localmente

Para rodar este projeto na sua máquina, você precisará ter o **Python** e o **Node.js** instalados.

Você pode rodar o Back-end deste projeto de forma automatizada usando Docker (recomendado) ou pelo método tradicional.

## 🐳 Método 1: Usando Docker (Recomendado)

Pré-requisitos: Ter o Docker Desktop e o Node.js instalados.

### 1.Clone o repositório:

```Bash
git clone https://github.com/Bruno-Braganca-Fernandes/clone-twitter-x.git
cd clone-twitter-x
```

### 2.Suba o Back-end e o Banco de Dados:

```Bash
# Inicia os containers do Django e do PostgreSQL
docker-compose up --build
```

A API estará rodando em http://localhost:8000/

### 3.Configure o Banco de Dados (Em um novo terminal):

```Bash
# Aplique as migrações no banco do Docker
docker-compose exec web python manage.py migrate

# Crie um superusuário para o painel admin (opcional)
docker-compose exec web python manage.py createsuperuser
```

### 4.Rode o Front-end (React):

Abra um novo terminal e acesse a pasta do frontend:

```Bash
cd frontend
npm install
npm run dev
```

O Front-end estará rodando em http://localhost:5173/

---

### **💻 Método 2: Modo Manual (Sem Docker)**

<details>
<summary>Clique aqui para ver as instruções de instalação manual (Ambiente Virtual + SQLite)</summary>

### 1. Clonando o repositório

```bash
git clone https://github.com/Bruno-Braganca-Fernandes/clone-twitter-x.git
cd clone-twitter-x
```

### 2. Configurando o Back-end (Django)

```bash
# Crie e ative o ambiente virtual
python -m venv venv
# No Windows: venv\Scripts\activate
# No Linux/Mac: source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Rode as migrações para criar o banco local
python manage.py migrate

# Crie um superusuário para acessar o painel admin (opcional)
python manage.py createsuperuser

# Inicie o servidor
python manage.py runserver
```

_O Back-end estará rodando em `http://127.0.0.1:8000/`_

### 3. Configurando o Front-end (React)

Abra um **novo terminal** (mantenha o servidor do Django rodando no outro) e acesse a pasta do frontend:

```bash
cd frontend

# Instale as dependências do Node
npm install

# Inicie o servidor de desenvolvimento do Vite
npm run dev
```

_O Front-end estará rodando em `http://localhost:5173/` (ou a porta indicada pelo Vite)._

_(Nota: Para testar localmente, lembre-se de alterar a `baseURL` no arquivo `frontend/src/services/api.ts` de volta para `http://127.0.0.1:8000/api/`)_

### 🔐 Recuperação de Senha (Nota Técnica)

Para fins de demonstração neste portfólio e para evitar bloqueios de _Sandbox_ em provedores gratuitos de SMTP, o sistema de e-mails está configurado para o modo **Console Backend**. O fluxo de segurança (geração de tokens efêmeros e validação em duas etapas) está 100% funcional.

**Como testar o fluxo de "Esqueci minha senha" localmente:**

1. Na tela de Login, clique em "Esqueceu a senha?".
2. Insira o e-mail cadastrado na sua conta de teste.
3. Em vez de o sistema enviar um e-mail real, o link seguro de recuperação será impresso **diretamente no terminal** onde o Django (`runserver`) está rodando.
4. Copie o link do terminal, cole no navegador e crie sua nova senha.

</details>

---

## 🧪 Testes Automatizados (CI)

O Back-end conta com uma suíte de testes unitários que cobre a criação de posts, sistema de likes, comentários e sistema de seguidores. Para rodá-los localmente:

```bash
python manage.py test core
```

---

## 👨‍💻 Desenvolvido por

### **Bruno Bragança Fernandes** - Projeto criado para fins educacionais e de portfólio.
