import React from "react";
import FormButton,{FormInput1,} from "./FormButton"
var s = {};
var k = {}
var c = 0;
const Manage = (props) =>{

  const submit = (e) =>{
e.preventDefault();
const {date,unit,subUnit,unitCount,unitCounttime} = e.target.elements;
s.unit = {};
s.unit.date= date.value;
s.unit.unit=unit.value;
s.unit.subUnit=subUnit.value;
s.unit.unitCount=unitCount.value;
s.unit.unitCounttime=unitCounttime.value;
k[c] = s.unit;
console.log(k.length)
c+=1;
  }
  return(
    <div >
      <form onSubmit={submit}>
    <FormInput1 description="Date" placeholder="EnterDate" type="date" name="date" />
  <FormInput1 description="production" placeholder={props.data.unit} type="input" name="unit" defaultValue={props.data.unit} disabled={true}/>
<FormInput1 description={props.data.value} placeholder={props.data.value} type="input" name="subUnit" disabled={true} defaultValue={props.data.value} />
  <FormInput1 description="No of product" placeholder="No of product" type="input" name="unitCount" />
<FormInput1 description="Estimated time" placeholder="Estimated time" type="input" name="unitCounttime" />
<FormButton type="submit" title="add" />
</form>
  </div>
  )

}
export default Manage;
