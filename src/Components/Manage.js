import React from "react";
import {FormInput1} from "./FormButton"

const Manage = (props) =>{
  return(
    <div >
    <FormInput1 description="Date" placeholder="EnterDate" type="date" name="date" />
  <FormInput1 description="production" placeholder={props.data.unit} type="input" name="unit" defaultValue={props.data.unit} disabled={true}/>
<FormInput1 description={props.data.value} placeholder={props.data.value} type="input" name={props.data.value} disabled={true} defaultValue={props.data.value} />
  <FormInput1 description="No of product" placeholder="No of product" type="input" name="unitCount" />
<FormInput1 description="Estimated time" placeholder="Estimated time" type="input" name="unitCount" />
    </div>
  )

}
export default Manage;
