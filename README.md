# 📘 Code elevate - Igor dos santos cabral

## I. Arquitetura de Solução e Arquitetura Técnica

### 🧩 Descrição da Solução

Plataforma desenvolvida contendo solução **back-end** e **front-end**, projetada para atender uma livraria independente que deseja disponibilizar seu acervo digitalmente. A API permite:

1.  buscar todos os livros presentes no acervo
2.  busca livros por gênero
3.  busca livros por autor
4.  Visualização dos livros recentes visualizados

Tudo isso performance otimizada por cache e estrutura preparada para escalabilidade.

### 🛠️ Tecnologias Utilizadas

#### Back-end

- **Linguagem:** [Typescript](https://www.typescriptlang.org/)
- **Framework:** [Fastify 5](https://fastify.dev/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/)
- **Cache:** [Redis](https://redis.io/)
- **Documentação da API:** [Swagger](https://swagger.io/)(OpenApi 3.0)
- **Build Tool:** [Typescript Compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- **Testes Unitários:** [Jest](https://jestjs.io/pt-BR/)
- **Controle de Versão:** Git + GitHub

#### Front-end

- **Linguagem:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Framework:** [React](https://react.dev/)
- **Documentação da API:** [Swagger](https://swagger.io/) (OpenApi 3.0)
- **Build Tool:** [Vite](https://vite.dev/)
- **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- **Testes Unitários:** [Jest](https://jestjs.io/pt-BR/)
- **Controle de Versão:** Git + GitHub

### 🧱 Decisões de Design

#### **Clean Architecture**

- A Clean Architecture foi utilizada como arquitetura no **backend**, por sua capacidade de criar códigos desacoplados, altamente testáveis e com separação clara de responsabilidades. Essa abordagem permitiu que as regras de negócio permanecessem independentes de frameworks, banco de dados e dependências externas. Toda a camada de regras de negócios da aplicação foi pensada para ser dependente apenas de **interfaces**. Dependências externas (banco de dados, caches, etc.) implementam essas interfaces para conseguirem se conectar à lógica central da aplicação sem acoplamento direto.
- Essa **inversão de dependência** permitiu:

- Criar um código que é muito fácil substituir tecnologias ou ferramentas sem impactar o core da aplicação. Por exemplo, trocar o MongoDB por um PostgresSQL, o Redis por um MemCached.
- Criar mocks facilmente para testes unitários;
- Melhor separação entre as responsabilidades de cada camada, facilitando manutenção e evolução do sistema.

**⚠️ IMPORTANTE : A estrutura foi organizada nas seguintes camadas:⚠️**

- `infrastructure/`: implementa todos os detalhes técnicos de frameworks e dependências que a aplicação usa, como acesso a banco de dados, cache, etc.
- `infrastructure/webserver/routes` expõe os endpoints REST e lida com requisições HTTP.
- `factories/` responsável pela injeção de dependências do projeto. É um intermediário entre a `/routes` e a camada de `/controllers`, que já são criados com todas as dependências (serviços, repositórios e casos de uso) necessárias para seu funcionamento. **Todos os controllers e suas dependências são altamente dependentes de interfaces** e não implementam lógicas concretas.
- `application/`: responsável pela orquestração das requisições HTTP a nível dos controllers e orquestração dos serviços
- `domain/`: contém as entidades e casos de uso da aplicação (que dependem de interfaces), contendo suas regras de negócio puras e interfaces de domínio.

Essa separação promove maior escalabilidade, facilita a escrita de testes automatizados e melhora a manutenção do sistema ao longo do tempo.

#### ⚠️ IMPORTANTE: Banco de dados já populado ⚠️

Optei por fazer o MongoDB já ser populado automaticamente com **dados de livros reais** quando o container do Docker for inicializado pela primeira vez. Assim a API já possui dados prontos para funcionar corretamente. Leia como consegui esses dados na seção "Aquisição e Geração de Dados", logo mais abaixo.

---

## II. Explicação sobre o Case Desenvolvido (Plano de Implementação)

### 📦 Funcionalidades Implementadas

| Endpoint                       | Descrição                               |
| ------------------------------ | --------------------------------------- |
| `GET /v1/books`                | Retorna todos os livros (com paginação) |
| `GET /v1/books/:bookId`        | Busca livro por ID (com paginação)      |
| `GET /v1/books/genre/:genre}`  | Busca livros por gênero (com paginação) |
| `GET /v1/books/author/:author` | Busca livros por autor (com paginação)  |

### 🔄 Aquisição e Geração de Dados

Testei várias fontes de dados, mas nenhum me deu o resultado que gostaria, até encontrar uma solução com o Google Books.

- **Kaggle**: muitos datasets, porém muitas vezes incompletos/repetidos/com pouco volume e não possuíam imagens com links funcionais de capas de livros. Parte fundamental, porque implementei um front-end e precisava das capas dos livros.
- **Amazon**: Encontrei desafios para consumir a API deles, esbarrando em muitos não autorizados quando fazia testes de carga de consumo, porque queria um dataset com 1.000+ livros.
- **Criar dados por IA**: não era uma opção, porque precisava de imagens das capas dos livros hospedadas para servir no frontend. Poderia criar um script para gerar essas imagens através do [Google Image FX](https://labs.google/fx/tools/image-fx) e depois hospeda-las no imgur/similar, mas tomaria muito tempo e eu não o tinha.
- **Google Books**: após algumas interações com a [API](https://www.googleapis.com/books/v1/volumes) descobri que não precisava de uma ApiKey e que ela não tinha um rate limiting para a quantidade de dados que eu precisava buscar. Também oferecia o link da imagem da capa do livro já hospedado no Google. Era tudo o que eu precisava. Criei um script (localizado na pasta /scripts na raiz aqui do projeto) que faz um loop na API buscando vários livros separados por gêneros pré-definidos por mim. Funcionou muito bem, consegui um dataset muito bom que usei no projeto. **O ponto negativo é que o Google Books só possui dados em inglês.**

### 🧠 Entidade Livro (Modelo de Dados)

```javascript
Book {
"_id":  "681f9fab48212582f0d861e2",
"title":  "Mysteries",
"authors":  "Knut Hamsun",
"publishedDate":  "2001-01-01",
"description":  "The first complete English translation of the Nobel Prize-winner’s literary masterpiece A Penguin Classic Mysteries is the story of Johan Nilsen Nagel, a mysterious stranger who suddenly turns up in a small Norwegian town one summer—and just as suddenly disappears. Nagel is a complete outsider, a sort of modern Christ treated in a spirit of near parody. He condemns the politics and thought of the age, brings comfort to the “insulted and injured,” and gains the love of two women suggestive of the biblical Mary and Martha. But there is a sinister side of him: in his vest he carries a vial of prussic acid... The novel creates a powerful sense of Nagel's stream of thought, as he increasingly withdraws into the torture chamber of his own subconscious psyche. For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,800 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.",
"genre":  "Fiction",
"categories":  "Fiction",
"thumbnail":  "http://books.google.com/books/content?id=MRoMUV2kLZEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
"pageCount":  356,
"averageRating":  4,
"amount":  49.99,
"currencyCode":  "BRL"
}
```
