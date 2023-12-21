function loadYaml(name: string): any {
    const yaml = require('js-yaml');
    const fs = require('fs');
    try {
        const doc = yaml.load(fs.readFileSync(name, 'utf8'));
        //  console.log(doc);
        return doc;
    } catch (e) {
        console.log(e);
    }
}

const dir = "content/topics/EN/technologies/shockwaves"

let yaml = loadYaml(dir + "/tree.yaml");
let groups = yaml["groups"];
let name = yaml["name"];

let out = "";

async function loadFile(dir:string,name:string){
    let file = "./" + dir + "/" +name + ".md";

    let data: string = await Bun.file(file).text();
    //  console.log("DATA", data.trim())

    //  const name =  '\n<span style=\"color:gray;\">'+key+'</span>\n'
    //    out+=name;
    return "\n"+ data+"\n";
}

for (const group in groups) {
    //console.log("TEST", key)
    const questions = groups[group]
    const curDir=dir+"/"+group
    out += await loadFile(curDir,"index");
    for (const key in questions) {
        out += await loadFile(curDir,questions[key]);
    }
}

await Bun.write(name + ".md", out)
