import {
  isInUpperCase,
  isCharABracket,
  isInLowerCase
} from './predicates';

function parseMolecule(formula) {
  // do your science here
  let atoms = {};
  
  Array.from(formula).forEach((char, idx) => {
    if (isInUpperCase(char)) {
      atoms = updateWithNewAtomName(atoms, formula, idx + 1);
    } else if (isCharABracket(char)) {
      // nesting!

    }
  });

  return multiplyByIndex(atoms, getFormulaIndex(formula));
}

function getFormulaIndex(formula) {
  return Number(formula[0]) || 1;
}

function updateWithNewAtomName(atoms, formula, begin) {
  const atomsCopy = Object.assign({}, atoms);
  const length = formula.length;
  let end = begin;

  // find the end of it and write it to

  while(isInLowerCase(formula[end])) {
    end += 1;
  }

  const atomName = formula.substring(begin, end);

  console.log(atomName);

  if (!atoms[atomName]) {
    atoms[atomName] = 0;  // quantity of atoms in molecule
  }
  atoms[atomName] += 1;

  return atomsCopy;
}