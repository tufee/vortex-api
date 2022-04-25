const Chamada = require('./Chamada');
const assert = require('assert');

describe('Teste chamada', () => {
  describe('Chamada válida', () => {
    it('Deve ser uma chamada válida', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.origem = '011';
      novaChamada.destino = '016';
      novaChamada.valorPorMinuto = 1.9;

      // Then
      assert.ok(novaChamada.isValid());
    });
  });

  describe('Chamada inválida', () => {
    it('Deve ser uma chamada inválida', async () => {
      // Given
      const novaChamada = new Chamada();

      // When
      novaChamada.origem = '1234';
      novaChamada.destino = '01';
      novaChamada.valorPorMinuto = undefined;

      // Then
      assert.ok(!novaChamada.isValid());
    });
  });
});
