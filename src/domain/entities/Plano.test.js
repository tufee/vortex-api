const assert = require('assert');
const Plano = require('./Plano');

describe('Teste plano', () => {
  describe('Id válido', () => {
    it('Deve possuir um número de id válido', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.id = Math.floor(Math.random() * 1000);
      novoPlano.nome = 'FaleMais 30';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(novoPlano.isValid());
    });

    it('Deve possuir um número de id inválido', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.id = 0;
      novoPlano.nome = 'FaleMais 30';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(!novoPlano.isValid());
      assert.deepEqual(novoPlano.errors, { id: [{ notGreaterThan: 0 }] });
    });
  });

  describe('Nome válido', () => {
    it('Deve possuir um nome válido', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.id = Math.floor(Math.random() * 1000);
      novoPlano.nome = 'FaleMais 30';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(novoPlano.isValid());
    });

    it('Deve possuir um nome inválido', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.id = Math.floor(Math.random() * 1000);
      novoPlano.nome = 'FaleMais';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(!novoPlano.isValid());
      assert.deepEqual(novoPlano.errors, {
        nome: [{ notContains: ['FaleMais 30', 'FaleMais 60', 'FaleMais 120'] }],
      });
    });
  });

  describe('Minutos válidos', () => {
    it('Deve possuir minutos válidos', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.id = Math.floor(Math.random() * 1000);
      novoPlano.nome = 'FaleMais 60';
      novoPlano.minutos = Math.floor(Math.random() * 1000);

      // Then
      assert.ok(novoPlano.isValid());
    });

    it('Deve possuir minutos inválidos', async () => {
      // Given
      const novoPlano = new Plano();

      // When
      novoPlano.id = Math.floor(Math.random() * 1000);
      novoPlano.nome = 'FaleMais 60';
      novoPlano.minutos = 0;

      // Then
      assert.ok(!novoPlano.isValid());
      assert.deepEqual(novoPlano.errors, { minutos: [{ notGreaterThan: 0 }] });
    });
  });
});
