import {exportMdFileToIpfs} from "./tools";
import * as fs from "fs";
import {TreeNode} from "./md";
import IpfsApi from "./ipfs";


function sortByDepth(a, b) {
    const depthA = a.split('/').length;
    const depthB = b.split('/').length;
    return depthB - depthA || a.localeCompare(b);
}

function scanDir(dir: string): string[] {
    let res: string[] = [];
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        let fullPath = dir + '/' + file;
        let stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            res = res.concat(scanDir(fullPath));
        } else {
            res.push(fullPath);
        }
    });
    return res;
}

function buildTree(paths: string[]): any {
    let root = {};
    paths.forEach(path => {
        const parts = path.split('/');
        let current = root;

        parts.forEach(part => {
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];
        });
    });
    return root
}


export class DirProcessor {
    pathsTree: TreeNode
    menuMap: { [key: string]: any } = {}
    menuKeys: { [key: string]: string } = {}
    pathsMap: { [key: string]: { cid: string, title: string } } = {}
    paths: string[] = [];

    async processMdFile(path: string) {
        const {cid, title} = await exportMdFileToIpfs(path, this.ipfs)
        this.pathsMap[path] = {cid, title}
        return cid;
    }

    async processDirs(path: string) {
       //   console.log("PATH", path)
        // console.log("PATH_MP",  this)


        const parts: string[] = path.split("/")

        let currentNode = this.pathsTree;
        let children = [];
        let dirName;


        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const beforeNode = currentNode;
            currentNode = currentNode[part];
            const last = i === parts.length - 1;
            if (last) {
                dirName = part.split(".")[1]
                //  console.log("BEFORE_NODE", beforeNode)
                if (beforeNode) {
                    let dirNode = beforeNode[dirName];
                  //  console.log("DIR_NODE", dirNode)
                    if (dirNode) {
                        let keys = Object.keys(dirNode);
                        // console.log("DIR", dirName)
                        // console.log("LIST_FILES", keys)
                        // console.log("OBJ", beforeNode)

                        children = keys.map((child) => {
                            const sub: string[] = parts.slice(0, i)
                            const np = [...sub,dirName, child]
                            return np.join("/").trim()
                        }).filter((child) => child.endsWith(".md"));
                      //  console.log("CHILDREN", children)
                    }
                }
            }
        }
        //   console.log("NODE", currentNode)
        //   console.log("children", children)

        const {cid, title} = this.pathsMap[path]

        const menuItem = {
            name: title,
            path: dirName,
            type: "menu",
            "articles": [{"/": cid}],

        }
        if (children) {
            menuItem["children"] = children;
            //     console.log("menuItem", menuItem)
        }

        this.menuMap[path] = menuItem;
    }

    constructor(dir: string, private ipfs: IpfsApi) {
        process.chdir(dir)
        this.paths = scanDir(".").sort(sortByDepth);
        this.pathsTree = buildTree(this.paths);
    }

    public async process() {
        for (let path of this.paths) {
            const cid = await this.processMdFile(path);
            // console.log("path",  cid," - ",path)
        }

    //    console.log("PATHS", this.paths)
    //    console.log("PATHS", this.pathsMap)

        for (let path of this.paths) {
            const cid = await this.processDirs(path);
            //console.log("dir",  cid," - ",path)
        }

        for (let path of this.paths) {
           // console.log("PTH_", path)
            const menuObj = this.menuMap[path]

            if (menuObj.children) {
               // console.log("menuObj", menuObj.children)
                menuObj.children = menuObj.children.map((path) => {
                    return {"/": this.menuKeys[path]}
                });
             //   console.log("CHILDREN", children)
            //    console.log("KEYS", this.menuKeys)
            }


            this.menuKeys[path] = await this.ipfs.saveObject(menuObj)

        }


        console.log("MENU_KEYS", this.menuKeys)
    }

}

