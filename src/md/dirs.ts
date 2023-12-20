import {scanDir, sortByDepth} from "../upload/dir.ts";

export function sortByDepthDesc(a:string, b:string):number {
    return -sortByDepth(a,b);
}

let strings = scanDir("content/topics").sort(sortByDepthDesc);
console.log("STRINGS", strings)