import {
  isInUpperCase,
  isCharAnOpeningBracket,
  isCharAClosingBracket,
  isInLowerCase,
} from './predicates';

function multiplyByIndex(prevAtoms, index) {
  const atoms = Object.assign({}, prevAtoms);

  Object.keys(prevAtoms).forEach((key) => {
    atoms[key] = prevAtoms[key] * index;
  });

  return atoms;
}

function updateWithNewAtomName(prevAtoms, formula, begin) {
  const atoms = Object.assign({}, prevAtoms);
  let currIdx = begin;

  // find the currIdx of it and write it to

  while (isInLowerCase(formula[currIdx])) {
    currIdx += 1;
  }

  const atomName = formula.substring(begin, currIdx);

  if (!atoms[atomName]) {
    atoms[atomName] = 0; // quantity of atoms in molecule
  }

  const index = Number(formula[currIdx]) || 1; // O2
  atoms[atomName] += index;

  return atoms;
}

function findEndOfNesting(formula, begin) {
  const { length } = formula;
  let currIdx = begin;
  let nestingCount = 0;
  // nestingCount looks for nestings inside current nesting
  // this is done in order to find the right closing bracket

  while (currIdx < length) {
    if (isCharAClosingBracket(formula[currIdx])) {
      if (nestingCount === 0) {
        break;
      } else {
        nestingCount -= 1;
      }
    } else if (isCharAnOpeningBracket(formula[currIdx])) {
      nestingCount += 1;
    }

    currIdx += 1;
  }

  return currIdx; // the end
}

function parseSubMolecule(prevAtoms, formula) {
  let atoms = prevAtoms ? Object.assign({}, prevAtoms) : {};
  const { length } = formula;

  for (let idx = 0; idx < length; idx += 1) {
    if (isInUpperCase(formula[idx])) {
      // we have encountered new atom name
      atoms = updateWithNewAtomName(atoms, formula, idx + 1);
    } else if (isCharAnOpeningBracket(formula[idx])) {
      // nesting is detected!
      // 1. find the end of the nesting
      const end = findEndOfNesting(formula, idx + 1);
      // 2. get the next char after the nesting - index
      const index = Number(end + 1) || 1;
      // 3. run recursion for subformula inside the nesting
      // 4. multiply result of rescursion by index

      // BUG - multiplies all of the elements instead of just the ones inside nesting

      atoms = multiplyByIndex(parseSubMolecule(atoms, formula.substring(idx + 1, end - 1)), index);
      // (idx + 1) - next after bracket
      // (end - 1) - previous before bracket
    }
  }

  return atoms;
}

function parseMolecule(formula) {
  // do your science here
  const index = Number(formula[0]) || 1;
  return multiplyByIndex(parseSubMolecule(null, formula), index);
}

export default parseMolecule;
