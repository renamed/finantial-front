import { Constants } from "../models/Constants";

export function setSuccess(msgElementId: string) {
    toggleCssClass(msgElementId, Constants.ERROR_CLASS, Constants.SUCCESS_CLASS);
  }

  export function setError(msgElementId: string) {
    toggleCssClass(msgElementId, Constants.SUCCESS_CLASS, Constants.ERROR_CLASS);
  }

  export function  toggleCssClass(elemet:string, removeClassName: string, addClassName: string) {
    const element = document.getElementById(elemet);
    if (!element) {
      console.error(`Element with id ${elemet} not found`);
      return;
    }
    element.classList.add(addClassName);
    element.classList.remove(removeClassName);    
  }