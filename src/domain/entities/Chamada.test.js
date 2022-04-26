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
      novaChamada.valorPorMinuto = 1.9;

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
      novaChamada.valorPorMinuto = 1.9;

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
      novaChamada.valorPorMinuto = 1.9;

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
      novaChamada.valorPorMinuto = 1.9;

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
      novaChamada.valorPorMinuto = 1.9;

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
      novaChamada.valorPorMinuto = 1.9;

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, {
        destino: [{ notContains: ['011', '016', '017', '018'] }],
      });
    });
  });

  describe('Valor por minuto válido', () => {
    it('Deve possuir um valor por minuto válido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.valorPorMinuto = 2.7;

      // Then
      assert.ok(novaChamada.isValid());
    });

    it('Deve possuir um valor por minuto inválido', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.id = Math.floor(Math.random() * 1000);
      novaChamada.origem = '011';
      novaChamada.destino = '018';
      novaChamada.valorPorMinuto = undefined;

      // Then
      assert.ok(!novaChamada.isValid());
      assert.deepEqual(novaChamada.errors, {
        valorPorMinuto: [{ cantBeEmpty: true }],
      });
    });
  });
});
