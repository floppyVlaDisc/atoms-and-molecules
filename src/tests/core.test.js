import parseMolecule from '../core';

describe('core functionality', () => {
  describe('parseMolecule', () => {
    it('should return proper result', () => {
      expect(Object.prototype.toString.call(parseMolecule())).toBe('[object Object]');
      expect(parseMolecule()).toEqual({});
      expect(parseMolecule('CO2')).toEqual({ C: 1, O: 2 });
      expect(parseMolecule('H2O')).toEqual({ H: 2, O: 1 });
      expect(parseMolecule('Mg(OH)2')).toEqual({ Mg: 1, O: 2, H: 2 });
      expect(parseMolecule('K4[ON(SO3)2]2')).toEqual({ K: 4, O: 14, N: 2, S: 4 });
      expect(parseMolecule('C6H12O6')).toEqual({ C: 6, H: 12, O: 6 });
      
    });
  });
});
