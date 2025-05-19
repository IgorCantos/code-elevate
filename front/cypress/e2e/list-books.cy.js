describe('List all books without pagination', () => {
  it('Show error if books API fails', () => {
    cy.visit('http://localhost:3030');
    cy.intercept('GET', '/v1/books?page=1&limit=12', {
      statusCode: 400,
      body: [],
    });

    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Erro ao carregar livros').should('be.visible');
    cy.contains('Ocorreu um erro ao carregar os livros. Por favor, tente novamente.').should(
      'be.visible'
    );
  });

  it('Show books list when books API resolves', () => {
    cy.visit('http://localhost:3030');

    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Para você').should('be.visible');

    cy.get('img[alt][src]').should('have.length', 13);

    for (let i = 0; i < 12; i++) {
      cy.get(`[data-testid="author-btn-${i}"]`).should('exist');
    }
    cy.get('.MuiRating-root').should('have.length', 12);

    cy.get('body')
      .find('p')
      .filter((_, el) => el.innerText.startsWith('R$'))
      .should('have.length', 12);

    cy.get('.MuiTypography-body2').filter(':contains("Adicionar")').should('have.length', 12);
  });

  it('Show genre categories list when books API resolves', () => {
    cy.visit('http://localhost:3030');

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Gênero').should('be.visible');
    cy.contains('Fiction').should('be.visible');
    cy.contains('History').should('be.visible');
    cy.contains('Science').should('be.visible');
    cy.contains('Self-Help').should('be.visible');
    cy.contains('Art').should('be.visible');
    cy.contains('Philosophy').should('be.visible');
    cy.contains('Biography').should('be.visible');
    cy.contains('Education').should('be.visible');
    cy.contains('Health').should('be.visible');
    cy.contains('Technology').should('be.visible');
  });
});

describe('List all books with pagination', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  const page1Books = {
    data: Array.from({ length: 12 }, (_, i) => ({
      id: `book-${i + 1}`,
      title: `Livro ${i + 1}`,
      author: `Autor ${i + 1}`,
      thumbnail:
        'http://books.google.com/books/content?id=MRoMUV2kLZEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      pageCount: 356,
      averageRating: 4,
      amount: 49.99,
      currencyCode: 'BRL',
    })),
    totalDocuments: 24,
    totalPages: 2,
  };

  const page2Books = {
    data: Array.from({ length: 12 }, (_, i) => ({
      id: `book-${i + 13}`,
      title: `Livro ${i + 13}`,
      author: `Autor ${i + 13}`,
      thumbnail:
        'http://books.google.com/books/content?id=MRoMUV2kLZEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      pageCount: 356,
      averageRating: 4,
      amount: 49.99,
      currencyCode: 'BRL',
    })),
    totalDocuments: 24,
    totalPages: 2,
  };

  it('Goes to 2 page', () => {
    cy.intercept('GET', '/v1/books?page=1&limit=12', {
      statusCode: 200,
      body: page1Books,
    });

    cy.intercept('GET', '/v1/books?page=2&limit=12', {
      statusCode: 200,
      body: page2Books,
    });

    for (let i = 1; i <= 12; i++) {
      cy.contains(new RegExp(`^Livro ${i}$`)).should('exist');
    }

    for (let i = 13; i <= 24; i++) {
      cy.contains(new RegExp(`^Livro ${i}$`)).should('not.exist');
    }

    cy.get('[aria-label="Go to page 2"]').click();

    for (let i = 1; i <= 12; i++) {
      cy.contains(new RegExp(`^Livro ${i}$`)).should('not.exist');
    }

    for (let i = 13; i <= 24; i++) {
      cy.contains(new RegExp(`^Livro ${i}$`)).should('exist');
    }
  });
});

describe('Recently viewed books', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  it('Do not show recently view books component if there none', () => {
    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Visualizados recentemente').should('not.exist');
  });

  it('Show recently view books component', () => {
    cy.visit('http://localhost:3030');

    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [
        {
          _id: '681f9fab48212582f0d861e2',
          title: 'Mysteries',
          author: 'Knut Hamsun',
          publishedDate: '2001-01-01',
          description:
            "The first complete English translation of the Nobel Prize-winner’s literary masterpiece A Penguin Classic Mysteries is the story of Johan Nilsen Nagel, a mysterious stranger who suddenly turns up in a small Norwegian town one summer—and just as suddenly disappears. Nagel is a complete outsider, a sort of modern Christ treated in a spirit of near parody. He condemns the politics and thought of the age, brings comfort to the “insulted and injured,” and gains the love of two women suggestive of the biblical Mary and Martha. But there is a sinister side of him: in his vest he carries a vial of prussic acid... The novel creates a powerful sense of Nagel's stream of thought, as he increasingly withdraws into the torture chamber of his own subconscious psyche. For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,800 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.",
          genre: 'Fiction',
          categories: 'Fiction',
          thumbnail:
            'http://books.google.com/books/content?id=MRoMUV2kLZEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          pageCount: 356,
          averageRating: 4,
          amount: 49.99,
          currencyCode: 'BRL',
        },
      ],
    });

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Visualizados recentemente').should('exist');
  });

  it('should navigate to book detail page when clicking a recently viewed book', () => {
    const mockedBook = {
      _id: '681f9fab48212582f0d861e2',
      title: 'Mysteries',
      author: 'Knut Hamsun',
      publishedDate: '2001-01-01',
      description: 'Some long description...',
      genre: 'Fiction',
      categories: 'Fiction',
      thumbnail:
        'http://books.google.com/books/content?id=MRoMUV2kLZEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      pageCount: 356,
      averageRating: 4,
      amount: 49.99,
      currencyCode: 'BRL',
    };

    cy.visit('http://localhost:3030');

    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [mockedBook],
    }).as('recentlyViewedBooks');

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
    }

    cy.contains('Visualizados recentemente').should('exist');
    cy.get('[data-testid="book-thumbnail-0"]').click();
    cy.url().should('include', `/books/${mockedBook._id}`);

    cy.contains(`${mockedBook.title}`).should('exist');
    cy.contains(`${mockedBook.author}`).should('exist');
    cy.contains(`${mockedBook.description}`).should('exist');
    cy.contains(`${mockedBook.genre}`).should('exist');
    cy.contains(`${mockedBook.pageCount}`).should('exist');
    cy.contains('R$ 49,99').should('exist');
    cy.contains('Comprar agora').should('exist');
    cy.contains('Voltar').should('exist');
  });
});

describe('Search books by genre', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  it('Show filtered books when searching by genre', () => {
    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Technology').should('exist');
    cy.get('[data-testid="categories-button-Technology"]').click();
    cy.contains('Resultados para gênero: Technology').should('exist');
    cy.contains('The Evolution of Useful Things').should('exist');
    cy.contains('Henry Petroski').should('exist');
  });
});

describe('Search books by author', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  it('Show filtered books when searching by genre', () => {
    cy.intercept('GET', '/v1/users/123/recently-viewed', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="skeleton-list"]').should('exist');
    cy.get('[data-testid="skeleton-large"]').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get(`[data-testid="skeleton-card-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-card-image-${i}"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-2"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-3"]`).should('exist');
      cy.get(`[data-testid="skeleton-text-${i}-4"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-1"]`).should('exist');
      cy.get(`[data-testid="skeleton-rounded-${i}-2"]`).should('exist');
    }

    cy.contains('Jules Verne').should('exist');
    cy.get('[data-testid="author-btn-0"]').click();
    cy.contains('Resultados para autor: Jules Verne').should('exist');

    for (let i = 0; i < 4; i++) {
      cy.get(`[data-testid="author-btn-${i}"]`).should('exist');
    }
  });
});

describe('Asynchronous Search Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  it('loads best sellers on autocomplete open', () => {
    cy.intercept('GET', '**/books/best-sellers**').as('getBestSellers');

    cy.wait('@getBestSellers');

    cy.get('input[placeholder="Pesquisar livros..."]').click();
    cy.contains('⭐ Top 20 livros', { timeout: 5000 }).should('exist');
    cy.get('li').contains(/./).should('exist');
  });

  it('searches and displays results', () => {
    cy.get('input[placeholder="Pesquisar livros..."]').type('Journey');
    cy.contains('Resultados da busca', { timeout: 5000 }).should('exist');
    cy.get('li')
      .contains(/Journey/i)
      .should('exist');
  });

  it('clears results when input is empty', () => {
    cy.get('input[placeholder="Pesquisar livros..."]').type('Journey');
    cy.contains('Resultados da busca', { timeout: 5000 }).should('exist');
    cy.get('input[placeholder="Pesquisar livros..."]').clear();
    cy.wait(500);
    cy.get('li')
      .contains(/Journey/i)
      .should('not.exist');
  });

  it('navigates to book page on selection', () => {
    cy.get('input[placeholder="Pesquisar livros..."]').type('Journey');
    cy.contains('Resultados da busca', { timeout: 5000 }).should('exist');
    cy.get('li')
      .contains(/Journey/i)
      .first()
      .click();
    cy.location('pathname').should('match', /\/books\/\w+/);
  });
});
