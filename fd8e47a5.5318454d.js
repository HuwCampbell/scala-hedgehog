(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{82:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return s})),a.d(t,"rightToc",(function(){return i})),a.d(t,"default",(function(){return p}));var r=a(3),n=a(7),l=(a(0),a(85)),o={title:"Differences to Haskell Hedgehog",sidebar_label:"Differences to Haskell Hedgehog",slug:"/guides-haskell-differences"},s={unversionedId:"guides/haskell-differences",id:"guides/haskell-differences",isDocsHomePage:!1,title:"Differences to Haskell Hedgehog",description:"Differences to Haskell Hedgehog",source:"@site/../generated-docs/target/mdoc/guides/haskell-differences.md",slug:"/guides-haskell-differences",permalink:"/scala-hedgehog/docs/guides-haskell-differences",version:"current",sidebar_label:"Differences to Haskell Hedgehog",sidebar:"docs",previous:{title:"Migration From ScalaCheck",permalink:"/scala-hedgehog/docs/guides-migration-from-scalacheck"},next:{title:"Integration with other test libraries",permalink:"/scala-hedgehog/docs/integration-minitest"}},i=[{value:"Differences to Haskell Hedgehog",id:"differences-to-haskell-hedgehog",children:[]},{value:"Result",id:"result",children:[{value:"Resource Management",id:"resource-management",children:[]},{value:"Property Plus Example",id:"property-plus-example",children:[]}]},{value:"Monadic Gen",id:"monadic-gen",children:[]},{value:"State Vars",id:"state-vars",children:[]}],c={rightToc:i};function p(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"differences-to-haskell-hedgehog"},"Differences to Haskell Hedgehog"),Object(l.b)("p",null,"This page documents where the Scala Hedgehog API deviates significantly from the Haskell version."),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"#result"}),"Result"),Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"#property-plus-example"}),"Property Plus Example")))),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"#monadic-gen"}),"Monadic Gen")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",Object(r.a)({parentName:"li"},{href:"#state-vars"}),"State Vars"))),Object(l.b)("h2",{id:"result"},"Result"),Object(l.b)("p",null,"The Haskell version allow for assertions throughout the ",Object(l.b)("inlineCode",{parentName:"p"},"Property")," monad, but the final value is\n",Object(l.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/hedgehogqa/haskell-hedgehog/blob/694d3648f808d2401834c3e75db24b960ee8a68c/hedgehog/src/Hedgehog/Internal/Property.hs#L133"}),"()"),"."),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-haskell"}),"prop_reverse :: Property\nprop_reverse =\n  property $ do\n    xs <- forAll $ Gen.list (Range.linear 0 100) Gen.alpha\n    reverse (reverse xs) === xs\n")),Object(l.b)("p",null,"And the corresponding Scala version:"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),"def propReverse: Property =\n  for {\n    xs <- Gen.alpha.list(Range.linear(0, 100)).forAll\n  } yield xs.reverse.reverse ==== xs\n")),Object(l.b)("h3",{id:"resource-management"},"Resource Management"),Object(l.b)("p",null,"This approach makes it more difficult to isolate resource management in a strict language like Scala.\nIt then becomes fairly important in the Haskell version to use\n",Object(l.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/hedgehogqa/haskell-hedgehog/blob/master/hedgehog-example/src/Test/Example/Resource.hs"}),"ResourceT"),":"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-haskell"}),'prop_unix_sort :: Property\nprop_unix_sort =\n  property $ do\n    values0 <- forAll $ Gen.list (Range.linear 0 100) Gen.alpha\n    test . runResourceT $ do\n      dir <- Temp.createTempDirectory Nothing "prop_dir"\n      ...\n      values0 === values\n')),Object(l.b)("p",null,"To simplify this, and to reduce surprises, the final result in the Scala version is now a separate\n",Object(l.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/hedgehogqa/scala-hedgehog/blob/master/core/src/main/scala/hedgehog/core/Result.scala"}),"Result")," value,\nwhich forces a single, final assertion to be returned."),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),"def propUnixSort: Property =\n  for {\n    values0 <- Gen.alpha.list(Range.linear(0, 100)).forAll\n  } yield {\n    val dir = java.io.Files.createTempDirectory(getClass.getSimpleName).toFile\n    try {\n      values0 ==== values\n    } finally {\n      dir.delete()\n    }\n  }\n")),Object(l.b)("h3",{id:"property-plus-example"},"Property Plus Example"),Object(l.b)("p",null,'The Scala version has an additional data type that allows generators to be applied to the final "test" in a way that\ncan be invoked from by consumers.'),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),"def propReverse: PropertyR[List[Char]] =\n  PropertyR(\n    Gen.alpha.list(Range.linear(0, 100)).forAll\n  )(xs => xs.reverse.reverse ==== xs)\n")),Object(l.b)("p",null,'Here is an example of re-using the same method with both a property and a "golden" example test:'),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),"  def tests: List[Test] =\n    List(\n      property(propReverse)\n    , example(propReverse.test(List('a', 'b', 'c')))\n    )\n")),Object(l.b)("h2",{id:"monadic-gen"},"Monadic Gen"),Object(l.b)("p",null,"One of the original goals of the Haskell implementation was to support completely generic monadic values."),Object(l.b)("blockquote",null,Object(l.b)("p",{parentName:"blockquote"},"Generators allow monadic effects.")),Object(l.b)("p",null,"For example you could use a ",Object(l.b)("inlineCode",{parentName:"p"},"StateT")," as part of the generator. In a strict language like Scala the Monad is also\n",Object(l.b)("em",{parentName:"p"},"critical")," for providing a lazy tree. However, putting the laziness on ",Object(l.b)("em",{parentName:"p"},"each")," tree node results in ",Object(l.b)("em",{parentName:"p"},"serious")," memory\nproblems. For now we have had to move this laziness to the tree children."),Object(l.b)("p",null,"In practice I doubt that many people are seriously using monadic effects for generated values, and I'm happy to revisit\nthis if/when an issue is raised."),Object(l.b)("h2",{id:"state-vars"},"State Vars"),Object(l.b)("p",null,"The Haskell State testing uses a very powerful ",Object(l.b)("inlineCode",{parentName:"p"},"Symbolic")," and ",Object(l.b)("inlineCode",{parentName:"p"},"Concrete")," ",Object(l.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/hedgehogqa/haskell-hedgehog/blob/1c49c7aa82bc0012f0be3b213f03e84c5754d270/hedgehog/src/Hedgehog/Internal/State.hs#L93-L134"}),"types")," to represent the different\nstates of a variable when implementing the ",Object(l.b)("inlineCode",{parentName:"p"},"Command")," interface."),Object(l.b)("p",null,"While this is ",Object(l.b)("em",{parentName:"p"},"technically")," possible in Scala, the types are quite intimidating, especially ",Object(l.b)("inlineCode",{parentName:"p"},"HTraversable"),'.\nInstead we opt for a lower-level variable "lookup" by passing in the ',Object(l.b)("inlineCode",{parentName:"p"},"Environment")," map where concrete variables are\navailable, so that users can resolve them manually."))}p.isMDXComponent=!0},85:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return h}));var r=a(0),n=a.n(r);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=n.a.createContext({}),p=function(e){var t=n.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},b=function(e){var t=p(e.components);return n.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),b=p(a),d=r,h=b["".concat(o,".").concat(d)]||b[d]||u[d]||l;return a?n.a.createElement(h,s(s({ref:t},c),{},{components:a})):n.a.createElement(h,s({ref:t},c))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<l;c++)o[c]=a[c];return n.a.createElement.apply(null,o)}return n.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"}}]);