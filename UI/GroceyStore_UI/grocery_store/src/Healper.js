export const toFirstCharUppercase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const unitMapper = (unitId) =>{
  if(unitId===1) return 'Kg'
  else return 'Numbers'
}
