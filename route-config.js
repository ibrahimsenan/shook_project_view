//const config = require("config");
require("module-alias/register");
const path = require("path")
const ModuleAliases = require("module-alias")
ModuleAliases.addAliases({'@': __dirname, "@root": path.join(__dirname, "/*" )})
ModuleAliases.addAliases({'@': __dirname, "@deep": path.join(__dirname, "/src/api/auth/auth_service" )})
ModuleAliases.addAliases({'@': __dirname, "@routes": path.join(__dirname, "/src/routes" )})
ModuleAliases.addAliases({'@': __dirname, "@redis": path.join(__dirname, "/src/redis" )})
ModuleAliases.addAliases({'@': __dirname, "@modules": path.join(__dirname, "/src/modules" )})
ModuleAliases.addAliases({'@': __dirname, "@api": path.join(__dirname, "/src/api" )})
ModuleAliases.addAliases({'@': __dirname, "@utils": path.join(__dirname, "/src/api/utils" )})
ModuleAliases.addAliases({'@': __dirname, "@auth": path.join(__dirname, "/src/api/auth" )})