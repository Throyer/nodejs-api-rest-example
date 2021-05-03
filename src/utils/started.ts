/**
 * https://fsymbols.com/pt/teclado/windows/codigos-alt/
 * @param port number
 * @returns application status
 */
export const started = (port: number): void =>
  console.log(`
    ${
      process.env.NODE_ENV === 'development'
        ? `🚀️  started on http://localhost:${port}
    📜️  swagger http://localhost:${port}/docs`
        : ''
    }
    🚨️  environment: ${process.env.NODE_ENV}
    🎲️  database:
          ╠═ host: ${process.env.DB_COMPOSE_HOST || process.env.DB_HOST}
          ╠═ port: ${process.env.DB_PORT}
          ╚═ db name: ${process.env.DB_NAME}
    `);
