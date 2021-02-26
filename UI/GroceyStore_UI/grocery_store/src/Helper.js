import { render } from "@testing-library/react";
import { useStore } from "./Store";

export const toFirstCharUppercase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const unitMapper = (unitId) =>{
  if(unitId===1) return 'Kg'
  else return 'Numbers'
}

export const fetchUser=(phone)=>{

 
 


}
