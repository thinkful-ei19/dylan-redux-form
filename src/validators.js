export const required = value => value ? undefined : 'Required';
export const nonEmpty = value => value.length > 0 ? undefined : 'Cannot be empty';
export const fiveCharacters = value => value.length === 5 ? undefined : 'Must be 5 characters';
export const mustBeNumber = value => {
  const split = value.split('');
  let result = undefined;
  split.forEach(character => {
    if (isNaN(parseInt(character, 10))) {
      result = 'Must be a number';
    }
  });
  return result;
};