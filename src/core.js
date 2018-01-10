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

function getFullIndex(formula, begin) {
  const { length } = formula;
  let currIdx = begin;
  while (currIdx < length) {
    if (!Number(formula[currIdx])) {
      break;
    }
    currIdx += 1;
  }

  return Number(formula.substring(begin, currIdx)) || 1;
}

function updateWithNewAtomName(prevAtoms, formula, begin) {
  // debugger;

  const atoms = Object.assign({}, prevAtoms);
  let currIdx = begin + 1;

  // find the currIdx of it and write it to

  while (isInLowerCase(formula[currIdx])) {
    currIdx += 1;
  }

  const atomName = formula.substring(begin, currIdx);

  if (!atoms[atomName]) {
    atoms[atomName] = 0; // quantity of atoms in molecule
  }

  const index = getFullIndex(formula, currIdx);
  atoms[atomName] += index;

  return atoms;
}

function findEndOfNesting(formula, begin) {
  const { length } = formula;
  let currIdx = begin;
  let nestingCount = 0;
  // nestingCount keeps track of nestings inside current nesting
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

function mergeAtoms(firstAtomGroup, secondAtomGroup) {
  const mergedGroup = {};

  Object.keys(firstAtomGroup).forEach((atom) => {
    if (secondAtomGroup[atom]) {
      mergedGroup[atom] = firstAtomGroup[atom] + secondAtomGroup[atom];
    } else {
      mergedGroup[atom] = firstAtomGroup[atom];
    }
  });

  Object.keys(secondAtomGroup).forEach((atom) => {
    if (!firstAtomGroup[atom]) {
      mergedGroup[atom] = secondAtomGroup[atom];
    }
  });

  return mergedGroup;
}

function parseSubMolecule(formula = '') {
  let atoms = {};
  const { length } = formula;

  for (let idx = 0; idx < length; idx += 1) {
    if (isInUpperCase(formula[idx])) {
      // we have encountered new atom name
      atoms = updateWithNewAtomName(atoms, formula, idx);
    } else if (isCharAnOpeningBracket(formula[idx])) {
      // nesting is detected!
      // 1. find the end of the nesting
      const end = findEndOfNesting(formula, idx + 1);
      // 2. get the next char after the nesting - index
      const index = getFullIndex(formula, end + 1);

      // 3. run recursion for subformula inside the nesting
      // 4. multiply result of rescursion by index
      // (idx + 1, end] - nesting
      const nestedAtoms =
        multiplyByIndex(
          parseSubMolecule(formula.substring(idx + 1, end)),
          index,
        );

      // 5. combine previously written atoms with atoms from nesting
      atoms = mergeAtoms(atoms, nestedAtoms);

      // 6. traverse past the nesting
      // if we don't do that, next step would be idx += 1
      // and we would count nesting again
      idx = end;
    }
  }

  return atoms;
}

export default function parseMolecule(formula) {
  // do your science here
  const index = formula ? getFullIndex(formula, 0) : 0;
  return multiplyByIndex(parseSubMolecule(formula), index);
}
