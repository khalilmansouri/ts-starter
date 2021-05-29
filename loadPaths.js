const tsConfig = require("./tsconfig.json");
const modulesAlias = require("module-alias")
const paths = tsConfig.compilerOptions.paths;

let alias = {}
let dist = tsConfig.compilerOptions.outDir.replace("./", "")
let dir = __dirname
for (path in paths) {
  alias[path.replace("/*", "")] = dir + "/" + paths[path][0].replace("/*", "").replace("src", dist)
}

modulesAlias.addAliases(alias)
