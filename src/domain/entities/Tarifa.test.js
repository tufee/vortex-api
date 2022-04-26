const assert = require('assert');
const Tarifa = require('./Tarifa');

describe('Teste tarifa', () => {
  describe('Id válido', () => {
    it('Deve possuir um número de id válido', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '011';
      novaTarifa.destino = '016';
      novaTarifa.valor = 1.9;

      // Then
      assert.ok(novaTarifa.isValid());
    });

    it('Deve possuir um número de id inválido', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = 0;
      novaTarifa.origem = '011';
      novaTarifa.destino = '016';
      novaTarifa.valor = 1.9;

      // Then
      assert.ok(!novaTarifa.isValid());
      assert.deepEqual(novaTarifa.errors, { id: [{ notGreaterThan: 0 }] });
    });
  });

  describe('Origem válida', () => {
    it('Deve possuir uma origem válida', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '011';
      novaTarifa.destino = '016';
      novaTarifa.valor = 1.9;

      // Then
      assert.ok(novaTarifa.isValid());
    });

    it('Deve possuir uma origem inválida', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '021';
      novaTarifa.destino = '016';
      novaTarifa.valor = 1.9;

      // Then
      assert.ok(!novaTarifa.isValid());
      assert.deepEqual(novaTarifa.errors, {
        origem: [{ notContains: ['011', '016', '017', '018'] }],
      });
    });
  });

  describe('Destino válido', () => {
    it('Deve possuir um destino válido', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '011';
      novaTarifa.destino = '016';
      novaTarifa.valor = 1.9;

      // Then
      assert.ok(novaTarifa.isValid());
    });

    it('Deve possuir um destino inválido', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '011';
      novaTarifa.destino = '079';
      novaTarifa.valor = 1.9;

      // Then
      assert.ok(!novaTarifa.isValid());
      assert.deepEqual(novaTarifa.errors, {
        destino: [{ notContains: ['011', '016', '017', '018'] }],
      });
    });
  });

  describe('Valor válido', () => {
    it('Deve possuir um valor válido', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '011';
      novaTarifa.destino = '016';
      novaTarifa.valor = 2.7;

      // Then
      assert.ok(novaTarifa.isValid());
    });

    it('Deve possuir um valor inválido', async () => {
      // Given
      const novaTarifa = new Tarifa();

      // When
      novaTarifa.id = Math.floor(Math.random() * 1000);
      novaTarifa.origem = '011';
      novaTarifa.destino = '018';
      novaTarifa.valor = 10;

      // Then
      assert.ok(!novaTarifa.isValid());
      assert.deepEqual(novaTarifa.errors, {
        valor: [{ notContains: [1.9, 2.9, 1.7, 2.7, 0.9, 1.9] }],
      });
    });
  });
});
