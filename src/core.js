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

function multiplyByIndex(atoms, index) {
  return Object.keys(atoms).map(key => atoms[key] * index);
}

function isInUpperCase(char) {
  return isString(char) && /[A-Z]/.test(char);
}

function isInLowerCase(char) {
  return isString(char) && /[a-z]/.test(char);
}

function isCharABracket(char) {
  return isString(char) && /[\{\}\[\]\(\)]/.test(char);
}

function isString(char) {
  return typeof char === 'string';
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