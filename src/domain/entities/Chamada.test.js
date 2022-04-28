const assert = require('assert');
const Chamada = require('./Chamada');

describe('Teste chamada', () => {
  describe('Id válido', () => {
    it('Deve possuir um número de id válido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(novaChamada.isValid());
    });

    it('Deve possuir um número de id inválido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = 0;
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, { id: [{ notGreaterThan: 0 }] });
    });
  });

  describe('Origem válida', () => {
    it('Deve possuir uma origem válida', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(novaChamada.isValid());
    });

    it('Deve possuir uma origem inválida', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '021';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, {
        origem: [{ notContains: ['011', '016', '017', '018'] }],
      });
    });
  });

  describe('Destino válido', () => {
    it('Deve possuir um destino válido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(novaChamada.isValid());
    });

    it('Deve possuir um destino inválido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '079';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, {
        destino: [{ notContains: ['011', '016', '017', '018'] }],
      });
    });
  });

  describe('Duraçao válida', () => {
    it('Deve possuir um tempo de duração válido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(novaChamada.isValid());
    });

    it('Deve possuir um tempo de duração inválido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = 0;
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, {
        duracao: [{ notGreaterThan: 0 }],
      });
    });
  });

  describe('Plano válido', () => {
    it('Deve possuir um plano válido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais 30';

      // Then
      assert.ok(novaChamada.isValid());
    });

    it('Deve possuir um plano inválido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.duracao = Math.floor(Math.random() * 100);
      novaChamada.plano = 'FaleMais';

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, {
        plano: [
          { notContains: ['FaleMais 30', 'FaleMais 60', 'FaleMais 120'] },
        ],
      });
    });
  });
});
