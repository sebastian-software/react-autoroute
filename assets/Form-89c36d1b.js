import{u as m,a as r,F as u,b as c,j as a,c as f}from"./index-adcc8178.js";async function s(e){return new Promise(t=>setTimeout(t,e))}const i={firstName:"Gregory",name:"Schmidt"};async function p({params:e}){return console.log("Loader: Router Params:",e),await s(500),i}async function h({request:e,params:t}){console.log("Action: Router Params:",t);const l=await e.formData();for(const[n,o]of l){if(o==="")throw new Error(`Missing value for: ${n}!`);i[n]=o}return await s(1e3),null}function y(){const e=f();return r("h1",{children:["Route Error: ",e.message]})}function g(){const e=m();return r(u,{children:[r("p",{children:["Howdy ",e.firstName," ",e.name]}),r(c,{method:"post",style:{display:"inline-flex",gap:"8px",flexDirection:"column"},children:[a("label",{htmlFor:"firstName",children:"First Name"}),a("input",{name:"firstName",defaultValue:e.firstName}),a("label",{htmlFor:"name",children:"Name"}),a("input",{name:"name",defaultValue:e.name}),a("input",{type:"submit",value:"Update"})]})]})}export{y as RouteError,h as action,g as default,p as loader};