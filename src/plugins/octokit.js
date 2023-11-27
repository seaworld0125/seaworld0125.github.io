import {Octokit} from "@octokit/core";
import githubSecret from "./githubSecret.js";

const octokit = new Octokit({ auth: githubSecret.data().github});
export default octokit