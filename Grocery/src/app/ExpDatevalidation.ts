import { FormGroup } from "@angular/forms";
export function ExpDatevalidation(Expdate:string)
{
     return(formgroup:FormGroup)=>{
     const date=formgroup.controls[Expdate];
     const Todaydate=new Date().getTime();
      let entered_date=new Date(date.value).getTime();
      if(entered_date<=Todaydate)
      {
        date.setErrors({ExpDatevalidation:true})
      }
      else{
        date.setErrors(null)
      }

     }
}
