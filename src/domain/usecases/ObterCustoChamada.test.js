const assert = require('assert');
const ObterCustoChamada = require('./ObterCustoChamada');
const { Ok } = require('@herbsjs/herbs');

describe('Teste obter custo chamada', () => {
  describe('Deve buscar o custo da chamada', () => {
    it('Deve buscar o custo da chamada', async () => {
      // Given
      const injection = {
        PlanoRepository: class {
          buscarPlano(nome) {
            return Ok({
              id: '1',
              nome: 'FaleMais 30',
              minutos: 30,
            });
          }
        },
        TarifaRepository: class {
          buscarDDD(origem, destino) {
            return Ok({
              id: '1',
              origem: '011',
              destino: '016',
              valor: 1.9,
            });
          }
        },
      };

      const parameters = {
        origem: '011',
        destino: '016',
        duracao: '20',
        plano: 'FaleMais 30',
      };

      // When
      const useCase = ObterCustoChamada(injection);
      const respostaUseCase = await useCase.run(parameters);

      // Then
      assert.ok(respostaUseCase.isOk);
    });

    it('Não deveria buscar o custo com origem inválida', async () => {
      // Given
      const injection = {};

      const parameters = {
        origem: '021',
        destino: '016',
        duracao: '20',
        plano: 'FaleMais 30',
      };

      // When
      const useCase = ObterCustoChamada(injection);
      const respostaUseCase = await useCase.run(parameters);

      // Then
      assert.deepStrictEqual(respostaUseCase.err.message, 'Chamada inválida');
      assert.deepStrictEqual(respostaUseCase.isInvalidEntityError, true);
    });

    it('Não deveria buscar o custo com destino inválido', async () => {
      // Given
      const injection = {};

      const parameters = {
        origem: '011',
        destino: '021',
        duracao: '20',
        plano: 'FaleMais 30',
      };

      // When
      const useCase = ObterCustoChamada(injection);
      const respostaUseCase = await useCase.run(parameters);

      // Then
      assert.deepStrictEqual(respostaUseCase.err.message, 'Chamada inválida');
      assert.deepStrictEqual(respostaUseCase.isInvalidEntityError, true);
    });

    it('Não deveria buscar o custo com duração inválida', async () => {
      // Given
      const injection = {};

      const parameters = {
        origem: '011',
        destino: '016',
        duracao: undefined,
        plano: 'FaleMais 30',
      };

      // When
      const useCase = ObterCustoChamada(injection);
      const respostaUseCase = await useCase.run(parameters);

      // Then
      assert.deepStrictEqual(respostaUseCase.err.message, 'Chamada inválida');
      assert.deepStrictEqual(respostaUseCase.isInvalidEntityError, true);
    });

    it('Não deveria buscar o custo com plano inválido', async () => {
      // Given
      const injection = {};

      const parameters = {
        origem: '011',
        destino: '016',
        duracao: '20',
        plano: 'FaleMais 360',
      };

      // When
      const useCase = ObterCustoChamada(injection);
      const respostaUseCase = await useCase.run(parameters);

      // Then
      assert.deepStrictEqual(respostaUseCase.err.message, 'Chamada inválida');
      assert.deepStrictEqual(respostaUseCase.isInvalidEntityError, true);
    });
  });
});
