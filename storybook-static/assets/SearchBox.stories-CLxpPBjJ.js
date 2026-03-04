import{r as l}from"./index-ZH-6pyQh.js";import{S as s}from"./DataTable-BMmstkd0.js";import"./jsx-runtime-D_zvdyIk.js";import"./_commonjsHelpers-CqkleIqs.js";const h={title:"Molecules/SearchBox",component:s,tags:["autodocs"],args:{placeholder:"Search users, docs, or commands"}},e={render:n=>{const[c,r]=l.useState("");return React.createElement("div",{style:{width:"min(640px, 90vw)"}},React.createElement(s,{...n,value:c,onValueChange:r,onSearch:u=>r(u)}))}};var a,t,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState("");
    return <div style={{
      width: "min(640px, 90vw)"
    }}>
        <SearchBox {...args} value={value} onValueChange={setValue} onSearch={query => setValue(query)} />
      </div>;
  }
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const v=["Interactive"];export{e as Interactive,v as __namedExportsOrder,h as default};
