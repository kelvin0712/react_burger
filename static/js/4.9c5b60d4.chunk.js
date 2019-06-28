(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{111:function(e,t,a){"use strict";var n=a(0),i=a.n(n),l=a(112),r=a.n(l);t.a=function(e){var t=null,a=[r.a.InputElement];e.invalid&&e.shouldValidate&&e.touched&&a.push(r.a.Invalid);var n=null;switch(e.invalid&&e.touched&&(n=i.a.createElement("p",{className:r.a.ValidationError},e.errorMessage)),e.elementType){case"input":t=i.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":t=i.a.createElement("textarea",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":t=i.a.createElement("select",{className:a.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return i.a.createElement("option",{value:e.value,key:e.value},e.displayValue)}));break;default:t=i.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return i.a.createElement("div",{className:r.a.Input},i.a.createElement("label",{className:r.a.Label},e.label),t,n)}},112:function(e,t,a){e.exports={Input:"Input__Input__s67N0",Label:"Input__Label___n-1m",InputElement:"Input__InputElement__2-aFx",Invalid:"Input__Invalid__1sl1p",ValidationError:"Input__ValidationError__1ElSg"}},116:function(e,t,a){e.exports={Auth:"Auth__Auth__2YUr1"}},117:function(e,t,a){"use strict";a.r(t);var n=a(31),i=a(24),l=a(25),r=a(27),u=a(26),o=a(28),s=a(0),c=a.n(s),d=a(16),p=a(22),h=a(111),m=a(43),g=a(116),v=a.n(g),f=a(6),b=a(51),E=a(18),_=function(e){function t(){var e,a;Object(i.a)(this,t);for(var l=arguments.length,o=new Array(l),s=0;s<l;s++)o[s]=arguments[s];return(a=Object(r.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={controls:{email:{elementType:"input",elementConfig:{type:"email",placeholder:"Email"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}},isSignUp:!0},a.inputChangedHandler=function(e,t){var i=Object(E.b)(a.state.controls,Object(n.a)({},t,Object(E.b)(a.state.controls[t],{value:e.target.value,valid:Object(E.a)(e.target.value,a.state.controls[t].validation),touched:!0})));a.setState({controls:i})},a.submitHandler=function(e){e.preventDefault(),a.props.onAuth(a.state.controls.email.value,a.state.controls.password.value,a.state.isSignUp)},a.swicthAuthModeHandler=function(){a.setState(function(e){return{isSignUp:!e.isSignUp}})},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.buildingBurger||"/"===this.props.authRedirectPath||this.props.onSetAuthRedirectPath()}},{key:"render",value:function(){var e=this,t=[];for(var a in this.state.controls)t.push({id:a,config:this.state.controls[a]});var n=t.map(function(t){return c.a.createElement(h.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,invalid:!t.config.valid,shouldValidate:t.config.validation,touched:t.config.touched,changed:function(a){return e.inputChangedHandler(a,t.id)}})});this.props.loading&&(n=c.a.createElement(b.a,null));var i=null;this.props.err&&(i=c.a.createElement("p",null,this.props.err.message));var l=null;return this.props.isAuthenticated&&(l=c.a.createElement(p.a,{to:this.props.authRedirectPath})),c.a.createElement("div",{className:v.a.Auth},l,i,c.a.createElement("form",{onSubmit:this.submitHandler},n,c.a.createElement(m.a,{btnType:"Success"},"Submit")),c.a.createElement(m.a,{clicked:this.swicthAuthModeHandler,btnType:"Danger"},this.state.isSignUp?"Sign In":"Sign Up"))}}]),t}(s.Component);t.default=Object(d.b)(function(e){return{loading:e.auth.loading,err:e.auth.error,isAuthenticated:null!==e.auth.token,buildingBurger:e.burgerBuilder.building,authRedirectPath:e.auth.authRedirectPath}},function(e){return{onAuth:function(t,a,n){return e(f.b(t,a,n))},onSetAuthRedirectPath:function(){return e(f.v("/"))}}})(_)}}]);
//# sourceMappingURL=4.9c5b60d4.chunk.js.map