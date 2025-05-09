import "module-alias/register";
import { register } from "tsconfig-paths";
import path from "path";
import { compilerOptions } from "../../../tsconfig.json";

const baseUrl = path.resolve(
  __dirname,
  "../..",
  compilerOptions.baseUrl || "src"
);

const paths = compilerOptions.paths || {};

register({ baseUrl, paths });
