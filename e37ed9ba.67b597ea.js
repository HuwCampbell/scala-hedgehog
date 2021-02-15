(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return d}));var r=n(3),a=n(7),o=(n(0),n(85)),i={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started"},s={unversionedId:"getting-started",id:"getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Getting Started",source:"@site/../generated-docs/target/mdoc/getting-started.md",slug:"/getting-started",permalink:"/scala-hedgehog/docs/getting-started",version:"current",sidebar_label:"Getting Started",sidebar:"docs",previous:{title:"Hedgehog for Scala",permalink:"/scala-hedgehog/docs/"},next:{title:"Motivation",permalink:"/scala-hedgehog/docs/motivation"}},c=[{value:"Getting Started",id:"getting-started",children:[{value:"SBT Binary Dependency",id:"sbt-binary-dependency",children:[]},{value:"SBT Source Dependency",id:"sbt-source-dependency",children:[]},{value:"SBT Testing",id:"sbt-testing",children:[]},{value:"IntelliJ",id:"intellij",children:[]}]},{value:"Example",id:"example",children:[]},{value:"Guides",id:"guides",children:[]}],l={rightToc:c};function d(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"getting-started"},"Getting Started"),Object(o.b)("h3",{id:"sbt-binary-dependency"},"SBT Binary Dependency"),Object(o.b)("p",null,"In your ",Object(o.b)("inlineCode",{parentName:"p"},"build.sbt")," you will unfortunately need to add a\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.scala-sbt.org/1.x/docs/Resolvers.html#Custom+Layout"}),"custom resolver"),'.\nHedgehog is released for every commit and so the "version" will be a git commit hash.\nYou can find the ',Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://bintray.com/hedgehogqa/scala-hedgehog"}),"bintray repository here"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),'val hedgehogVersion = "0.6.2"\n// OR\nval hedgehogVersion = "${COMMIT}"\n\nlibraryDependencies ++= Seq(\n  "qa.hedgehog" %% "hedgehog-core" % hedgehogVersion,\n  "qa.hedgehog" %% "hedgehog-runner" % hedgehogVersion,\n  "qa.hedgehog" %% "hedgehog-sbt" % hedgehogVersion\n)\n\n// To use Git commit hash version instead of SemVer, add the following resolver.\nresolvers += "bintray-scala-hedgehog" at "https://dl.bintray.com/hedgehogqa/scala-hedgehog"\n')),Object(o.b)("h3",{id:"sbt-source-dependency"},"SBT Source Dependency"),Object(o.b)("p",null,"This project can be added as an SBT ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.scala-sbt.org/1.x/docs/Multi-Project.html"}),"subproject"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),'// This can also be a branch name, like \'master\'`, if you want to live on the edge\nval hedgehogVersion = "${COMMIT}"\nval hedgehogUri = uri("https://github.com/hedgehogqa/scala-hedgehog.git#" + hedgehogVersion)\n\nlazy val root =\n  (project in file("."))\n    .dependsOn(ProjectRef(hedgehogUri, "core"))\n    .dependsOn(ProjectRef(hedgehogUri, "runner"))\n    .dependsOn(ProjectRef(hedgehogUri, "sbt-test"))\n')),Object(o.b)("p",null,"NOTE: Depending on your scala version(s) SBT might ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/sbt/sbt/issues/2901"}),"not resolve"),"."),Object(o.b)("h3",{id:"sbt-testing"},"SBT Testing"),Object(o.b)("p",null,"Scala Hedgehog comes with a ",Object(o.b)("em",{parentName:"p"},"very")," primitive runner interface, and supports the\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.scala-sbt.org/1.x/docs/Testing.html#Using+Extensions"}),"SBT testing extension"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),'testFrameworks += TestFramework("hedgehog.sbt.Framework")\n')),Object(o.b)("h3",{id:"intellij"},"IntelliJ"),Object(o.b)("p",null,"The IntelliJ scala plugin only has\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/JetBrains/intellij-scala/tree/idea183.x/scala/runners/src/org/jetbrains/plugins/scala/testingSupport"}),"hard-coded support for the most popular test frameworks"),".\nWhile Hedgehog is obviously not included in that list, an may never  be, by extending the runner\n",Object(o.b)("inlineCode",{parentName:"p"},"Properties")," tests can be run as an application (as ",Object(o.b)("inlineCode",{parentName:"p"},"Properties")," includes a handy ",Object(o.b)("inlineCode",{parentName:"p"},"main")," function).\nNOTE: This requires the test to be an ",Object(o.b)("inlineCode",{parentName:"p"},"object")," and ",Object(o.b)("em",{parentName:"p"},"not")," a ",Object(o.b)("inlineCode",{parentName:"p"},"class"),"."),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)("p",null,"See the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/hedgehogqa/scala-hedgehog/tree/master/example/shared/src/main/scala/hedgehog/examples/"}),"examples")," module for working versions."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-scala"}),'import hedgehog._\nimport hedgehog.runner._\n\nobject PropertyTest extends Properties {\n\n  def tests: List[Test] =\n    List(\n      property("reverse", testReverse)\n    )\n\n  def testReverse: Property =\n    for {\n      xs <- Gen.alpha.list(Range.linear(0, 100)).forAll\n    } yield xs.reverse.reverse ==== xs\n}\n')),Object(o.b)("h2",{id:"guides"},"Guides"),Object(o.b)("p",null,Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"guides/"}),"Guides")))}d.isMDXComponent=!0},85:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),d=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=d(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},g=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=d(n),g=r,h=p["".concat(i,".").concat(g)]||p[g]||b[g]||o;return n?a.a.createElement(h,s(s({ref:t},l),{},{components:n})):a.a.createElement(h,s({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=g;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}g.displayName="MDXCreateElement"}}]);