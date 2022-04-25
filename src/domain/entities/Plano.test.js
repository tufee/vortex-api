const Plano = require('./Plano');
const assert = require('assert');

describe('Teste plano', () => {
  describe('Plano válido', () => {
    it('Deve possuir um nome válido', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.nome = 'FaleMais 30';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(novoPlano.isValid());
    });
  });

  describe('Plano inválido', () => {
    it('Deve possuir um nome inválido', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.nome = 'Plano';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(!novoPlano.isValid());
      assert.deepEqual(novoPlano.errors, { nome: [{ isTooShort: 11 }] });
    });
  });

  describe('Minutos válidos', () => {
    it('Deve possuir minutos válidos', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.nome = 'FaleMais 60';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(novoPlano.isValid());
    });
  });

  describe('Minutos válidos', () => {
    it('Deve possuir minutos inválidos', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.nome = 'FaleMais 60';
      novoPlano.minutos = 0;

      // Then
      assert.ok(!novoPlano.isValid());
      assert.deepEqual(novoPlano.errors, { minutos: [{ notGreaterThan: 0 }] });
    });
  });
});
